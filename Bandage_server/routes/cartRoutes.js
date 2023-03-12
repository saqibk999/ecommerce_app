const cartController = require('../controller/cartController')
const express = require("express");
const router = express.Router();

router.post('/add-to-cart',cartController.insertIntoCart)
router.post('/get-cart',cartController.getProductsFromCart)
router.post("/delete-product",cartController.deleteProduct)
router.post("/update-quantity",cartController.updateQuantity)
router.post("/delete-cart",cartController.deleteCart)

module.exports = router;