const checkAuthenticated = (req, res, next) =>
  req.isAuthenticated() ? next() : res.status(401).send();

const checkNotAuthenticated = (req, res, next) =>
  !req.isAuthenticated() ? next() : res.status(400).send();

const formatCategory = category => ({
  _id: category._id,
  name: category.name
});

const formatGif = gif => ({
  _id: gif._id,
  giphy_id: gif.giphy_id,
  url: gif.url,
  title: gif.title,
  categories: gif.categories.map(category => formatCategory(category))
});

const formatUser = user => ({
  username: user.username,
  _id: user._id
});

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
  formatCategory,
  formatGif,
  formatUser
};