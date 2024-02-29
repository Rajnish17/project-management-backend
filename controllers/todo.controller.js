const express = require('express');
const Todo = require("../models/todo.model.js");

// Create a new task
const createTodo = async (req, res) => {
  try {
    const { title,task, priority, dueDate } = req.body;
    
    const userId = req.user.userId;
    // console.log(userId);
    const newTask = new Todo({
      title,
      task,
      priority,
      dueDate,
      user:userId
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all tasks
const getAllTodo = async (req, res) => {
  try {
    const tasks = await Todo.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all task of single user
const getAllTodoOfSingleUser = async (req, res) => {
  const userId = req.params.id; 

  try {
    const tasks = await Todo.find({ user: userId }); 
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single task on share
const getShareTodo = async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
  
    res.json({ task});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (req.body.title != null) {
      todo.title = req.body.title;
    }
    if (req.body.task != null) {
      todo.task = req.body.task;
    }
    if (req.body.priority != null) {
      todo.priority = req.body.priority;
    }
    if (req.body.dueDate != null) {
      todo.dueDate = req.body.dueDate;
    }

    const updatedTask = await todo.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task
const deleteTodo = async (req, res) => {
  try {
    const task = await Todo.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Filter tasks by due date (today, this week, this month)
const filterTodoByDueDate = async (req, res) => {
  const { timeframe } = req.params;
  let startDate, endDate;

  if (timeframe === 'today') {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
  } else if (timeframe === 'thisweek') {
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 6); // Set startDate to 7 days ago
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
  } else if (timeframe === 'thismonth') {
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 60); // Set startDate to the first day of the current month
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
  } else {
    return res.status(400).json({ message: 'Invalid timeframe' });
  }

  try {
    const tasks = await Todo.find({ createdAt: { $gte: startDate, $lte: endDate } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  createTodo,
  getAllTodo,
  getShareTodo,
  updateTodo,
  deleteTodo,
  filterTodoByDueDate,
  getAllTodoOfSingleUser
};
