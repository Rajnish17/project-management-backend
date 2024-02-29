const Todo = require("../models/todo.model");
const Backlog = require("../models/backlog.model");
const Progress = require("../models/progress.model");
const Done = require("../models/done.model");

const CountAllTasks = async (req, res) => {
    const userId = req.params.id;

    try {
        // console.log("userId:", userId);

        // Count total tasks for each model
        const todoCount = await Todo.countDocuments({ user: userId });
        const backlogCount = await Backlog.countDocuments({ user: userId });
        const progressCount = await Progress.countDocuments({ user: userId });
        const doneCount = await Done.countDocuments({ user: userId });

        // Count low priority tasks for each model
        const todoLowPriorityCount = await Todo.countDocuments({ user: userId, priority: "low" });
        const backlogLowPriorityCount = await Backlog.countDocuments({ user: userId, priority: "low" });
        const progressLowPriorityCount = await Progress.countDocuments({ user: userId, priority: "low" });
        const doneLowPriorityCount = await Done.countDocuments({ user: userId, priority: "low" });

        // Count moderate priority tasks for each model
        const todoModeratePriorityCount = await Todo.countDocuments({ user: userId, priority: "moderate" });
        const backlogModeratePriorityCount = await Backlog.countDocuments({ user: userId, priority: "moderate" });
        const progressModeratePriorityCount = await Progress.countDocuments({ user: userId, priority: "moderate" });
        const doneModeratePriorityCount = await Done.countDocuments({ user: userId, priority: "moderate" });

        // Count high priority tasks for each model
        const todoHighPriorityCount = await Todo.countDocuments({ user: userId, priority: "high" });
        const backlogHighPriorityCount = await Backlog.countDocuments({ user: userId, priority: "high" });
        const progressHighPriorityCount = await Progress.countDocuments({ user: userId, priority: "high" });
        const doneHighPriorityCount = await Done.countDocuments({ user: userId, priority: "high" });

        // Calculate total counts for each priority
        const totalLowPriority = todoLowPriorityCount + backlogLowPriorityCount + progressLowPriorityCount + doneLowPriorityCount;
        const totalModeratePriority = todoModeratePriorityCount + backlogModeratePriorityCount + progressModeratePriorityCount + doneModeratePriorityCount;
        const totalHighPriority = todoHighPriorityCount + backlogHighPriorityCount + progressHighPriorityCount + doneHighPriorityCount;

        // Prepare response object with counts for each model and priority
        const response = {
            todo: todoCount,
            backlog: backlogCount,
            progress: progressCount,
            done: doneCount,
            lowPriority: totalLowPriority,
            moderatePriority: totalModeratePriority,
            highPriority: totalHighPriority

        };

        return res.status(200).json(response);
    } catch (error) {
        // Handle error if any
        console.error("Error counting tasks:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



const ShareTodo = async (req, res) => {
    try {
      const taskId = req.params.id;
      const todo = await Todo.findById(taskId);
      const backlog = await Backlog.findById(taskId);
      const progress = await Progress.findById(taskId);
      const done = await Done.findById(taskId);
  
     

      if(todo){
        return res.status(200).json({task:todo});
      }else if(backlog){
        return res.status(200).json({task:backlog});
      }else if(progress){
        return res.status(200).json({task:progress});
      }else if(done){
        return res.status(200).json({task:done});
      }
  
    } catch (error) {
      console.error("Error sharing todo:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  

module.exports = {CountAllTasks, ShareTodo};
