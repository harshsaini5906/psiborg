import dotenv from "dotenv";
dotenv.config();
import {  userModel } from "../Models/userModel.js";
import { superAdminModel } from "../Models/superAdminModel.js";

import jwt from "jsonwebtoken";

//********************register superAdmin*************************/
export const superAdminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await superAdminModel.find();
    if (existUser.length > 0) {
      return res
        .status(400)
        .json({
          status: 400,
          error: "superAdmin already register",
        });
    }
    const newUser = new superAdminModel({
      name: name,
      email: email,
      password: password,
      role: "superAdmin",
    });
    await newUser.save();
    res.status(200).json({
      status: 200,
      resmessage: "Congratulation superAdmin  register successfully",
      newUser,
    });
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

/********************user register API**************************/
export const restUserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await userModel.findOne({ email: email });
    if (existUser) {
      return res
        .status(400)
        .json({ status: 400, error: "user already register with this email" });
    }
    const newUser = new userModel({
      name: name,
      email: email,
      password: password,
    });
    await newUser.save();
    res.status(200).json({
      status: 200,
      resmessage: "Congratulation user register ",
      newUser,
    });
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

//*************api to login users************/

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const RestExistUser = await userModel.findOne({
      email: email,
      password: password,
    });
    const superAdmin = await superAdminModel.findOne({
      email: email,
      password: password,
    });

    const user = RestExistUser || superAdmin;
    if (user) {
      
      let updateToken
      
      if (user.role == "superAdmin") {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "5h" }
        );
        updateToken = await superAdminModel.updateOne(
          { _id: user._id },
          { $set: { token: token } }
        );
      }else{
        const token = jwt.sign(
          { userId: user._id, role: user.role, teamId: user.teamId },
          process.env.JWT_SECRET,
          { expiresIn: "5h" }
        );
        updateToken = await userModel.updateOne(
            { _id: user._id },
            { $set: { token: token } }
          );
    
      }

      
      return res.status(200).json({
        status: 200,
        resmessage: "user login successfull",
        user,
        updateToken,
      });
    } else {
      return res.status(400).json({ resmessage: "user not found" });
    }
  } catch (err) {
    console.log("something went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};

//*****************get user profile api***************/

export const userDetail = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(400).json({ error: "token not found" });
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    const superAdmin=await superAdminModel.findOne({_id:tokenData.userId});
    const existUser = await userModel.findOne({ _id: tokenData.userId });

    const user =superAdmin || existUser
    if (user) {
      return res.status(200).json({
        status: 200,
        resmessage: "userDetail fetch successfully",
        user,
      });
    } else {
      return res.status(402).json({ resmessage: "No user detail found" });
    }
  } catch (err) {
    console.log("somethig went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};
