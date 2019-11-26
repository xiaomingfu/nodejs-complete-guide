const express = require("express");

const router = express.Router();

const names = [];
router.get("/", (req, res, next) => {
  res.render("main", { pageTitle: "welcome" });
});

router.post("/", (req, res, next) => {
  names.push({ name: req.body.username });
  console.log(names);
  res.redirect("/users");
});
exports.routes = router;
exports.names = names;
