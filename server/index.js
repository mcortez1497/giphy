if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const bcrypt = require("bcrypt");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  username => users.find(user => user.username === username),
  id => users.find(user => user.id === id)
);

const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

const users = [];

app.get("/api/loginSuccess", (req, res) => {
  res.json({
    auth: true,
    username: req.user.username
  });
});

app.get("/api/loginFailure", (req, res) => {
  res.json({
    auth: false
  });
});

app.post(
  "/api/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/api/loginSuccess",
    failureRedirect: "/api/loginFailure"
  })
);

app.post("/api/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      username: req.body.username,
      password: hashedPassword
    });
    res.send("POST success");
  } catch (e) {
    res.send("POST error!");
  }
  console.log(users);
});

app.delete("/api/logout", checkAuthenticated, (req, res) => {
  req.logOut();
  res.json({ auth: false });
});

app.get("/api/profile", checkAuthenticated, (req, res) => {
  res.json({
    auth: true,
    username: req.user.username
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json({ auth: false });
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.json({ auth: true });
  }

  return next();
}

app.listen(9000, () => {
  console.log("listening on port 9000");
});
