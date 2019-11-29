const express = require("express");

const router = express.Router();

const productController = require("../controllers/products.js");
// /admin/add-product => GET
router.get("/add-product", productController.getAddProduct);

// /admin/product => GET
router.get("/products", (req, res, next) => {
  res.render("admin/products");
});

// /admin/add-product => POST
router.post("/add-product", productController.postAddProduct);

router.get("/product-detail", (req, res, next) => {
  res.render("shop/product-list");
});
module.exports = router;
