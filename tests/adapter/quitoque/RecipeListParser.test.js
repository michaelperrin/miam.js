import fs from 'fs';
import cheerio from 'cheerio';
import RecipeListParser from '../../../src/adapter/quitoque/RecipeListParser';

describe('Recipe list parser', () => {
  const parser = new RecipeListParser();

  it('extracts the list of recipes without duplicates', async () => {
    const html = fs.readFileSync(__dirname + '/list.html', 'utf8');
    const dom = cheerio.load(html);
    const recipesList = await parser.getRecipes(dom);

    const expectedList = [
      {
        url: 'https://www.quitoque.fr/bla1',
        title: 'bla 1',
        slug: 'bla-1'
      },
      {
        url: 'https://www.quitoque.fr/bla2',
        title: 'bla 2',
        slug: 'bla-2'
      },
      {
        url: 'https://www.quitoque.fr/bla3',
        title: 'bla 3',
        slug: 'bla-3'
      },
      {
        url: 'https://www.quitoque.fr/bla5',
        title: 'bla 5',
        slug: 'bla-5'
      }
    ];

    expect(recipesList).toEqual(expectedList);
  });
});
