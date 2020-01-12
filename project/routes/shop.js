const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

const isAuth = require("../middleware/isAuth");

router.get("/", shopController.getIndex);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.postCart);

router.post("/cart-delete-item", isAuth, shopController.postCartDelete);

router.get("/orders", isAuth, shopController.getOrders);

router.get("/orders/:orderId", isAuth, shopController.getInvoice);

router.post("/create-order", isAuth, shopController.postOrder);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

module.exports = router;
