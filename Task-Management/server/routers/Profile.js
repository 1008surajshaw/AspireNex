const express = require("express")
const router = express.Router()
const {protectRoute} = require("../middlewares/auth")

const {deleteAccount,updateProfile,getAllUserDeatails,updateDisplayPicture,getAssignTask} = require("../controllers/Profile")


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",protectRoute, deleteAccount)
router.put("/updateProfile",protectRoute,  updateProfile)
router.get("/getUserDetails",protectRoute,  getAllUserDeatails)

router.put("/updateDisplayPicture",protectRoute,  updateDisplayPicture)
// router.get("/assigntask",auth,getAssignTask)
module.exports = router