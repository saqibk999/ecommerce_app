const db = require("../libraries/db");

exports.getAllProducts = async () => {
    return db("products")
    .select("*")
    .then((result) => {
      return result;
    })
    .catch((error) => null);
}

exports.getProductById = async (id) => {
    
    return db("products")
    .select("*")
    .where({id})
    .then((result) => {
        return result;
    })
    .catch((error) => console.log(error));
}