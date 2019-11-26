const express = require("express");

const router = express.Router();

const names = [];
router.get("/", (req, res, next) => {
  res.render("main", { pageTitle: "welcome" });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  // names.push({ name: req.body.username });
  res.redirect("/users");
});
module.exports = router;
