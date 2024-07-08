const jwt =require("jsonwebtoken");
require("dotenv").config();
const User =require("../models/User");

exports.protectRoute = async (req, res, next) => {
    try{

        console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");
        console.log("AFTER ToKEN EXTRACTION");
        
        console.log(token);

        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            const resp = await User.findById(decode.id).select(
                "isAdmin email"
              );
             console.log(resp);
              req.user = {
                email: resp.email,
                isAdmin: resp.isAdmin,
                userId: decode.id,
              };           
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}



exports.isAdminRoute = (req, res, next) => {
    if (req.user && req.user.isAdmin) {

      console.log(req.user);
      next();
    } else {
      return res.status(401).json({
        status: false,
        message: "Not authorized as admin. Try login as admin.",
      });
    }
  };
  
