const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Post = require("./models/post");

router.get("/posts", (req, res) => {
  Post.find().then((rec) => {
    if (rec) {
      res.send(rec);
    } else {
      res.send([]);
    }
  });
});

router.post("/posts", (req, res) => {
  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    url: req.body.url,
  });
  post.save((err, rec) => {
    if (err) {
      return res.status(400).send("There was an error creating your post");
    }
    res.send(rec);
  });
});

router.put("/posts/:id/upvote", (req, res) => {
  Post.findById(req.params.id),
    (err, rec) => {
      if (err) {
        return res
          .status(400)
          .send("Sorry, there doesn't appear to be a post with the given id");
      }
      rec.votes = rec.votes + 1;
      rec.markModified("posts");
      rec.save();
      res.send(rec);
    };
});

router.put("/posts/:id/downvote", (req, res) => {
  Post.findById(req.params.id),
    (err, rec) => {
      if (err) {
        return res
          .status(400)
          .send("Sorry, there doesn't appear to be a post with the given id");
      }
      rec.markModified("posts");
      rec.save();
      res.send(rec);
    };
});

router.delete("/posts/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id }, (err, rec) => {
    if (err) {
      return res
        .status(400)
        .send("Sorry there was an error deleting your post");
    }
    res.send(rec);
  });
});

module.exports = router;
