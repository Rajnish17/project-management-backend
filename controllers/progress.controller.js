const Progress = require("../models/progress.model");
const Todo = require("../models/todo.model");

const AddToProgress = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Find data from Todo model based on the provided ID
        const todoItem = await Todo.findById(id);

        if (!todoItem) {
            return res.status(404).json({ message: "Todo item not found" });
        }

        // Step 2: Create a new instance of the Progress model using the data obtained from the Todo model
        const newProgressItem = new Progress({
            title: todoItem.title,
            task: todoItem.task,
            priority: todoItem.priority,
            dueDate: todoItem.dueDate,
            user: todoItem.user
        });

        // Step 3: Save the data to the Progress model
        const savedProgressItem = await newProgressItem.save();

        // Step 4: Delete the data from the Todo model
        await Todo.findByIdAndDelete(id);

        res.status(201).json(savedProgressItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const GetAllProgress = async (req, res) => {
    const userId = req.params.id; 
    try {
        const progressItems = await Progress.find({ user: userId });
        res.status(200).json(progressItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const shareProgress = async (req, res) => {
    try {
      const task = await Progress.findById(req.params.id);
      if (task == null) {
        return res.status(404).json({ message: 'Task not found' });
      }
    
      res.json({ task});
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

const UpdateProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProgressItem = await Progress.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProgressItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const DeleteProgress = async (req, res) => {
    try {
        const { id } = req.params;
        await Progress.findByIdAndDelete(id);
        res.status(204).json({ message: "Progress item deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { AddToProgress, GetAllProgress, UpdateProgress, DeleteProgress,shareProgress };
