const express = require("express");
const sessionsRouter = express.Router();
const debug = require("debug")("app:sessionRouter");
const { MongoClient, ObjectId } = require("mongodb");
const sessions = require("../data/sessions.json");

sessionsRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://ExpressUser:i52dKZ6gbp2xznBO@dataexpress.2agw7.mongodb.net?retryWrites=true&w=majority";
  const dbName = "DataExpress";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to MongoDb");

      const db = client.db(dbName);

      const sessions = await db.collection("sessions").find().toArray();
      res.render("sessions", { sessions });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

sessionsRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  const url =
    "mongodb+srv://ExpressUser:i52dKZ6gbp2xznBO@dataexpress.2agw7.mongodb.net?retryWrites=true&w=majority";
  const dbName = "DataExpress";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to MongoDb");

      const db = client.db(dbName);

      const session = await db
        .collection("sessions")
        .findOne({ _id: new ObjectId(id) });
      res.render("session", { session });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = sessionsRouter;
