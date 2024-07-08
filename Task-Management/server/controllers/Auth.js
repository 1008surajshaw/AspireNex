const User = require("../models/User")
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");
require("dotenv").config();
const mailSender =require("../utils/mailSender");
const { passwordUpdated } =require("../mail/passwordUpdate");
const Profile = require("../models/Profile")
const Notice = require("../models/Notification")


exports.signup =async (req,res) =>{

    //data fetch from request ki body
  try{
    const {
        username,
        role,
        title,
        email,
        password,
        confirmPassword,
        isAdmin

    } =req.body;
    console.log(
      username,
      role,
      title,
      email,
      password,
      confirmPassword,
    
    )
    
    if(!username ||!email || !password || !confirmPassword){
        return res.status(403).json({
            success:false,
            message:"all fields are required",
        });

    }
    
    if(password !==confirmPassword){
        return res.status(400).json({
    success:false,
    message:"password and confirm password value are not same"
});
}

   
    const existingUser =await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:'user is already register',
        });
    }
    console.log(email)   
    //hash password

    const hashedPassword =await bcrypt.hash(password,10);
    //enter create in db
    const profileDetails =await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
    })


    const user =await User.create({
        username,
        email,
        password:hashedPassword,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${username} ${username}`,
        isAdmin,
        role,
        title,
    })
    
    return res.status(200).json({
        success:true,
        message:'user is register successfully',
        user,
    })
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        messaga:'user cannot registered. sign in me catch me aa gya'
    })
  }
}



exports.login =async (req,res)=>{
    try{
    //get data from req body

    const { email,password }=req.body;
    
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:'all fields are required,please try again'
        });
    }
    
    const user = await User.findOne({ email });
     
    if (!user) {
        return res
          .status(401)
          .json({ status: false, message: "Invalid email or password." });
      }
  
      if (!user?.isActive) {
        return res.status(401).json({
          status: false,
          message: "User account has been deactivated, contact the administrator",
        });
      }
 
   

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;
      user.password = undefined;

    //create cookies and send response
  const options ={
    expires: new Date(Date.now()+3 * 24 * 60 * 60 * 1000),
    httpOnly:true,
  }
    res.cookie("token",token,options).status(200).json({
        success:true,
        token,
        user:user,
        message:'logged in successfully'
    });

   }
   else{
    return res.status(401).json({
        success:false,
        message:'password is incorrect',
    });
   }

    }
    catch(error){
     console.log(error)
     return res.status(500).json({
        success:false,
        message:'login failure, come in catch block in log in time'
     })
    }
}


exports.changePassword =async (req,res) =>{
    try{
        //get DATA from req ,body
      const userId = await User.findById(req.user.id);
        console.log(userId)
       
        const { oldPassword,password } =req.body;
        console.log("9")
        
       
        const isPasswordMatch =await bcrypt.compare(oldPassword,userId.password);
        console.log("isPasswordMatch:", isPasswordMatch);
        if(!isPasswordMatch){
          return res.status(401).json({
            success:false,
            message:'password error'
            
          })
        }
      const encryptredPassword = await bcrypt.hash(password,10);
      console.log("1")
    
        const updatedUserDetails =  await User.findByIdAndUpdate(
           req.user.id,
            {password:encryptredPassword},
            {new:true},
         ).populate("additionalDetails");
         console.log("1")
        try{
         const emailResponse =await mailSender(
                updatedUserDetails.email,
                "password update Confirmation",
                passwordUpdated(
  
                  updatedUserDetails.email,
                  `Password updated successfully for ${updatedUserDetails.username}`
              )
         );
         console.log("Email sent successfully:", emailResponse.response);
  
        }
        catch(error){
           // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
              console.error("Error occurred while sending email:", error);
              return res.status(500).json({
                  success: false,
                  message: "Error occurred while sending email",
                  error: error.message,
              }); 
        }
        return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
    }
    catch(error){
  console.error("Error occurred while updating password:", error);
  return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
  });
    }
 }



exports.getTeamList = async (req, res) => {
  try {
    const users = await User.find({}).select()
    .populate({
      path:"task"
    })
    .populate({
      path:"additionalDetails"
    });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

exports.getNotificationsList = async (req, res) => {
  try {
    const { userId } = req.user;

    const notice = await Notice.find({
      team: userId,
      isRead: { $nin: [userId] },
    }).populate("task", "title");

    res.status(201).json(notice);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};


exports.markNotificationRead = async (req, res) => {
  try {
    const { userId } = req.user;

    const { isReadType, id } = req.query;

    if (isReadType === "all") {
      await Notice.updateMany(
        { team: userId, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
    } else {
      await Notice.findOneAndUpdate(
        { _id: id, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
    }

    res.status(201).json({ status: true, message: "Done" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

exports.activateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (user) {
      user.isActive = req.body.isActive; //!user.isActive

      await user.save();

      res.status(201).json({
        status: true,
        message: `User account has been ${
          user?.isActive ? "activated" : "disabled"
        }`,
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

