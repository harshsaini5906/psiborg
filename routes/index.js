import express from "express"
import userRoute from './userRoutes.js'
import teamRoute  from './teamRoutes.js'
import  taskRoute from './taskRoutes.js'

const routes =express.Router()

routes.use("/user",userRoute);

routes.use("/task",taskRoute);

routes.use("/team",teamRoute)

export default routes
