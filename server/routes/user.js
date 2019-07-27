const express = require("express");

const checkAuthenticated = require("../utils").checkAuthenticated;

const router = express.Router();

router.get("/user", checkAuthenticated, (req, res) =>
  res.json({
    username: req.user.username,
    _id: req.user._id
  })
);

module.exports = router;
