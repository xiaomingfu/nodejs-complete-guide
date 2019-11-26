const express = require("express");

const router = express.Router();

router.get("/users", (req, res, next) => {
  res.render("admin");
});

module.exports = router;
