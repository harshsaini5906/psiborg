import express from "express"
import dotenv from 'dotenv'; 
dotenv.config();   // Load the .env file
import connectDB from "./dbConnection/mongoDb.js"   // import db connection file
import routes from "./routes/index.js"
import cors from "cors"

const app= express()
const corsOptions = {
  origin: ['http://localhost:3000'],  // Add your frontend URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Define allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
};
app.use(cors(corsOptions))

connectDB();  
app.use(express.json());
app.use("/",routes);

const port=process.env.SERVER_PORT || 4200





app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})