import axios from 'axios';
import RecipeParser from './src/adapter/quitoque/RecipeParser.js';

const url = 'https://www.quitoque.fr/recettes/enchiladas-au-boeuf-et-au-parmesan/2020-21';

axios.get(url)
  .then((html) => {
    const parser = new RecipeParser(html.data)
    const data = parser.getData();
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
    //handle error
  });
