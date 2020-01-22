const express = require("express");
const { body } = require("express-validator/check");
const feedController = require("../controllers/feed");

const router = express.Router();

//  get /feed/posts
router.get("/posts", feedController.getPosts);

//Post /feed/post
router.post(
  "/post",
  [
    body("title")
      .trim()
      .isLength({ min: 5 }),
    body("content")
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.createPost
);

router.get("/post/:postId", postController.getPost);

module.exports = router;
