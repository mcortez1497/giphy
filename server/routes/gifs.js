const express = require("express");
const fetch = require("node-fetch");

const Gif = require("../models/Gif");
const checkAuthenticated = require("../utils").checkAuthenticated;

const router = express.Router();

// Passthrough for GIPHY API call
router.get("/gifs", async (req, res, next) => {
  const query = req.query.q;
  const api_key = process.env.GIPHY_API_KEY;

  const url = query
    ? `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${api_key}`
    : `http://api.giphy.com/v1/gifs/trending?api_key=${api_key}`;

  await fetch(url)
    .then(response => response.json())
    .then(json => {
      res.json({
        ...json
      });
    })
    .catch(error => next(error));
});

router.get("/user/gifs", checkAuthenticated, async (req, res, next) => {
  await Gif.find({ user: req.user._id })
    .populate("categories")
    .exec()
    .then(gifs =>
      res.json({
        gifs
      })
    )
    .catch(error => next(error));
});

router.post("/user/gifs", checkAuthenticated, async (req, res, next) => {
  const gif = {
    url: req.body.url,
    title: req.body.title,
    user: req.user._id
  };

  await Gif.create(gif)
    .then(gif =>
      res.json({
        gif
      })
    )
    .catch(error => next(error));
});

router.patch("/user/gifs/:id", checkAuthenticated, async (req, res, next) => {
  const categoryId = req.body.categoryId;
  const gif = await Gif.findOne({ user: req.user._id });

  if (!gif.categories.includes(categoryId)) {
    gif.categories.push(categoryId);
  }

  await gif
    .save()
    .then(gif =>
      res.json({
        gif
      })
    )
    .catch(error => next(error));
});

router.delete("/user/gifs/:id", checkAuthenticated, async (req, res, next) => {
  await Gif.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).send())
    .catch(error => next(error));
});

router.get(
  "/user/categories/:id/gifs",
  checkAuthenticated,
  async (req, res, next) => {
    await Gif.find({ user: req.user._id, categories: req.params.id })
      .exec()
      .then(gifs =>
        res.json({
          gifs
        })
      )
      .catch(error => next(error));
  }
);

module.exports = router;
