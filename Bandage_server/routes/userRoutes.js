const userController = require('../controller/userController')
const express = require("express");
const router = express.Router();

router.post('/get-by-id',userController.getUserById)

module.exports = router;