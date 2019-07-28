const mongoose = require("mongoose");

const GifSchema = new mongoose.Schema({
  giphy_id: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  ]
});

module.exports = mongoose.model("Gif", GifSchema);
