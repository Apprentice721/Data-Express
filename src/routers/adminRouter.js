const express = require("express");
const adminRouter = express.Router();
const sessions = require("../data/sessions.json");
const debug = require("debug")("app:adminRouter");
const { MongoClient } = require("mongodb");

adminRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://ExpressUser:i52dKZ6gbp2xznBO@dataexpress.2agw7.mongodb.net?retryWrites=true&w=majority";
  const dbName = "DataExpress";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to MongoDb");

      const db = client.db(dbName);

      const response = await db.collection("sessions").insertMany(sessions);
      res.json(response);
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = adminRouter;
