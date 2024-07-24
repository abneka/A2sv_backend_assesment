const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const Recipe = require('../models/recipe.model');

// Recipe Service Functions

const createRecipe = async (recipeBody) => {
  console.log(recipeBody);
  return Recipe.create(recipeBody);
};

const queryRecipes = async (filter, options) => {
  return Recipe.find()
};

const getRecipeById = async (recipeId) => {
  return Recipe.findById(recipeId);
};

const updateRecipeById = async (recipeId, updateBody) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recipe not found');
  }
  Object.assign(recipe, updateBody);
  await recipe.save();
  return recipe;
};

const deleteRecipeById = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recipe not found');
  }
  await recipe.remove();
};

// Recipe Controller Functions

const createRecipeController = catchAsync(async (req, res) => {
  const { title, ingredients, instructions, preparationTime } = req.body;
  const user = req.user; // Extracted user from token

  const recipe = await Recipe.create({
    title,
    ingredients,
    instructions,
    preparationTime,
    creator: user._id, // Set creator as the logged-in user
  });
  res.status(httpStatus.CREATED).send(recipe);
});

const getRecipesController = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'creator']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await queryRecipes(filter, options);
  res.send(result);
});

const getRecipeController = catchAsync(async (req, res) => {
  const recipe = await getRecipeById(req.params.recipeId);
  if (!recipe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recipe not found');
  }
  res.send(recipe);
});

const updateRecipeController = catchAsync(async (req, res) => {
  const recipe = await updateRecipeById(req.params.recipeId, req.body);
  res.send(recipe);
});

const deleteRecipeController = catchAsync(async (req, res) => {
  await deleteRecipeById(req.params.recipeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRecipeController,
  getRecipesController,
  getRecipeController,
  updateRecipeController,
  deleteRecipeController,
};
