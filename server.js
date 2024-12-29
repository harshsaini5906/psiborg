import express from "express"
import dotenv from 'dotenv'; 
dotenv.config();   // Load the .env file
import connectDB from "./dbConnection/mongoDb.js"   // import db connection file
import routes from "./routes/index.js"

const app= express()

connectDB();  
app.use(express.json());
app.use("/",routes);

const port=process.env.SERVER_PORT || 4200





app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})