const db = require("../libraries/db");

exports.saveUserDetails = (rowFields) => {
  return db("users")
    .insert(rowFields)
    .then((result) => result.rowCount)
    .catch((error) => -1);
};

exports.getUser = (queryField) => {
  return db("users")
    .select("id", "password")
    .where(queryField)
    .then((result) => {
      return result;
    })
    .catch((error) => null);
};

exports.insertAuth = (email, passwordHash) => {
  return db("auth")
    .insert({
      email,
      password: passwordHash,
    })
    .then((result) => result.rowCount);
};
