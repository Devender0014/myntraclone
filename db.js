const mongoose= require("mongoose");
require("dotenv").config();

const connection = mongoose.connect("mongodb+srv://yadav0014dev:yadav@cluster0.vtlpfqv.mongodb.net/myntraDatabase?retryWrites=true&w=majority");

module.exports={connection};