const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  url: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Post", postSchema);
