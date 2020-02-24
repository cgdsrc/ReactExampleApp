/* ------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------- MODULES -------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------- */
const mysql = require('mysql');                   // npm i mysql --save  
const express = require('express');               // npm i express --save
const app = express();
const bodyParser = require('body-parser');        // npm i body-parser --save
const fs = require('fs');                         // npm i fs --save
const net = require('net');                       // npm i net --save
const bcrypt = require('bcrypt');                 // npm i bcrypt --save  
const jwt = require('jsonwebtoken');              // npm i jsonwebtoken --save  
const { isAuth, cache, timeoutOperation } = require('./auth');
const router = express.Router();
const mongoose = require('mongoose');


const pdf =require('html-pdf');
//const pdfTemplate = require('./documents');

/* ------------------------------------------- Yapılandırma Ayarları ------------------------------------- */
const config = JSON.parse(fs.readFileSync('./config.json')).config;

/* ------------------------------------------------------------------------------------------------------- */
/* ---------------------------- ERROR HANDLING FOR UNCAUGHT EXCEPTION -------------------------------------*/
/* ------------------------------------------------------------------------------------------------------- */

process.on('uncaughtException', (err) => { console.error('Web Server handle uncaught exception : ' + err.stack); });



/* ------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------  PARAMETERS ----------------------------------------- */
/* ------------------------------------------------------------------------------------------------------- */

// WebService Parameters
var SERVICE_SERVER_IP = config.webserviceserverip;
var SERVICE_SERVER_PORT = config.webserviceserverport;
var myHOST = config.myHOST;
var myPORT = config.myPORT;
var MYSQL_USER = config.MYSQL_USER;
var MYSQL_PASS = config.MYSQL_PASS;
var DATABASE = config.DATABASE;


var MongoPORT= config.MongoPORT;



console.log(myHOST,
    myPORT,
    MYSQL_USER,
    MYSQL_PASS,
    DATABASE)
/* ---------------------------------------------------------------------------------------------------------- */
/* -----------

    ----------------------------- VERITABANI ISLEMLERI--------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------- */


var pool = mysql.createPool({
    host: myHOST,
    port: myPORT,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: DATABASE
});



//--------------------------------------------------------MOngoDB -----------------------------------------------------------------------


mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept");
    next();
});




const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');







 
// mongoose.connect('mongodb://127.0.0.1:27017/business',  { useNewUrlParser: true }).then(
//     () => {console.log('Database is connected') },
//     err => { console.log('Can not connect to the database'+ err)}
//   );


 const businessRoute = require('./business.route');
 app.use('/business', businessRoute);

 app.listen(MongoPORT, function() {
    console.log("Server is running on Port: " + MongoPORT);
})

/*
pool.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

*/



    // Get the collection
 
/* ------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------- HTTP SERVERS ------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------- */




var server = app.listen(SERVICE_SERVER_PORT, SERVICE_SERVER_IP, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('HTTP Server Bound @ ' + host + ':' + port);
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept");
    next();
});
app.use(bodyParser.json({ limit: '50mb' }));                              // support json encoded bodies
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));       // support encoded bodies
app.use('/', router);                                                    // "/" ile baslayan isteklerin hepsi router yonlendirme fonksiyonlarına gider      

router.get('/mood', isAuth, async (req, res) => {
    res.send('<b>Avikon</b>');
});

router.delete('/logout', isAuth, async (req, res) => {
    const token = req.headers['x-auth-token'];

    timeoutOperation(token);

    res.send(true);
});

router.post('/login', async (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));

    // username ve pwd kontrolu
    if (data.username === config.username && data.password === config.password) {
        const token = jwt.sign({
            id: data.id,
            username: data.username,
            password: data.password
        }, config.secretkey);
        //cache.push(token);
        var timeoutId = setTimeout(timeoutOperation, config.sessionTimeout, token);
        cache.set(token, timeoutId);

        res.json({ token });
    } else {
        res.status(401).json({ errors: { form: 'Kullanıcı Adı veya Şifre Geçersiz!' } });
    }

});

//rest api to get all results
router.get('/crud', isAuth, async (req, res) => {
    pool.getConnection(function (err, connection) {
        if (err) { console.log("Pool Connection Error. Returning from fn InitializeVehicleArray. Error : " + err); return; }
        // Use the connection
        connection.query("SELECT * FROM em_vehicles where `IsDeleted`=0", function (err, results, fields) {
            if (err) { console.log("Connection Query Error. Returning from fn InitializeVehicleArray. Error : " + err); connection.release(); return; }
            if (results.length == 0) { console.log("Connection Query Null Response. DB de tanimli arac bulunamadi."); connection.release(); return; }
            connection.release();
            res.send(results);
            // Don't use the connection here, it has been returned to the pool.
            /*  for (var i in results) {
                   New Vehicle
                var object = new Vehicle(results[i].VehicleId, results[i].VehicleName);
                 VehicleArray.push(object);
             }*/
        });
    });
});

