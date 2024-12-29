import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET 
// console.log("secretKey",secretKey)

// Middleware to authenticate token
export const authenticateToken = async (req, res, next) => {

    const token = req.headers.token; 


    if (!token) {
        return res.status(200).json({status:401 ,resmessage: "Unauthorized access, no token provided." });
    };

    jwt.verify(token, secretKey, (err, decoded) => {
        // console.log("error",err);
        // console.log("decode",decoded);
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(200).json({ status:402,resmessage: "Token has expired." });
            }
            return res.status(200).json({status: 403,resmessage: "Invalid token." });
        }

        // console.log("decode",decoded)
        req.user=decoded 
      next(); // Proceed to the next middleware or route handler

    });
};
// export default authenticateToken


