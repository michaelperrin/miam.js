import axios from 'axios';
import cheerio from 'cheerio';

const BASE_URL = 'https://www.quitoque.fr';
const RECIPE_LIST_URL = BASE_URL + '/au-menu';

class RecipeListParser {
  async getDom() {
    const html = await axios.get(RECIPE_LIST_URL);
    const dom = cheerio.load(html.data);

    return dom;
  }

  async getUrls() {
    const dom = await this.getDom();
    const urls = new Set(); // Use of a Set to avoid duplicates

    dom('.recipe-list.js-week').eq(0).find('.product-list a.product__title').each((i, e) => {
      const url = `${BASE_URL}${dom(e).attr('href')}`;
      urls.add(url);
    });

    return Array.from(urls);
  }
}

export default RecipeListParser;
