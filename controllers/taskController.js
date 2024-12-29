import  {TaskModel}  from "../Models/taskModel.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"; 

//*****************api to assign the to user********************** */
export const assignTask=async(req,res)=>{
    try{

        const { title, description, dueDate, priority, assignedTo}=req.body;
        if (!req.headers.token) {
              return res.status(401).json({ error: "please enter the token first" });
            }
            const tokenData = jwt.verify(req.headers.token, process.env.JWT_SECRET);
            if (tokenData.role !="admin" && tokenData.role !="manager" ) {
              return res
                .status(402)
                .json({ error: "only admin and manager can assign the task" });
            }
            if (tokenData.teamId == "" ) {
                return res
                  .status(402)
                  .json({ error: "Only admin and manager with a team can assign the task"  });
              }

            const task=new TaskModel({
                title:title,
                description:description,
                dueDate:dueDate,
                priority:priority,
                // $push: { assignedTo: assignedTo },
                assignedTo:assignedTo,
                createdAt:new Date(),
                teamId:tokenData.teamId
            })

            await task.save();
            return res.status(200).json({status:200,resmessage:"assign task successfully",task});

    }catch(err){
        console.log("something went wrong catch block executed",err);
        res.status(500).json({status:500,resmessage:"Internal server error",err});
    }
}

//****************api to read task based on the access*****************/
export const taskList=async(req,res)=>{
    try{

        let page = parseInt(req.body.page) || 1;
        let limit = parseInt(req.body.limit) || 35;
        let skip = (page - 1) * limit;

        
        if (!req.headers.token) {
              return res.status(401).json({ error: "please enter the token first" });
            }
            const tokenData = jwt.verify(req.headers.token, process.env.JWT_SECRET);
            let query={}
            if(tokenData.role == "superAdmin"){
                query={
                    
                    }
            }
            else if(tokenData.role == "admin" || tokenData.role == "manager"){
                query={
                teamId:tokenData.teamId
                }
            }else if( tokenData.role == "user"){
                query={
                    teamId:tokenData.teamId,
                    assignedTo:{$in:tokenData.userId}
                    }
            }
            const result=await TaskModel.find(query).sort({createdAt:-1}).skip(skip).limit(limit);
            if(result.length > 0){
                return res.status(200).json({status:200,resmessage:"task list fetch successfully",result});
            }else{
                return res.status(402).json({status:402,resmessage:"no task found"});
                
            }

    }catch(err){
        console.log("something went wrong catch block executed",err);
        res.status(500).json({status:500,resmessage:"Internal server error",err});
    }
}


//**********************update task**************************/
export const updateTast=async(req,res)=>{
    try{

        const { task_id,title, description, dueDate, priority, assignedTo}=req.body;
        if (!req.headers.token) {
              return res.status(401).json({ error: "please enter the token first" });
            }
            const tokenData = jwt.verify(req.headers.token, process.env.JWT_SECRET);
            if(tokenData.role == "user"){
                return res.status(402).json({error:"only manager and admin can update the task"});
            }
            const task=await TaskModel.findOne({_id:task_id});
            if(!task){
                return res.status(402).json({error:"task not found"})
            }
          
            let query={}
            if(tokenData.role == "superAdmin"){
                query={
                    _id:task_id
                    }
            }
            else if(tokenData.role == "admin" || tokenData.role == "manager"){
                query={
                teamId:tokenData.teamId,
                _id:task_id
                }
            }
            // }else if( tokenData.role == "user"){
            //     query={
            //         teamId:tokenData.teamId,
            //         assignedTo:{$in:tokenData.userId},
            //         _id:task_id
            //         }
            // }

            const updateTask=await TaskModel.updateOne(query,{$set:{title, description, dueDate, priority, assignedTo}})
           if(updateTask){

               return res.status(200).json({status:200,resmessage:"assign update successfully",updateTask});
           }

    }catch(err){
        console.log("something went wrong catch block executed",err);
        res.status(500).json({status:500,resmessage:"Internal server error",err});
    }
}



//************api to delete the task***************************/
export const deleteTask=async(req,res)=>{
    try{

        const {task_id}=req.body;
        if (!req.headers.token) {
              return res.status(401).json({ error: "please enter the token first" });
            }
            const tokenData = jwt.verify(req.headers.token, process.env.JWT_SECRET);
           console.log("====",tokenData);
           
            if (tokenData.role !="admin" && tokenData.role !="manager" && tokenData.role !="superAdmin" ) {
              return res
                .status(403)
                .json({ error: "only admin , manager and superAdmin can delete the task" });
            }
            const checkTask=await TaskModel.findOne({_id:task_id});
            if(checkTask){
                const deletetask=await TaskModel.deleteOne({_id:task_id})
                if(deleteTask){
                    return res.status(200).json({status:200,resmessage:" task delete successfully",deletetask});
                }else{
                    return res.status(402).json({status:402,resmessage:"oops task not delete"});
                    
                }
            }else{
                return res.status(402).json({error:`task not found on this task id ${task_id}`});
            }
       
    

    }catch(err){

        console.log("something went wrong catch block executed",err);
        res.status(500).json({status:500,resmessage:"Internal server error",err});
    }
}
