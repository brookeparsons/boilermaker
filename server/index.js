const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const { db } = require("./db");
const session = require("express-session");
process.env.SESSION_SECRET = "where am i supposed to declare this";

// you'll of course want static middleware so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, "./public")));

// Any routes or other various middlewares should go here!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//AUTHENTICATION
// configure and create our database store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();

// plug the store into our session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "a wildly insecure secret",
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

//listening on MUST SYNC DATABASE
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});

// const startListening = () => {
//   // start listening (and create a 'server' object representing our server)
//   const server = app.listen(PORT, () =>
//     console.log(`Mixing it up on port ${PORT}`)
//   );

//   // // set up our socket control center
//   // const io = socketio(server)
//   // require('./socket')(io)
// };

// const syncDb = () => db.sync();

// async function bootApp() {
//   //await sessionStore.sync()
//   await syncDb();
//   //await createApp();
//   await startListening();
// }
// // This evaluates as true when this file is run directly from the command line,
// // i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// // It will evaluate false when this module is required by another module - for example,
// // if we wanted to require our app in a test spec
// if (require.main === module) {
//   bootApp();
// } else {
//   //createApp();
//   console.log("!!!! creatApp() should run. u require the app in a test spec?");
// }

app.use("/api", require("./apiRoutes"));
// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
app.get("*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
