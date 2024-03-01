const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  hash: { type: String },
  salt: { type: String },
  admin: { type: Boolean },
});

module.exports = mongoose.model("User", UserSchema);
