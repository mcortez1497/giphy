const express = require("express");
const passport = require("passport");

const User = require("../models/user");
const checkAuthenticated = require("../utils").checkAuthenticated;
const checkNotAuthenticated = require("../utils").checkNotAuthenticated;

const router = express.Router();

router.post("/register", checkNotAuthenticated, async (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  await User.create(user)
    .then(_ => res.status(200).send())
    .catch(error => next(error));
});

router.post("/login", checkNotAuthenticated, (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(401).json({
        message: info
      });
    }

    req.logIn(user, error => (error ? next(error) : res.redirect("/api/user")));
  })(req, res, next);
});

router.delete("/logout", checkAuthenticated, (req, res) => {
  req.logOut();
  res.status(200).send();
});

module.exports = router;
