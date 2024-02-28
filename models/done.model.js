const mongoose = require('mongoose');
const User=require("./user.model");

const DoneSchema = new mongoose.Schema({
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
});


const Done = mongoose.model('Done', DoneSchema);

module.exports = Done;
