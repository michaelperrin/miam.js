import RecipeListParser from './src/adapter/quitoque/RecipeListParser.js';
import RecipeParser from './src/adapter/quitoque/RecipeParser.js';

const parser = new RecipeListParser();

const fetchRecipes = async () => {
  let urls = await parser.getUrls();

  urls.forEach(async url => {
    const parser = new RecipeParser();
    const recipeData = await parser.getDataFromUrl(url);

    console.log(recipeData);
  });
}

fetchRecipes();
