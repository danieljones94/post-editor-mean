const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Post = require("./models/post");

router.get("./posts", (req, res) => {
  Post.find().then((rec) => {
    if (rec) {
      res.send(rec);
    } else {
      res.send([]);
    }
  });
});

router.post("./posts", (req, res) => {
  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    url: req.body.title,
  });
  post.save((err, rec) => {
    if (err) {
      return res.status(400).send("There was an error creating your post");
    }
    res.send(rec);
  });
});

module.exports = router;
