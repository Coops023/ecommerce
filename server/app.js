// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

//express session
var session = require("express-session");
// var mongoStore = require("connect-mongo")(session);

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

app.set("trust proxy", 1); // trust first proxy

// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     cookie: { maxAge: 180 * 60 * 1000 },
//   })
// );

// app.use(function (req, res, next) {
//   res.locals.session = req.session;
//   next();
// });

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes");
// const MongoStore = require("connect-mongo");
const { Mongoose } = require("mongoose");
app.use("/", allRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});
module.exports = app;
