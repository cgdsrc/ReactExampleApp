const jwt = require('jsonwebtoken');              // npm i jsonwebtoken --save 
const fs = require('fs');                         // npm i fs --save

/* ------------------------------------------- Yapılandırma Ayarları ------------------------------------- */
const config = JSON.parse(fs.readFileSync('./config.json')).config;

let cache = new Map();

const isAuth = (req, res, next) => {

    const token = req.headers['x-auth-token'];
    
    if (!token) return res.status(401).send("Access denied. No token provided.");


    if(typeof(cache.get(token)) == "undefined" || cache.get(token) == null){
        return res.status(401).send('Access denied. Session Timeout.')
    }
    else{
        timeoutOperation(token);
        var timeoutId = setTimeout(timeoutOperation, config.sessionTimeout, token);
        cache.set(token, timeoutId);
    }

    try {
        //if can verify the token, set req.user and pass to next middleware
        const decoded = jwt.verify(token, config.secretkey);
        req.user = decoded;
        next();
      } catch (ex) {
        //if invalid token
        res.status(400).send("Invalid token.");
      }
};


const timeoutOperation = (token) => {
    clearTimeout(cache.get(token));
    cache.delete(token);
}

module.exports = {isAuth: isAuth, cache: cache, timeoutOperation: timeoutOperation};
