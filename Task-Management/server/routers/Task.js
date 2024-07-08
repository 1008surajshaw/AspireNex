const express = require("express")
const router = express.Router()
const { protectRoute,isAdminRoute }  = require("../middlewares/auth.js");
const {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteRestoreTask,
  getTargetTask,
  getTasks,
  postTaskActivity,
  trashTask,
  updateTask,
  getAllTasks,
  getUserAssigenTask
}  = require("../controllers/Task");


router.post("/create", protectRoute, isAdminRoute, createTask);
router.post("/activity/:id", protectRoute, postTaskActivity);
router.get("/getassignedtask", protectRoute, getUserAssigenTask);
router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);
router.get("/target/:id", protectRoute, getTargetTask);
router.get("/get", protectRoute, isAdminRoute,getAllTasks)
router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
router.put("/:id", protectRoute, isAdminRoute, trashTask);

router.delete( "/delete-restore/:id?", protectRoute, isAdminRoute, deleteRestoreTask
);

module.exports =  router;
