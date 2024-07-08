const express =require("express");
const router =express.Router()
 const {
     login, signup,changePassword,getTeamList,getNotificationsList,markNotificationRead,activateUserProfile} = require("../controllers/Auth")

const {protectRoute,isAdminRoute} = require("../middlewares/auth")


router.post("/login", login)

router.post("/signup", signup)

router.put("/changepassword", protectRoute, changePassword);

router.get("/get-team", protectRoute, isAdminRoute, getTeamList);

router.get("/notifications", protectRoute, getNotificationsList);

router.put("/read-notification", protectRoute, markNotificationRead);



router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)

module.exports = router


 