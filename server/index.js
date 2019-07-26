if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

const initializePassport = require("./passport-config");
const User = require("./models/user");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("mongoDB Open"));

initializePassport(passport);

const app = express();
const router = express.Router();
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.json({
        auth: false,
        message: info
      });
    }

    req.logIn(user, error =>
      error
        ? next(error)
        : res.json({
            auth: true,
            username: req.user.username
          })
    );
  })(req, res, next);
});

router.post("/register", checkNotAuthenticated, async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  await User.create(user)
    .then(user =>
      res.json({
        auth: true
      })
    )
    .catch(error =>
      res.json({
        auth: false
      })
    );
});

router.delete("/logout", checkAuthenticated, (req, res) => {
  req.logOut();
  res.json({ auth: false });
});

router.get("/profile", checkAuthenticated, (req, res) =>
  res.json({
    auth: true,
    username: req.user.username
  })
);

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

app.use("/api", router);

app.listen(9000, () => {
  console.log("listening on port 9000");
});
