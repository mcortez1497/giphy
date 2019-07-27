const checkAuthenticated = (req, res, next) =>
  req.isAuthenticated() ? next() : res.status(401).send()

const checkNotAuthenticated = (req, res, next) =>
  !req.isAuthenticated() ? next() : res.status(400).send()
  
module.exports.checkAuthenticated = checkAuthenticated;
module.exports.checkNotAuthenticated = checkNotAuthenticated;
