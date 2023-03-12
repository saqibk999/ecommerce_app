const productController = require("../controller/productController");
const express = require("express");
const router = express.Router();

router.get("/get-list", productController.getProductList);
router.get("/:id", productController.getProductById);

module.exports = router;
