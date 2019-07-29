const express = require("express");
const fetch = require("node-fetch");

const Gif = require("../models/Gif");
const checkAuthenticated = require("../utils").checkAuthenticated;

const router = express.Router();

// Passthrough for GIPHY API call
router.get("/gifs", async (req, res, next) => {
  const request = {
    q: req.query.q !== undefined ? req.query.q : "",
    limit: req.query.limit !== undefined ? req.query.limit : "24",
    offset: req.query.offset !== undefined ? req.query.offset : "0",
    rating: "g",
    api_key: process.env.GIPHY_API_KEY
  };

  const endpoint = request.q ? "search" : "trending";
  const params = Object.keys(request)
    .map(key => `${key}=${request[key]}`)
    .join("&");

  const url = `http://api.giphy.com/v1/gifs/${endpoint}?${params}`;

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
        gifs: gifs.map(gif => ({
          _id: gif._id,
          giphy_id: gif.giphy_id,
          url: gif.url,
          title: gif.title,
          categories: gif.categories.map(category => ({
            _id: category._id,
            name: category.name
          }))
        }))
      })
    )
    .catch(error => next(error));
});

router.post("/user/gifs", checkAuthenticated, async (req, res, next) => {
  const gif = {
    giphy_id: req.body.giphy_id,
    title: req.body.title,
    url: req.body.url,
    user: req.user._id
  };

  await Gif.create(gif)
    .then(gif =>
      res.json({
        gif: {
          _id: gif._id,
          giphy_id: gif.giphy_id,
          url: gif.url,
          title: gif.title,
          categories: gif.categories.map(category => ({
            _id: category._id,
            name: category.name
          }))
        }
      })
    )
    .catch(error => next(error));
});

router.patch("/user/gifs/:id", checkAuthenticated, async (req, res, next) => {
  const categoryIds = req.body.categoryIds;
  const gif = await Gif.findOne({ _id: req.params.id });

  if (gif && gif.categories) {
    gif.categories = categoryIds;
  }

  await gif
    .save()
    .then(gif => Gif.populate(gif, { path: "categories" }))
    .then(gif =>
      res.json({
        gif: {
          _id: gif._id,
          giphy_id: gif.giphy_id,
          url: gif.url,
          title: gif.title,
          categories: gif.categories.map(category => ({
            _id: category._id,
            name: category.name
          }))
        }
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
          gifs: gifs.map(gif => ({
            _id: gif._id,
            giphy_id: gif.giphy_id,
            url: gif.url,
            title: gif.title,
            categories: gif.categories.map(category => ({
              _id: category._id,
              name: category.name
            }))
          }))
        })
      )
      .catch(error => next(error));
  }
);

module.exports = router;
