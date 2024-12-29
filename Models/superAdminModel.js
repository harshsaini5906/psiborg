

import mongoose from "mongoose";

const superSchema=new mongoose.Schema({
    name:{
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
        enum:["superAdmin"],
        default:"superAdmin"
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

export const superAdminModel=mongoose.model("superAdmin",superSchema);
