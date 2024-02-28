const Done = require("../models/done.model");
const Todo = require("../models/todo.model");

const AddToDone = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Find data from Todo model based on the provided ID
        const todoItem = await Todo.findById(id);

        if (!todoItem) {
            return res.status(404).json({ message: "Todo item not found" });
        }

        // Step 2: Create a new instance of the Done model using the data obtained from the Todo model
        const newDoneItem = new Done({
            title: todoItem.title,
            task: todoItem.task,
            priority: todoItem.priority,
            dueDate: todoItem.dueDate,
            user: todoItem.user
        });

        // Step 3: Save the data to the Done model
        const savedDoneItem = await newDoneItem.save();

        // Step 4: Delete the data from the Todo model
        await Todo.findByIdAndDelete(id);

        res.status(201).json(savedDoneItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const GetAllDone = async (req, res) => {
    const userId = req.params.id; 
    try {
        const doneItems = await Done.find({ user: userId });
        res.status(200).json(doneItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const shareDone = async (req, res) => {
    try {
      const task = await Done.findById(req.params.id);
      if (task == null) {
        return res.status(404).json({ message: 'Task not found' });
      }
    
      res.json({ task});
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

const UpdateDone = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDoneItem = await Done.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedDoneItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const DeleteDone = async (req, res) => {
    try {
        const { id } = req.params;
        await Done.findByIdAndDelete(id);
        res.status(204).json({ message: "Done item deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { AddToDone, GetAllDone, UpdateDone, DeleteDone,shareDone };
