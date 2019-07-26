const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Not using ES6 arrow function here to avoid lexical "this" scoping
UserSchema.pre("save", async function(next) {
  const user = this;
  await bcrypt
    .hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(error => console.log(error));
});

module.exports = mongoose.model("User", UserSchema);
