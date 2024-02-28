const Backlog = require("../models/backlog.model");
const Todo = require("../models/todo.model");

const AddToBacklog = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Find data from Todo model based on the provided ID
        const todoItem = await Todo.findById(id);

        if (!todoItem) {
            return res.status(404).json({ message: "Todo item not found" });
        }

        // Step 2: Create a new instance of the Backlog model using the data obtained from the Todo model
        const newBacklogItem = new Backlog({
            title: todoItem.title,
            task: todoItem.task,
            priority: todoItem.priority,
            dueDate: todoItem.dueDate,
            user: todoItem.user
        });

        // Step 3: Save the data to the Backlog model
        const savedBacklogItem = await newBacklogItem.save();

        // Step 4: Delete the data from the Todo model
        await Todo.findByIdAndDelete(id);

        res.status(201).json(savedBacklogItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const shareBacklog = async (req, res) => {
    try {
      const task = await Backlog.findById(req.params.id);
      if (task == null) {
        return res.status(404).json({ message: 'Task not found' });
      }
    
      res.json({ task});
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
  
const GetAllBacklog = async (req, res) => {
    const userId = req.params.id; 
    try {
        const backlogItems = await Backlog.find({ user: userId });
        res.status(200).json(backlogItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const UpdateBacklog = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBacklogItem = await Backlog.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedBacklogItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const DeleteBacklog = async (req, res) => {
    try {
        const { id } = req.params;
        await Backlog.findByIdAndDelete(id);
        res.status(204).json({ message: "Backlog item deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { AddToBacklog, GetAllBacklog, UpdateBacklog, DeleteBacklog ,shareBacklog};
