const express = require("express");

const router = express.Router();

const data = require("./main");

router.get("/users", (req, res, next) => {
  const names = data.names;
  res.render("admin", { pageTitle: "users", names: names });
});

module.exports = router;
