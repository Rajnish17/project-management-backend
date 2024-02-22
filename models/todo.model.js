const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: [String],
    required: true
  },
  priority: {
    type: String,
    enum: ['high', 'moderate', 'low']
  },
  dueDate: {
    type: Date,
    default: Date.now
  }
});


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
