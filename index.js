import RecipeListParser from './src/adapter/quitoque/RecipeListParser.js';
import RecipeParser from './src/adapter/quitoque/RecipeParser.js';
import saveToFilesystem from './src/writer/saveToFilesystem.js';

const fetchRecipes = async () => {
  const recipeListParser = new RecipeListParser();
  let urls = await recipeListParser.getUrls();

const fetchRecipes = async () => {
  let urls = await parser.getUrls();

  urls.forEach(async url => {
    const parser = new RecipeParser();

    parser.getDataFromUrl(url)
      .then((data) => { saveToFilesystem('recipes', data)});
  });
}

fetchRecipes();
