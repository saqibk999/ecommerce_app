const userModel = require('../models/userModel')



exports.getUserById = async function (req,res) {
    const id = req.body;
    const data = await userModel.getUserById(id);
    res.status(201).json({ status: "success", data});
 }