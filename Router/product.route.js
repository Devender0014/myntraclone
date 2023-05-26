const authenticator = require("../middlewares/authenticator")
const express = require("express");
require("dotenv").config();
const { Router } = require("express");
const productRoute = Router();
const {products} = require("../Model/product.model")

productRoute.get("/" , async(req,res)=>{
    const query = req.query
    const {limit=12 , page=1} = req.query
    console.log(limit , page)
    try{
      const allProducts = await products.find(query).limit(limit).skip((page-1)*limit)
      res.send(allProducts)

    }catch(e){
        res.send(e.message)
    }
})

//Get SingleProduct

productRoute.get("/:id" ,async(req,res)=>{
    let id = req.params.id
    try{
        let product = await products.findById(id)
        res.send(product)

    }catch(e){
        res.send(e.message)
    }
})
module.exports = {productRoute};