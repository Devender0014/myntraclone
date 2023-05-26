const mongoose= require("mongoose");
require("dotenv").config();

const connection = mongoose.connect("mongodb+srv://yadav0014dev:<password>@cluster0.kek4hfd.mongodb.net/?retryWrites=true&w=majority");

module.exports={connection};