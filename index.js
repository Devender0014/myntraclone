const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const { connection }= require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel} = require("./Model/user.model")
const port = process.env.port
const cors = require("cors")

//Import All the Routers Here
const {userRouter} = require("./Router/user.route");
const {orderRouter} = require("./Router/order.route")
const {cartRouter} = require("./Router/cart.route")
const  {productRoute} = require("./Router/product.route")

const app = express();
app.use(express.json());

app.use(cors({
    origin : "*"
}))

app.get("/", async(req, res) => {
    res.send("homepage routes are /users /mens /womens /cart /order");
});

app.use("/users", userRouter);
app.use("/user/order", orderRouter);
app.use("/cart", cartRouter);
app.use("/product", productRoute)



app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log("Connected to DB")

    }catch(err){
        console.log(err);
        console.log("Error while connecting to DB");
    }
    console.log(`server is running at port ${process.env.port}`);
});
