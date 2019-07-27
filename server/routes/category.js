const express = require("express");

const Category = require("../models/category");
const checkAuthenticated = require("../utils").checkAuthenticated;

const router = express.Router();

router.get("/user/categories", checkAuthenticated, async (req, res, next) => {
  await Category.find({ user: req.user._id })
    .exec()
    .then(categories =>
      res.json({
        categories: categories.map(category => ({
          _id: category._id,
          name: category.name
        }))
      })
    )
    .catch(error => next(error));
});

router.post("/user/categories", checkAuthenticated, async (req, res, next) => {
  const category = {
    name: req.body.name,
    user: req.user._id
  };

  await Category.create(category)
    .then(category =>
      res.json({
        category
      })
    )
    .catch(error => next(error));
});

// TODO: need to delete categories associated to gifs?
router.delete(
  "/user/categories/:id",
  checkAuthenticated,
  async (req, res, next) => {
    await Category.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).send())
      .catch(error => next(error));
  }
);

module.exports = router;
