import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.quitoque.fr/recettes/enchiladas-au-boeuf-et-au-parmesan/2020-21';

axios.get(url)
  .then((html) => {
    const $ = cheerio.load(html.data);
    const title = $('h1.recipe__title').text();
    console.log(title);
  })
  .catch(function (err) {
    console.log(err);
    //handle error
  });