router.get('/drivers', isAuth, async (req, res) => {
    pool.getConnection(function (err, connection) {
        if (err) { console.log("Pool Connection Error. Returning from fn InitializeVehicleArray. Error : " + err); return; }
        // Use the connection
        connection.query("select `DriverId`,`DriverName`,`DriverSurname` from em_driver where `IsDeleted`=0", function (err, results, fields) {
            if (err) { console.log("Connection Query Error. Returning from fn InitializeVehicleArray. Error : " + err);  connection.release(); return; }
            if (results.length == 0) { console.log("Connection Query Null Response. DB de tanimli sofor bulunamadi."); connection.release(); return; }
            connection.release();
            res.send(results);
        });
    });
});
//Delete a vehicles
router.delete('/crud/:VehicleId', isAuth, async (req, res) => {
    console.log(req.params.VehicleId)
    pool.getConnection(function (err, connection) {
        if (err) { console.log("Pool Connection Error. Returning from fn InitializeVehicleArray. Error : " + err); return; }
        connection.query("DELETE FROM em_vehicles WHERE `VehicleId` = ?", [req.params.VehicleId], function (err, results, fields) {
            if (err) { console.log("Connection Query Error. Returning from fn InitializeVehicleArray. Error : " + err); connection.release(); return; }
            connection.release();
            res.send(results);
        });
    });
});



//-----------------PDF------------------------------

// router.post('/create-pdf', isAuth, async (req, res) => {
//     pool.getConnection(function (err, connection) {
//         if (err) { console.log("Pool Connection Error. Returning from fn InitializeVehicleArray. Error : " + err); return; }
//         pdf.create(pdfTemplate(req,data),{}).toFile('crud.pdf', (err) => {
//             if(err){
//                 return Promise.reject();
//             }
//             return Promise.resolve();
//         })
//             if (err) { console.log("Connection Query Error. Returning from fn InitializeVehicleArray. Error : " + err); res.status(400).json({ err: err.toString() }); connection.release(); return; }
//        //     if (results.length == 0) { console.log("Connection Query Null Response. DB de tanimli arac bulunamadi."); connection.release(); return; }  res.status(400); res.send(err); 
//             connection.release();
//             res.send(JSON.stringify(results));
//         });
//     });
//     // .catch(err=> res.end.json(err))
        
//     app.get("/pdf", (req, res) => {
//         res.sendFile(`${__dirname}/result.pdf`)
//       });
    
    




//--------------------------

//Insert a vehicles
router.post('/crud', isAuth, async (req, res) => {
    const { VehicleName, VehicleDeviceId, VehicleLineId, VehicleDriverId, CoupledVehicleId, VehicleStatus, isDeleted, VehicleDesc } = req.body
    pool.getConnection(function (err, connection) {
        if (err) { console.log("Pool Connection Error. Returning from fn InitializeVehicleArray. Error : " + err); return; }
        var sql = "INSERT INTO em_vehicles (VehicleName, VehicleDeviceId, VehicleLineId, VehicleDriverId, CoupledVehicleId, VehicleStatus, isDeleted, VehicleDesc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        connection.query(sql, [VehicleName, VehicleDeviceId, VehicleLineId, VehicleDriverId, CoupledVehicleId, VehicleStatus, isDeleted, VehicleDesc], function (err, results, fields) {
            if (err) { console.log("Connection Query Error. Returning from fn InitializeVehicleArray. Error : " + err); res.status(400).json({ err: err.toString() }); connection.release(); return; }
       //     if (results.length == 0) { console.log("Connection Query Null Response. DB de tanimli arac bulunamadi."); connection.release(); return; }  res.status(400); res.send(err); 
            connection.release();
            res.send(JSON.stringify(results));
        });
    });
    // .catch(err=> res.end.json(err))
});

//Update a vehicles
router.put('/crud', isAuth, async (req, res) => {
    const { VehicleId, VehicleName, VehicleDeviceId, VehicleLineId, VehicleDriverId, CoupledVehicleId, VehicleStatus, isDeleted, VehicleDesc } = req.body
    console.log(req.body)
    pool.getConnection(function (err, connection) {
        let sql =
            ('UPDATE `em_vehicles` SET `VehicleName`=?,`VehicleDeviceId`=?,`VehicleLineId`=?,`VehicleDriverId`=?,`CoupledVehicleId`=?,`VehicleStatus`=?,`isDeleted`=?,`VehicleDesc`=? where `VehicleId`=?')

        connection.query(sql, [VehicleName, VehicleDeviceId, VehicleLineId, VehicleDriverId, CoupledVehicleId, VehicleStatus, isDeleted, VehicleDesc, VehicleId], function (err, results, fields) {
            if (err) { console.log("Error : " + err);  res.status(400).json({ err: err.toString() });
            //res.send(err);
             connection.release(); return; }
      //      if (results.length == 0) { console.log("Connection Query Null Response. DB de tanimli arac bulunamadi."); connection.release(); return; }
            connection.release();
            res.send(JSON.stringify(results));
        });
    })
});
