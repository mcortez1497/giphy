const express = require("express");

const utils = require("../utils");

const router = express.Router();

router.get("/user", utils.checkAuthenticated, (req, res) =>
  res.json(utils.formatUser(req.user))
);

module.exports = router;
