const productModel = require('../models/productModel')

//const {getProductById,getProducts,getCategory} = require("../models/products")

exports.getProductList = async function (req,res) {
        const products = await productModel.getAllProducts();
        if(products){
        res.status(201).json({ status: "success", products });
        }
        if(!products){
        res.status(501).json({status:"failed",message:"can't get product list"})
        }
    }

exports.getProductById = async function (req,res) {
       const id = req.params.id;
       const product = await productModel.getProductById(id);
       res.status(201).json({ status: "success", product});
    }

 
 
