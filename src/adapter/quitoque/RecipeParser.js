import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import slugify from 'slugify';

class RecipeParser {
  async getDataFromUrl(url) {
    const html = await axios.get(url);
    const dom = cheerio.load(html.data);

    return {
      url,
      ...this.getData(dom),
    };
  }

  getDataFromFile(file) {
    const html = fs.readFileSync(file, 'utf8');
    const dom = cheerio.load(html);

    return this.getData(dom);
  }

  getData(dom) {
    const title = this.getTitle(dom);

    return {
      slug: slugify(title, { lower: true }),
      title,
      ingredients: this.getIngredients(dom),
      steps: this.getSteps(dom),
      pictures: this.getPictures(dom),
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

      const name = this.getTextForNode(
        dom,
        articleDom.find('.article__label')
      );
      const quantity = articleDom.find('.article__quantity').text().trim().replace(/^\(/, '').replace(/\)$/, '');
      const number = articleDom.find('.article__label .text-primary').text().trim();

      const ingredient = { name };

      if (quantity !== '') {
        ingredient.quantity = quantity;
      }

      if (number !== '') {
        ingredient.number = number;
      }

      ingredients.push(ingredient);
    });

    return ingredients;
  }

  getSteps(dom) {
    const steps = [];

    const instructions = dom('.recipe__instructions .recipe__instruction');

    instructions.each((i, instruction) => {
      const instructionDom = dom(instruction);

      let title = instructionDom.contents().slice(0).eq(0).text().trim()
      let description = dom.html(instructionDom.contents().slice(1))
        .replace('<br>', "\n")
        .trim()
        .replace('<br>', "\n");

      if (instructionDom.hasClass('last')) {
        // There is no title for last step
        description = title;
        title = null;
      }

      steps.push({ title, description });
    });

    return steps;
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

  getPictures(dom) {
    return [
      dom('.recipe .recipe__img img')
        .attr('src')
    ];
  }
}

export default RecipeParser;
