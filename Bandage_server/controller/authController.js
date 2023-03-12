const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validate = require("../helpers/validation");

const { v4: uuidv4 } = require("uuid");

const JWT_SECRET = "hflakhfahakfva";

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(email);

    if (!username || !password || !email) {
      res.status(403).json({
        status: "blocked",
        message: "Please Enter complete details",
      });
      return;
    }

    if (!validate.validateEmail(email)) {
      res.status(403).json({
        status: "blocked",
        message: "Please Enter valid email",
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const id = uuidv4();
    const firstName = username;
    const rowCount = await authModel.saveUserDetails({
      id,
      firstName,
      email,
      password: passwordHash,
    });
    console.log(rowCount);

    if (rowCount) {
      if (rowCount === -1) {
        res
          .status(501)
          .json({ status: "blocked", message: "user already exists" });
      } else {
        res.status(201).json({ status: "success", message: "inserted user" });
      }
    } else {
      res
        .status(501)
        .json({ status: "fail", message: "failed to insert user" });
    }
  } catch (e) {
    res.status(401).json({
      status: "fail",
      message: "Registeration Failed",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("email= " + typeof(email));
    console.log("password= " + password);

    if (!password || !email) {
      res.status(403).json({
        status: "blocked",
        message: "Please Enter complete details",
      });
      return;
    }
    if (!validate.validateEmail(email)) {
      res.status(403).json({
        status: "invalid-email",
        message: "Please Enter valid email",
      });
      return;
    }
    const user = (await authModel.getUser({ email }))[0];
    if (user) {
      const id = user.id;
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (passwordCompare) {
        const token = jwt.sign({ id }, JWT_SECRET);
        res.status(201).json({
          status: "success",
          token,
        });
      } else {
        res.status(403).json({
          status: "forbidden",
          message: "Invalid Password",
        });
      }
    } else {
      res.status(503).json({
        status: "unavailable",
        message: "User does not exist, please register",
      });
    }
  } catch (e) {
    console.log(e)
    res.status(401).json({
      status: "fail",
      message: "Login Failed here",
    });
  }
};
