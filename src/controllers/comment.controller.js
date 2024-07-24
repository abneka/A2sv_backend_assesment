const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const Recipe = require('../models/recipe.model');

// Comment Service Functions

const createComment = async (recipeId, commentBody, user) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recipe not found');
  }

  const comment = {
    ...commentBody,
    author: user, // Assuming `author` is passed in the request
  };
  recipe.comments.push(comment);
  await recipe.save();
  return comment;
};

const getCommentsByRecipeId = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId).populate('comments.author');
  if (!recipe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recipe not found');
  }
  return recipe.comments;
};

const getCommentById = async (recipeId, commentId) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recipe not found');
  }
  const comment = recipe.comments.id(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  return comment;
};

const updateCommentById = async (recipeId, commentId, updateBody) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recipe not found');
  }
  const comment = recipe.comments.id(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  Object.assign(comment, updateBody);
  await recipe.save();
  return comment;
};

const deleteCommentById = async (recipeId, commentId) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recipe not found');
  }
  const comment = recipe.comments.id(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  comment.remove();
  await recipe.save();
};

// Comment Controller Functions

const createCommentController = catchAsync(async (req, res) => {
  const recipeId = req.params.recipeId;
  const user = req.user; // Assuming `user` is attached to the request context
  const comment = await createComment(recipeId, req.body, user);
  res.status(httpStatus.CREATED).send(comment);
});

const getCommentsController = catchAsync(async (req, res) => {
  const recipeId = req.params.recipeId;
  const comments = await getCommentsByRecipeId(recipeId);
  res.send(comments);
});

const getCommentController = catchAsync(async (req, res) => {
  const recipeId = req.params.recipeId;
  const commentId = req.params.commentId;
  const comment = await getCommentById(recipeId, commentId);
  res.send(comment);
});

const updateCommentController = catchAsync(async (req, res) => {
  const recipeId = req.params.recipeId;
  const commentId = req.params.commentId;
  const comment = await updateCommentById(recipeId, commentId, req.body);
  res.send(comment);
});

const deleteCommentController = catchAsync(async (req, res) => {
  const recipeId = req.params.recipeId;
  const commentId = req.params.commentId;
  await deleteCommentById(recipeId, commentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCommentController,
  getCommentsController,
  getCommentController,
  updateCommentController,
  deleteCommentController,
};
