const express = require("express");
const passport = require("passport");

const User = require("../models/user");
const utils = require("../utils");

const router = express.Router();

router.post(
  "/register",
  utils.checkNotAuthenticated,
  async (req, res, next) => {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };

    await User.create(user)
      .then(_ => res.status(200).json({ success: true }))
      .catch(error => next(error));
  }
);

router.post("/login", utils.checkNotAuthenticated, (req, res, next) => {
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

router.delete("/logout", utils.checkAuthenticated, (req, res) => {
  req.logOut();
  res.status(200).json({ success: true });
});

module.exports = router;
