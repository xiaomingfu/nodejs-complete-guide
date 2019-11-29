const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.js");
// /admin/add-product => GET
router.get("/admin/add-product", adminController.getAddProduct);

// /admin/product => GET
router.get("/admin/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/admin/add-product", adminController.postAddProduct);

module.exports = router;
