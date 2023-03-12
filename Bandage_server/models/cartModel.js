const db = require("../libraries/db");

exports.addToCart = async (rowFields) => {
  return db("cart_details")
    .insert(rowFields)
    .then((result) => result.rowCount)
    .catch((error) => -1);
};

exports.getCartProducts = async (userId) => {
  return db
    .raw(
      'SELECT name,images,price,category,id,c.quantity FROM products p inner JOIN cart_details c on p.id=c."productId" where c."userId"=?',
      [userId]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((error) => console.log(error));
};

exports.deleteProductFromCart = async (queryField) => {
  return db("cart_details")
    .where(queryField)
    .del()
    .then((result) => {
      console.log("result= " + result);
      return result;
    })
    .catch((error) => console.log(error));
};

exports.deleteAllCart = async (queryField) => {
  return db("cart_details")
    .where(queryField)
    .del()
    .then((result) => {
      return result;
    })
    .catch((error) => console.log(error));
};

exports.updateQuantity = async (queryField) => {
  console.log(queryField);
  const quantity = queryField.quantity;
  const userId = queryField.userId;
  const productId = queryField.productId;
  return db("cart_details")
    .where({
      userId,
      productId,
    })
    .update({ quantity: quantity })
    .then((result) => result)
    .catch((error) => console.log(error));
};
