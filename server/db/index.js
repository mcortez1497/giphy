const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("mongoDB is open"));

module.exports = db;
