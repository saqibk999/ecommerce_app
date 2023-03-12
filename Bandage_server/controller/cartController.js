const cartModel = require("../models/cartModel");

exports.insertIntoCart = async (req, res, next) => {
  const { userId, productId, amount } = req.body;
  const createdAt = Date.now();
  const quantity = 1;
  const rowFields = {
    userId,
    productId,
    amount,
    quantity,
    createdAt,
  };
  const rowCount = cartModel.addToCart(rowFields);

  if (rowCount) {
    if (rowCount === -1) {
      res
        .status(501)
        .json({ status: "blocked", message: "item already exists" });
    } else {
      res.status(201).json({ status: "success", message: "added to cart" });
    }
  } else {
    res.status(501).json({ status: "fail", message: "failed to add item" });
  }
};

exports.getProductsFromCart = async (req, res, next) => {
  const userId = req.body.userId;
  const cart = await cartModel.getCartProducts(userId);
  if (cart) {
    res.status(201).json({ status: "success", cart });
  }
  if (!cart) {
    //console.log(cart)
    res
      .status(501)
      .json({ status: "failed", message: "can't get product list" });
  }
};

exports.deleteProduct = async (req, res, next) => {
    const {productId,userId} = req.body;
    const queryField= 
    {   productId,
        userId
    }
    const rowCount = await cartModel.deleteProductFromCart(queryField);
    console.log("rowCount= "+rowCount)
    if (rowCount) {
         res.status(201).json({ status: "success", message: "deleted from cart" });
      } else {
        res.status(501).json({ status: "fail", message: "failed to delete item" });
      }
}

exports.updateQuantity = async (req, res, next) => {
    const {productId,userId,quantity} = req.body;
    const queryField = 
    {   productId,
        userId,
        quantity
    }
    const rowCount = await cartModel.updateQuantity(queryField);
    if (rowCount) {
         res.status(201).json({ status: "success", message: "updated quantity" });
      } else {
        res.status(501).json({ status: "fail", message: "failed to update quantity" });
      }
}

exports.deleteCart = async (req, res, next) => {
    const userId = req.body;
    
    const rowCount = await cartModel.deleteAllCart(userId);
    if (rowCount) {
        res.status(201).json({ status: "success", message: "cart deleted" });
     } else {
       res.status(501).json({ status: "fail", message: "failed to delete cart" });
     }
}
