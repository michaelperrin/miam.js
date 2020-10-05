import RecipeListParser from './src/adapter/quitoque/RecipeListParser.js';
import RecipeParser from './src/adapter/quitoque/RecipeParser.js';
import saveToFilesystem from './src/writer/saveToFilesystem.js';
import recipeExists from './src/writer/recipeExists.js';

const basePath = 'recipes';

const fetchRecipes = async () => {
  // Retrieve list of recipes
  const recipeListParser = new RecipeListParser();
  let recipes = await recipeListParser.getRecipesFromUrl();

  // Filter out recipes that have already been persisted
  recipes = recipes.filter((recipe) => !recipeExists(basePath, recipe.slug));

  // Persist recipes that don't exist yet
  recipes.forEach(async recipe => {
    const parser = new RecipeParser();

    parser.getDataFromUrl(recipe.url)
      .then((data) => { saveToFilesystem('recipes', data)});
  });
}

fetchRecipes();
