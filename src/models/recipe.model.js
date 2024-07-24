const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const Comment = require('./comment.model'); // Import the Comment schema

// Define the Recipe schema
const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        quantity: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    instructions: {
      type: String,
      required: true,
    },
    preparationTime: {
      type: Number,
      required: true,
    },
    comments: [Comment.schema], // Embed the Comment schema
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to json
recipeSchema.plugin(toJSON);

// Define and export the Recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
