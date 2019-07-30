const checkAuthenticated = (req, res, next) =>
  req.isAuthenticated()
    ? next()
    : res
        .status(401)
        .json({ message: "You must be logged in to perform this action" });

const checkNotAuthenticated = (req, res, next) =>
  !req.isAuthenticated()
    ? next()
    : res
        .status(400)
        .json({ message: "You must be logged out to perform this action" });

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
