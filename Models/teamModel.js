
import mongoose from "mongoose";

const teamSchema=new mongoose.Schema({
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
        default:new Date
    },
    members: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',  // Reference to the User model
            required: true,
          },
          role: {
            type: String,
            enum: ['admin', 'manager', 'user'], 
            default: 'user',  // Default role is user
          },
        },
      ],
})

export const TeamModel=mongoose.model("team",teamSchema);
