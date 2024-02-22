const express = require('express');
const Todo = require("../models/todo.model.js");

// Create a new task
const createTodo = async (req, res) => {
  try {
    const { title, priority, dueDate } = req.body;
    const newTask = new Todo({
      title,
      priority,
      dueDate
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Todo.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single task
const getSingleTask = async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.body.title != null) {
      task.title = req.body.title;
    }
    if (req.body.priority != null) {
      task.priority = req.body.priority;
    }
    if (req.body.dueDate != null) {
      task.dueDate = req.body.dueDate;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Filter tasks by due date (today, this week, this month)
const filterTasksByDueDate = async (req, res) => {
  const { timeframe } = req.params;
  let startDate, endDate;

  if (timeframe === 'today') {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
  } else if (timeframe === 'thisweek') {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date();
    endDate.setDate(endDate.getDate() + (7 - endDate.getDay()));
    endDate.setHours(23, 59, 59, 999);
  } else if (timeframe === 'thismonth') {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    endDate.setHours(23, 59, 59, 999);
  } else {
    return res.status(400).json({ message: 'Invalid timeframe' });
  }

  try {
    const tasks = await Todo.find({ dueDate: { $gte: startDate, $lte: endDate } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTodo,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  filterTasksByDueDate
};
