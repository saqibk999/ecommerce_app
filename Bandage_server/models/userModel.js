const db = require("../libraries/db");

exports.getUserById = async(id) =>{
    return db("users")
    .select("*")
    .where(id)
    .then((result) => {
      return result;
    })
    .catch((error) => {
        console.log(error)
    });
}