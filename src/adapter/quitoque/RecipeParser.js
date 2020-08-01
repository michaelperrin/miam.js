import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

class RecipeParser {
  async getDataFromUrl(url) {
    const html = await axios.get(url);
    const dom = cheerio.load(html.data);

    return this.getData(dom);
  }

  getDataFromFile(file) {
    const html = fs.readFileSync(file, 'utf8');
    const dom = cheerio.load(html);

    return this.getData(dom);
  }

  getData(dom) {
    return {
      title: this.getTitle(dom),
      ingredients: this.getIngredients(dom),
    };
  }

  getTitle(dom) {
    return dom('h1.recipe__title')
      .text()
      .trim();
  }

  getIngredients(dom) {
    const ingredients = [];

    const articles = dom('.recipe__articles .article');

    articles.each((i, article) => {
      const articleDom = dom(article);

      ingredients.push({
        number: articleDom.find('.article__label .text-primary').text().trim(),
        name: this.getTextForNode(
          dom,
          articleDom.find('.article__label')
        ),
        quantity: articleDom.find('.article__quantity').text().trim().replace(/^\(/, '').replace(/\)$/, ''),
      });
    });

    return ingredients;
  }

  getTextForNode(dom, nodeWithText) {
    const textNodes = dom(nodeWithText).contents().filter((i, node) => {
      return node.nodeType === 3 && dom(node).text().trim() != '';
    });


    if (textNodes.length === 0) {
      return null;
    };

    return dom(textNodes[0]).text().trim();
  }
}

export default RecipeParser;
