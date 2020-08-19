import axios from 'axios';
import cheerio from 'cheerio';
import getRecipeSlug from './getRecipeSlug.js';

const BASE_URL = 'https://www.quitoque.fr';
const DEFAULT_RECIPE_LIST_URL = BASE_URL + '/au-menu';

class RecipeListParser {
  async getDomFromUrl(url) {
    url = url || DEFAULT_RECIPE_LIST_URL;

    const html = await axios.get(url);
    const dom = cheerio.load(html.data);

    return dom;
  }

  getRecipes(dom) {
    const urls = new Set();
    const recipes = [];

    dom('.recipe-list.js-week').find('.product-list a.product__title').each((i, e) => {
      const url = `${BASE_URL}${dom(e).attr('href')}`;
      const title = dom(e).text().trim();
      const slug = getRecipeSlug(title);

      // Avoid duplicate URLs
      if (!urls.has(url)) {
        recipes.push({ url, title, slug });
        urls.add(url);
      }
    });

    return recipes;
  }

  async getRecipesFromUrl(url = null) {
    const dom = await this.getDomFromUrl(url);

    return this.getRecipes(dom);
  }
}

export default RecipeListParser;
