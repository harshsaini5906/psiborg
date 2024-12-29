
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    teamId:{
        type:String,
        default:""
    },
    createdAt:{
        type:Date,
        default:new Date
    },
    updatedAt:{
        type:Date,
        // default:new
    },
    role:{
        type:String,
        enum:["admin","manager","user"],
        default:"user"
    },
    email:{
        type:String,
        default:"",
        required:true
    },
    password:{
        type:String,
        default:true
    },
    token:{
        type:String,
        default:""
    }

})

export const userModel=mongoose.model("user",userSchema);
