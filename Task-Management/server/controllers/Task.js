const Task = require('../models/Tasks'); 
const User = require("../models/User"); 
const mongoose = require('mongoose');
const { uploadImageToCloudinary} = require("../utils/imageUploder")
const Notice = require("../models/Notification");
const newTaskAssign = require("../mail/newTaskTemplate")
const mailSender = require('../utils/mailSender');

exports.createTask = async (req, res) => {
  try {
    console.log("one");
    const { userId } = req.user;
    const { title, stage, dueDate, priority, description, team: _team } = req.body;
    let attachedFileUrl = req.files.assignImage;

    // Parse team array from form data
    let team = "";
    try {
      team = JSON.parse(_team);
    } catch (e) {
      return res.status(400).json({ status: false, message: "Invalid team data" });
    }

    // Check if there's a file to upload
    if (req.files && req.files.assignImage) {
      const attachedFile = req.files.assignImage;
      const assign = await uploadImageToCloudinary(attachedFile, process.env.FOLDER_NAME);
      attachedFileUrl = assign.secure_url;
    }
  
    let text = "New task has been assigned to you";
    if (team.length > 1) {
      text += ` and ${team.length - 1} others.`;
    }

    text += ` The task priority is set at ${priority} priority, so check and act accordingly. The task date is ${new Date(dueDate).toDateString()}. Thank you!!!`;

    const activity = {
      type: "assigned",
      activity: text,
      by: userId,
    };
    const task = await Task.create({
      title,
      team,
      dueDate,
      priority: priority.toLowerCase(),
      description,
      assets: attachedFileUrl,
      activities: [activity],
      stage,
    });

    await Notice.create({
      team,
      text,
      task: task._id,
    });

    try {
      for (const memberId of team) {
        const user = await User.findById(memberId);
        if (user) {
          await mailSender(
            user.email,
            "New Task Assigned",
            newTaskAssign(user.email, user.username)
          );
        }
      }
    } catch (emailError) {
      console.log("Error sending emails", emailError);
    }

    res.status(200).json({ status: true, task, message: "Task created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};



  exports.postTaskActivity = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.user;
      const { type, activity } = req.body;
      
      console.log("one");
      console.log(type);
      const task = await Task.findById(id);
  
      const data = {
        type,
        activity,
        by: userId,
      };
  
      task.activities.push(data);
      console.log("two")
      console.log(type == "in progress" );
      console.log(type == "completed");

      if (type == "in progress" || type == "completed") {
        console.log("come under it");
        await Task.findByIdAndUpdate(
          {_id:id},
          {
            $set:{
              stage:type
            }
          },
          {new :true}
        )
      }  
      await task.save();
  
      res
        .status(200)
        .json({ status: true, message: "Activity posted successfully." });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  };

  exports.dashboardStatistics = async (req, res) => {
    try {
      const { userId, isAdmin } = req.user;
  
      const allTasks = isAdmin
        ? await Task.find({ })
            .populate({
              path: "team",   
            })
            .populate({
              path:"activities.by"
            })
            
        : await Task.find({
           
            team: { $all: [userId] },
          })
            .populate({
              path: "team",
            })
            .populate({
              path:"activities.by"
            })
           

      console.log(allTasks);

      const users = await User.find({ isActive: true })
        .select("username title role isAdmin createdAt")
        .limit(10)
        .sort({ _id: -1 });
      console.log(users);

      const groupTaskks = allTasks.reduce((result, task) => {
        const stage = task.stage;
  
        if (!result[stage]) {
          result[stage] = 1;
        } else {
          result[stage] += 1;
        }
        
        return result;
      }, {});

  
      // Group tasks by priority
      const groupData = Object.entries(
        allTasks.reduce((result, task) => {
          const { priority } = task;
  
          result[priority] = (result[priority] || 0) + 1;
          return result;
        }, {})
      ).map(([name, total]) => ({ name, total }));
       
      console.log(groupData);
      // calculate total tasks
      const totalTasks = allTasks?.length;
      const last10Task = allTasks?.slice(0, 10);
  
      const summary = {
        totalTasks,
        last10Task,
        users: isAdmin ? users : [],
        alltasks: groupTaskks,
        graphData: groupData,
      };
  
      res.status(200).json({
        status: true,
        message: "Successfully",
        ...summary,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  };

  exports.getTasks = async (req, res) => {
    try {
      const { stage, isTrashed } = req.query;
  
      let query = { isTrashed: isTrashed ? true : false };
  
      if (stage) {
        query.stage = stage;
      }
  
      let queryResult = Task.find(query)
        .populate({
          path: "team",
          select: "name title email",
        })
        .sort({ _id: -1 });
  
      const tasks = await queryResult;
  
      res.status(200).json({
        status: true,
        tasks,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  };
  
 
exports.getTargetTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id)
      .populate({
        path: "team",
      })
      .populate({
        path: "activities.by",
      });

    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: true,
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
  };
  
  exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find({}).populate({
        path:"team",
        select:"name title role email"
      })
      .populate({
        path:"activities.by",
        select:"name",
      }); 
      res.status(200).json({
        tasks, 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: error.message });
    }
  };
  
  exports.createSubTask = async (req, res) => {
    try {

      const { title, tag, date } = req.body;
      console.log(title, tag, date);
      const { id } = req.params;
  
      const newSubTask = {
        title,
        date,
        tag,
      };
  
      const task = await Task.findById(id);
  
      task.subTasks.push(newSubTask);
  
      await task.save();
  
      res
        .status(200)
        .json({ status: true, message: "SubTask added successfully." });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  };
  
  exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, date, team, stage, priority, assets } = req.body;
  
      const task = await Task.findById(id);
  
      task.title = title;
      task.date = date;
      task.priority = priority.toLowerCase();
      task.assets = assets;
      task.stage = stage.toLowerCase();
      task.team = team;
  
      await task.save();
  
      res
        .status(200)
        .json({ status: true, message: "Task duplicated successfully." });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  };
  
  exports.trashTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      const task = await Task.findById(id);
  
      task.isTrashed = true;
  
      await task.save();
  
      res.status(200).json({
        status: true,
        message: `Task trashed successfully.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  };
  
  exports.deleteRestoreTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { actionType } = req.query;
  
      if (actionType === "delete") {
        await Task.findByIdAndDelete(id);
      } else if (actionType === "deleteAll") {
        await Task.deleteMany({ isTrashed: true });
      } else if (actionType === "restore") {
        const resp = await Task.findById(id);
  
        resp.isTrashed = false;
        resp.save();
      } else if (actionType === "restoreAll") {
        await Task.updateMany(
          { isTrashed: true },
          { $set: { isTrashed: false } }
        );
      }
  
      res.status(200).json({
        status: true,
        message: `Operation performed successfully.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  };


  exports.getUserAssigenTask = async (req, res) => {
    const { userId } = req.user;
    try {
      console.log(userId);
      const taskAssigned = await Task.find({ team: userId })
      .populate('team')
      res.status(200).json({
        success: true,
        tasks: taskAssigned,
      });
    } catch (error) {
      console.error("Error fetching assigned tasks:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching assigned tasks",
        error: error.message,
      });
    }
  };

  