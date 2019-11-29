const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/", productsController.getProducts);

router.get("/cart", (req, res, next) => {
  res.render("shop/cart.ejs");
});

router.get("/products", (req, res, next) => {
  res.render("shop/product-list.ejs");
});

router.get("/checkout", (req, res, next) => {
  res.render("shop/checkout.ejs");
});

module.exports = router;
