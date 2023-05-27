const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel} = require("../Model/user.model");
const { Router } = require("express");
const userRouter = Router();
require("dotenv").config();


userRouter.get("/", async (req, res) => {
  let users= await UserModel.find();
  res.send(users);
});


// Signup Completed Here 

userRouter.post("/signup", async (req, res) => {
  const {name,email,password} = req.body;
    try{
       let existingUser = await UserModel.findOne({email})
       console.log(existingUser)
       if(existingUser){
        res.send(`User with Email Id ${email} already exist`)
       }
       else{
        bcrypt.hash(password, 5, async(err, secure_password)=> {
            if(err){
                res.send(err)
            }else{
                let createUser = new UserModel({ name : name ,email : email , password : secure_password, role : "Explorer"})
                await createUser.save()
                res.send("Signup Successfully")
                // res.send(createUser)
            }
            
        });
       
       }
    }catch(e){
        console.log(e.message)
        res.send(e.message)
    }

});


// Login Completed of User
// Login COmpleted

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).send("Invalid User");
  }
  const hashed_pass = user.password;

  await bcrypt.compare(password, hashed_pass, (err, result) => {
    if (err) {
      return res.status(511).send("bcryption failed");
    }
    if (result) {
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        process.env.TOKEN_KEY
      );
      res.send({
        message: "login successful",
        token: token,
        email: email,
        name: user.name,
      });
    } else {
      res.send("Inavalid Password");
    }
  });
});

// Delete the User 
userRouter.delete("/remove/:id",async (req,res)=>{
  let Id=req.params.id;
  await UserModel.findByIdAndDelete({_id:Id});
  res.send("User Deleted");
});


//  User Routes patch 

userRouter.patch("/update/:id",async(req,res)=>{
  let Id=req.params.id;
  let upd=req.body;
  await UserModel.findByIdAndUpdate({_id: Id},{upd});
  res.send("User Updated");
});


module.exports = {userRouter};