const express = require("express");
const { check, body } = require("express-validator/check");

const router = express.Router();

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/isAuth");

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// // /admin/product => GET
router.get("/products", isAuth, adminController.getProducts);

// // /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title")
      .isLength({ min: 3 })
      .isString()
      .trim(),
    body("imageUrl")
      .isURL()
      .withMessage("Please enter valid image url."),
    body("price")
      .isFloat()
      .withMessage("Please enter valid price."),
    body("description")
      .isLength({ min: 5, max: 200 })
      .trim()
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title")
      .isLength({ min: 3 })
      .trim(),
    body("imageUrl")
      .isURL()
      .withMessage("Please enter valid image url."),
    body("price")
      .isFloat()
      .withMessage("Please enter valid price."),
    body("description")
      .isLength({ min: 5, max: 200 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
