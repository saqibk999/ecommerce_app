const db = require("../libraries/db");

exports.postUserOrderDetails = async (rowFields) => {
    return db("order_details")
    .insert(rowFields)
    .then((result) => {
        console.log(result)
       return result.rowCount
    })
    .catch((error) => console.log(error));
}

exports.getUserOrderDetails = async (userId) => {
    return db("order_details")
    .select("*")
    .where({userId})
    .then((result) => {
        result.rows
    })
    .catch((error) => console.log(error));
}
