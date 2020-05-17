import cheerio from 'cheerio';

class RecipeParser {
  constructor(html) {
    this.dom = cheerio.load(html);
  }

  getData() {
    return {
      title: this.getTitle(),
    };
  }

  getTitle() {
    return this
      .dom('h1.recipe__title')
      .text()
      .trim();
  }
}

export default RecipeParser;
