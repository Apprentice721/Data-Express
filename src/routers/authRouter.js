const express = require("express");
const authRouter = express.Router();
const debug = require("debug")("app:authRouter");
const { MongoClient } = require("mongodb");
const passport = require("passport");

authRouter.route("/signup").post((req, res) => {
  const { username, password } = req.body;
  const url =
    "mongodb+srv://ExpressUser:i52dKZ6gbp2xznBO@dataexpress.2agw7.mongodb.net?retryWrites=true&w=majority";
  const dbName = "DataExpress";

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection("users").insertOne(user);
      debug(results);

      req.login(results.ops[0], () => {
        res.redirect("/auth/profile");
      });
    } catch (error) {
      debug(error);
    }
  })();
});

authRouter
  .route("/signin")
  .get((req, res) => {
    res.render("signin");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/auth/profile",
      failureMessage: "/",
    })
  );

authRouter.route("/profile").get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
