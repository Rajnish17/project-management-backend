const Todo = require("../models/todo.model");
const Progress = require("../models/progress.model");
const Backlog = require("../models/backlog.model");
const Done = require("../models/done.model");



const FindFromTodoAddToProgress = async (req, res) => {
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


const FindFromTodoAddToDone = async (req, res) => {
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

const FindFromTodoAddToBacklog = async (req, res) => {
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


const FindFromBacklogAddToDone = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Find data from Backlog model based on the provided ID
        const backlogItem = await Backlog.findById(id);

        if (!backlogItem) {
            return res.status(404).json({ message: "Backlog item not found" });
        }

        // Step 2: Create a new instance of the Done model using the data obtained from the Backlog model
        const newDoneItem = new Done({
            title: backlogItem.title,
            task: backlogItem.task,
            priority: backlogItem.priority,
            dueDate: backlogItem.dueDate,
            user: backlogItem.user
        });

        // Step 3: Save the data to the Done model
        const savedDoneItem = await newDoneItem.save();

        // Step 4: Delete the data from the Backlog model
        await Backlog.findByIdAndDelete(id);

        res.status(201).json(savedDoneItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const FindFromBacklogAddToTodo = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Find data from Backlog model based on the provided ID
        const backlogItem = await Backlog.findById(id);

        if (!backlogItem) {
            return res.status(404).json({ message: "Backlog item not found" });
        }

        // Step 2: Create a new instance of the Todo model using the data obtained from the Backlog model
        const newTodoItem = new Todo({
            title: backlogItem.title,
            task: backlogItem.task,
            priority: backlogItem.priority,
            dueDate: backlogItem.dueDate,
            user: backlogItem.user
        });

        // Step 3: Save the data to the Todo model
        const savedTodoItem = await newTodoItem.save();

        // Step 4: Delete the data from the Backlog model
        await Backlog.findByIdAndDelete(id);

        res.status(201).json(savedTodoItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const FindFromBacklogAddToProgress = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Find data from Backlog model based on the provided ID
        const backlogItem = await Backlog.findById(id);

        if (!backlogItem) {
            return res.status(404).json({ message: "Backlog item not found" });
        }

        // Step 2: Create a new instance of the Progress model using the data obtained from the Backlog model
        const newProgressItem = new Progress({
            title: backlogItem.title,
            task: backlogItem.task,
            priority: backlogItem.priority,
            dueDate: backlogItem.dueDate,
            user: backlogItem.user
        });

        // Step 3: Save the data to the Progress model
        const savedProgressItem = await newProgressItem.save();

        // Step 4: Delete the data from the Backlog model
        await Backlog.findByIdAndDelete(id);

        res.status(201).json(savedProgressItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const FindFromProgressAddToDone = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Find data from Progress model based on the provided ID
        const progressItem = await Progress.findById(id);

        if (!progressItem) {
            return res.status(404).json({ message: "Progress item not found" });
        }

        // Step 2: Create a new instance of the Done model using the data obtained from the Progress model
        const newDoneItem = new Done({
            title: progressItem.title,
            task: progressItem.task,
            priority: progressItem.priority,
            dueDate: progressItem.dueDate,
            user: progressItem.user
        });

        // Step 3: Save the data to the Done model
        const savedDoneItem = await newDoneItem.save();

        // Step 4: Delete the data from the Progress model
        await Progress.findByIdAndDelete(id);

        res.status(201).json(savedDoneItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const FindFromProgressAddToDo = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Find data from Progress model based on the provided ID
        const progressItem = await Progress.findById(id);

        if (!progressItem) {
            return res.status(404).json({ message: "Progress item not found" });
        }

        // Step 2: Create a new instance of the Todo model using the data obtained from the Progress model
        const newTodoItem = new Todo({
            title: progressItem.title,
            task: progressItem.task,
            priority: progressItem.priority,
            dueDate: progressItem.dueDate,
            user: progressItem.user
        });

        // Step 3: Save the data to the Todo model
        const savedTodoItem = await newTodoItem.save();

        // Step 4: Delete the data from the Progress model
        await Progress.findByIdAndDelete(id);

        res.status(201).json(savedTodoItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const FindFromProgressAddToBacklog = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Find data from Progress model based on the provided ID
        const progressItem = await Progress.findById(id);

        if (!progressItem) {
            return res.status(404).json({ message: "Progress item not found" });
        }

        // Step 2: Create a new instance of the Backlog model using the data obtained from the Progress model
        const newBacklogItem = new Backlog({
            title: progressItem.title,
            task: progressItem.task,
            priority: progressItem.priority,
            dueDate: progressItem.dueDate,
            user: progressItem.user
        });

        // Step 3: Save the data to the Backlog model
        const savedBacklogItem = await newBacklogItem.save();

        // Step 4: Delete the data from the Progress model
        await Progress.findByIdAndDelete(id);

        res.status(201).json(savedBacklogItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const FindFromDoneAddToBacklog = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Find data from Done model based on the provided ID
        const doneItem = await Done.findById(id);

        if (!doneItem) {
            return res.status(404).json({ message: "Done item not found" });
        }

        // Step 2: Create a new instance of the Backlog model using the data obtained from the Done model
        const newBacklogItem = new Backlog({
            title: doneItem.title,
            task: doneItem.task,
            priority: doneItem.priority,
            dueDate: doneItem.dueDate,
            user: doneItem.user
        });

        // Step 3: Save the data to the Backlog model
        const savedBacklogItem = await newBacklogItem.save();

        // Step 4: Delete the data from the Done model
        await Done.findByIdAndDelete(id);

        res.status(201).json(savedBacklogItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const FindFromDoneAddToTodo = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Find data from Done model based on the provided ID
        const doneItem = await Done.findById(id);

        if (!doneItem) {
            return res.status(404).json({ message: "Done item not found" });
        }

        // Step 2: Create a new instance of the Todo model using the data obtained from the Done model
        const newTodoItem = new Todo({
            title: doneItem.title,
            task: doneItem.task,
            priority: doneItem.priority,
            dueDate: doneItem.dueDate,
            user: doneItem.user
        });

        // Step 3: Save the data to the Todo model
        const savedTodoItem = await newTodoItem.save();

        // Step 4: Delete the data from the Done model
        await Done.findByIdAndDelete(id);

        res.status(201).json(savedTodoItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const FindFromDoneAddToProgress = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Find data from Done model based on the provided ID
        const doneItem = await Done.findById(id);

        if (!doneItem) {
            return res.status(404).json({ message: "Done item not found" });
        }

        // Step 2: Create a new instance of the Progress model using the data obtained from the Done model
        const newProgressItem = new Progress({
            title: doneItem.title,
            task: doneItem.task,
            priority: doneItem.priority,
            dueDate: doneItem.dueDate,
            user: doneItem.user
        });

        // Step 3: Save the data to the Progress model
        const savedProgressItem = await newProgressItem.save();

        // Step 4: Delete the data from the Done model
        await Done.findByIdAndDelete(id);

        res.status(201).json(savedProgressItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


module.exports = {
    FindFromTodoAddToProgress,
    FindFromTodoAddToDone,
    FindFromTodoAddToBacklog,
    FindFromBacklogAddToDone,
    FindFromBacklogAddToTodo,
    FindFromBacklogAddToProgress,
    FindFromProgressAddToDone,
    FindFromProgressAddToDo,
    FindFromProgressAddToBacklog,
    FindFromDoneAddToBacklog,
    FindFromDoneAddToTodo,
    FindFromDoneAddToProgress
};



