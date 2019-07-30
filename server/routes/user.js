const express = require("express");

const Category = require("../models/Category");
const Gif = require("../models/Gif");
const utils = require("../utils");

const router = express.Router();

router.get("/user", async (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = utils.formatUser(req.user);

    const gifs = await Gif.find({ user: req.user._id })
      .populate("categories")
      .exec()
      .then(gifs => gifs.map(gif => utils.formatGif(gif)))
      .catch(error => next(error));

    const categories = await Category.find({ user: req.user._id })
      .exec()
      .then(categories =>
        categories.map(category => utils.formatCategory(category))
      )
      .catch(error => next(error));

      res.json({
        
      })
  }

  res.json({});
});

module.exports = router;
