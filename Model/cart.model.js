

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        delivery_time : {type : Number , default : 3 , required : true},
   image : {type : String , required : true},
   productname : {type : String , required : true},
   price : {type : String,required : true},
   strike_price : {type : Number},
   size : {type : String ,required : true},
   category:{type:String , required:true},
   description:{type : String },
   multi_image:{type:Array},
   quantity : {type : Number , default : 1 , min : 1 , required : true},
   userID : {type : String , required : true}
    },
    {

    versionKey: false,
    timestamps: true,
    }
)

const CartModel = mongoose.model("cart", cartSchema);
module.exports={CartModel};