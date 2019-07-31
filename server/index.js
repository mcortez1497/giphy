if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const MongoStore = require("connect-mongo")(session);

const initialize = require("./passport");
const database = require("./db");

initialize(passport);

// Express/Passport Session Setup
const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: database
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/category"));
app.use("/api", require("./routes/gifs"));

app.use(express.static(path.join(__dirname, '../build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message
  });
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("listening on port 9000");
});
