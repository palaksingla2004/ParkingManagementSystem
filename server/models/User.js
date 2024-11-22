// // models/User.js
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// module.exports = mongoose.model('User ', UserSchema);

const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    firstName:{
        type : String , 
        require : [ true , "please add your name"],
    },
    lastName:{
        type : String , 
        require : [ true , "please add your last name"],
    },
    userName:{
        type : String , 
        require : [ true , "please add your last name"],
    },
    email:{
        type : String , 
        require : [ true , "please add your last name"],
    },
    phoneNumber:{
        type : Number , 
        require : [ true , "please add your phone number"],
    },
    password:{
        type : String,
        require : [ true , "please add your passwprd"],
    }
},
{
    timestamps : true ,
});
module.exports = mongoose.model("User" , userSchema);