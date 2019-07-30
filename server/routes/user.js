const express = require("express");

const utils = require("../utils");

const router = express.Router();

router.get("/user", async (req, res) =>
  req.isAuthenticated() ? res.json(utils.formatUser(req.user)) : res.json({})
);

module.exports = router;
