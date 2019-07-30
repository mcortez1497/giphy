const express = require("express");

const Category = require("../models/category");
const utils = require("../utils");

const router = express.Router();

router.get(
  "/user/categories",
  utils.checkAuthenticated,
  async (req, res, next) => {
    await Category.find({ user: req.user._id })
      .exec()
      .then(categories =>
        res.json({
          categories: categories.map(category => utils.formatCategory(category))
        })
      )
      .catch(error => next(error));
  }
);

router.post(
  "/user/categories",
  utils.checkAuthenticated,
  async (req, res, next) => {
    const category = {
      name: req.body.name,
      user: req.user._id
    };

    await Category.create(category)
      .then(category =>
        res.json({
          category: utils.formatCategory(category)
        })
      )
      .catch(error => next(error));
  }
);

// TODO: need to delete categories associated to gifs?
router.delete(
  "/user/categories/:id",
  utils.checkAuthenticated,
  async (req, res, next) => {
    await Category.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ success: true }))
      .catch(error => next(error));
  }
);

module.exports = router;
