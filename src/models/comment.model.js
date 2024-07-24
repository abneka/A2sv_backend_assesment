const mongoose = require('mongoose');

// Define the Comment schema
const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
  },
  {
    _id: false, // Prevents creating an additional _id for each comment
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
