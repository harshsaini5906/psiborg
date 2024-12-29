import express from "express"
import {assignTask,taskList,updateTast,deleteTask} from "../controllers/taskController.js"
import { authenticateToken} from "../middleware/middlewareFunction.js"

const taskRoute =express.Router();

taskRoute.post("/assignTask",authenticateToken,assignTask);
taskRoute.post("/taskList",authenticateToken,taskList);
taskRoute.post("/updateTast",authenticateToken,updateTast);
taskRoute.post("/deleteTask",authenticateToken,deleteTask);

export default taskRoute;