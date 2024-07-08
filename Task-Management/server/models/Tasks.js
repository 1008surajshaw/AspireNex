const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
    },
    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress", "completed"],
    },
    activities: [
      {
        type: {
          type: String,
          default: "assigned",
          enum: ["assigned", "started", "in progress", "bug", "completed"],
        },
        activity: String,
        date: { type: Date, default: Date.now },
        by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    subTasks: [
      {
        title: String,
        date: Date,
        tag: String,
      },
    ],
    assets: {
      type:String,
    },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);