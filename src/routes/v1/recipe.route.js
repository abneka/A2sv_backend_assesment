const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const recipeController = require('../../controllers/recipe.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageRecipes'), recipeController.createRecipeController)
  .get(auth('getRecipes'), recipeController.getRecipesController);

router
  .route('/:recipeId')
  .get(auth('getRecipes'), recipeController.getRecipeController)
  .patch(auth('manageRecipes'), recipeController.updateRecipeController)
  .delete(auth('manageRecipes'), recipeController.deleteRecipeController);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management and retrieval
 */

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Create a recipe
 *     description: Only admins can create recipes.
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - ingredients
 *               - instructions
 *               - preparationTime
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     quantity:
 *                       type: string
 *               instructions:
 *                 type: string
 *               preparationTime:
 *                 type: integer
 *                 format: int32
 *             example:
 *               title: Spaghetti Bolognese
 *               ingredients:
 *                 - name: Spaghetti
 *                   quantity: 200g
 *                 - name: Ground Beef
 *                   quantity: 300g
 *               instructions: Cook spaghetti according to package instructions. In a separate pan, cook ground beef until browned. Combine with tomato sauce and serve over spaghetti.
 *               preparationTime: 30
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Recipe'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all recipes
 *     description: Retrieve a list of recipes.
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Recipe title
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. title:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of recipes
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Recipe'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /recipes/{recipeId}:
 *   get:
 *     summary: Get a recipe
 *     description: Retrieve details of a specific recipe.
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Recipe'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a recipe
 *     description: Update details of a specific recipe.
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     quantity:
 *                       type: string
 *               instructions:
 *                 type: string
 *               preparationTime:
 *                 type: integer
 *                 format: int32
 *             example:
 *               title: Spaghetti Bolognese
 *               ingredients:
 *                 - name: Spaghetti
 *                   quantity: 200g
 *                 - name: Ground Beef
 *                   quantity: 300g
 *               instructions: Cook spaghetti according to package instructions. In a separate pan, cook ground beef until browned. Combine with tomato sauce and serve over spaghetti.
 *               preparationTime: 30
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Recipe'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a recipe
 *     description: Remove a specific recipe from the database.
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
