const mongoose = require('mongoose');
const User=require("./user.model");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  task: {
    type: [String],
    required: true
  },
  priority: {
    type: String,
    enum: ['high', 'moderate', 'low']
  },
  dueDate: {
    type: Date,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{timestamps:true});


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
