const orderDetailsModel = require('../models/orderDetailsModel')
const { v4: uuidv4 } = require("uuid");


exports.insertUserOrderDetail = async (req, res, next) => {
    const { userId, amount } = req.body;
    const id = uuidv4();
    const createdAt = Date.now();
    const rowFields = {
      id,
      userId,
      amount,
      createdAt,
      orderStatus:"pending",
      paymentStatus:"pending"
    };
    const rowCount = orderDetailsModel.postUserOrderDetails(rowFields);
  
    if (rowCount) {
        res.status(201).json({ status: "success", message: "order placed",id });
      }
     else {
      res.status(501).json({ status: "fail", message: "failed to place order" });
    }
  };