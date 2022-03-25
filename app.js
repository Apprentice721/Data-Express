const express = require("express");
const app = express();
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sessionsRouter = require("./src/routers/sessionsRouter.js");
const adminRouter = require("./src/routers/adminRouter.js");
const authRouter = require("./src/routers/authRouter.js");
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "DataExpress" }));

require("./src/config/passport.js")(app);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/sessions", sessionsRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Data Express", data: ["a", "b", "c"] });
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}....`);
});
