
const express = require('express');
const businessRoutes = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongodb = require('mongodb');

const url = 'mongodb://localhost:27017/business';
const dbName = 'business';

// Defined store route
businessRoutes.route('/add').post(function (req, res) {
  (async function (err, results) {
    const client = new MongoClient(url);


    try {
      await client.connect();
      console.log("Connected correctly to server");


      const db = client.db(dbName);

      const r = await db.collection('businessData').insertOne({
        person_name: req.body.person_name,
        business_name: req.body.business_name,
        business_gts_number: req.body.business_gts_number
      });
      assert.equal(1, r.insertedCount);
      res.send(JSON.stringify(results));
    } catch (err) {
      console.log(err.stack);
      res.status(400).json({ err: err.toString() });
    }

    // Close connection
    client.close();
  })()
});

// Defined get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {
  (async function () {
    const client = new MongoClient(url);

    try {
      await client.connect();
      console.log("Connected correctly to server");

      const db = client.db(dbName);
      const col = db.collection('businessData');


      const docs = await col.find().toArray();
      res.send(docs)

    } catch (err) {
      console.log(err.stack);
      res.status(400).json({ err: err.toString() });
    }

    // Close connection
    client.close();
  })();

});



//  Defined update route
businessRoutes.route('/update').put(function (req, res) {
  (async function (err, results) {
    const client = new MongoClient(url);

    try {
      await client.connect();
      console.log("Connected correctly to server");


      const db = client.db(dbName);
      const col = db.collection('businessData');
      let toupdate = req.body._id


      r = await col.updateOne({ _id: mongodb.ObjectId(toupdate) }, {
        $set: {
          person_name: req.body.person_name,
          business_name: req.body.business_name,
          business_gts_number: req.body.business_gts_number
        }
      });
      assert.equal(1, r.matchedCount);
      assert.equal(1, r.modifiedCount);

      res.send(JSON.stringify(results));
    } catch (err) {
      console.log(err.stack);
      res.status(400).json({ err: err.toString() });

    }
    //res.send(JSON.stringify(results));
    // Close connection
    client.close();
  })();
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:_id').delete(function (req, res) {
  (async function () {
    const client = new MongoClient(url);
    console.log("istek geldi");
    try {
      await client.connect();
      console.log("Connected correctly to server");

      const db = client.db(dbName);
      const col = db.collection('businessData');
      console.log(req.params._id);
      let todelete = req.params._id
      r = await col.deleteOne({ _id: mongodb.ObjectId(todelete) });
      //assert.ok(r.value == null);


      assert.equal(1, r.deletedCount);
      console.log("deleteledim");

    } catch (err) {
      console.log(err.stack);
      res.status(400).json({ err: err.toString() });
    }

    // Close connection
    client.close();
  })();

});

module.exports = businessRoutes;