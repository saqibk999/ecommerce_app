const orderDetailsController = require('../controller/orderDetailsController')
const express = require("express");
const router = express.Router();

router.post("/place",orderDetailsController.insertUserOrderDetail)


module.exports = router;