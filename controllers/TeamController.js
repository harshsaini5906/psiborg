import {TeamModel} from "../Models/teamModel.js";
import {userModel} from "../Models/userModel.js";

import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

//*************api to create team****************/
export const createTeam = async (req, res) => {
  try {
    const { teamName } = req.body;
    if (!teamName) {
      return res
        .status(400)
        .json({ resmessage: "please enter the team name first" });
    }
    if (!req.headers.token) {
      return res.status(401).json({ error: "please enter the token first" });
    }
    const tokenData = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    if (tokenData.role !="superAdmin" || tokenData.role == "") {
      return res
        .status(402)
        .json({ error: "only superAdmin can create the team" });
    }
    const newTeam = new TeamModel({
      name: teamName,
      createdAt: new Date(),
    });
    const team = await newTeam.save();
    if (team) {
      // console.log("team successfully created",team);
      return res
        .status(200)
        .json({ status: 200, resmessage: "team created successfully", team });
    }
  } catch (err) {
    console.log(
      "something went wrong catch block executed in team controller",
      err
    );
    return res
      .status(500)
      .json({ status: 500, resmessage: "Internal server error" });
  }
};

//********************api to add user in the team*************************/

export const addUserToTeam = async (req, res) => {
  try {
    const { teamId, userId, role } = req.body;
    if (!teamId || !userId || !role) {
      return res
        .status(400)
        .json({ resmessage: "please enter the teamId userId,role first" });
    }
    if (!req.headers.token) {
      return res.status(401).json({ error: "please enter the token first" });
    }
    const tokenData = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    const teamExist = await TeamModel.findOne({ _id: teamId });
    if (role == "admin" || role == "manager") {
      const isRoleExists = teamExist.members.some((member) => member.role == role);
      console.log("role exist",isRoleExists)
      if (isRoleExists) {
        return res.status(404).json({ error: "One team can have only one admin and one manager." });
      }
    }
    console.log("=====team>>>",teamExist)
    if (!teamExist) {
      return res.status(402).json({ error: "team not found" });
    }
    let assignTeam
    let userUpdate
    if (tokenData.role == "superAdmin") {
     assignTeam = await TeamModel.updateOne(
        { _id: teamId },
        { $push: { members: { userId: userId, role: role } } }
      );
      if (assignTeam) {
      userUpdate=  await userModel.updateOne(
          { _id: userId },
          { $set: { role: role, teamId: teamId } }
        );
      }
    } else if (tokenData.role == "admin") {
      if (tokenData.teamId != teamId) {
        return res
          .status(400)
          .json({
            status: 400,
            resmessage: `You are not authorized to manage users or tasks in Team ${teamId} becouse you belong to a different team.`,
          });
      }
      assignTeam = await TeamModel.updateOne(
        { _id: teamId },
        { $push: { members: { userId: userId, role: role } } }
      );
      if (assignTeam) {
       userUpdate= await userModel.updateOne(
          { _id: userId },
          { $set: { role: role, teamId: teamId } }
        );
      }
    }else {
      // If the user doesn't have the proper role
      return res.status(403).json({ error: "Only superAdmin and admin can add users to teams" });
    }
    return res.status(200).json({status:200,resmessage:"team assign successfully",assignTeam,userUpdate})
  } catch (err) {
    console.log(
      "something went wrong catch block executed in team controller",
      err
    );
    return res
      .status(500)
      .json({ status: 500, resmessage: "Internal server error" });
  }
};



//*******************team detail API********************** */
export const teamDetail = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(400).json({ error: "token not found" });
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
     let query={}
     if(tokenData.role == "superAdmin"){
      query={

      }
     }else if(tokenData.role =="admin"){
      query={
        _id:tokenData.teamId
      }
     }
    const team=await TeamModel.findOne(query).populate("members.userId");
   

   
    if (team) {
      return res.status(200).json({
        status: 200,
        resmessage: "userDetail fetch successfully",
        team,
      });
    } else {
      return res.status(402).json({ resmessage: "No team detail found" });
    }
  } catch (err) {
    console.log("somethig went wrong catch block executed", err);
    res.status(500).json({ status: 500, resmessage: "Internal server error" });
  }
};
