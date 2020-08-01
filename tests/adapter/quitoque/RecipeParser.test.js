// import RecipeParser from '../../../src/adapter/quitoque/RecipeParser';
import RecipeParser from '../../../src/adapter/quitoque/RecipeParser.js';
import axios from 'axios';
import fs from 'fs';

// const { default: RecipeParser } = require("../../../src/adapter/quitoque/RecipeParser");

describe('Recipe parser', () => {
  const parser = new RecipeParser();
  let recipeData = parser.getDataFromFile(__dirname + '/recipe.html');;

  it('extracts the title', async () => {
    expect(recipeData.title).toBe('Courgettes à la béchamel et au jambon');
  });

  it('extracts ingredients', async () => {
    const expectedIngredients = [
      {
        name: "Courgette",
        number: "2 x",
        quantity: "400g"
      },
      {
        name: "Gousse d'ail",
        number: "0.5 x",
        quantity: "4g"
      },
      {
        name: "Jambon de paris",
        number: "2 x",
        quantity: "110g"
      },
      {
        name: "Lait demi-écrémé",
        number: "",
        quantity: "300 mL"
      },
      {
        name: "Parmesan râpé au lait cru",
        number: "",
        quantity: "30 g"
      },
      {
        name: "Roquette",
        number: "",
        quantity: "50 g"
      },
      {
        name: "Tomate",
        number: "2 x",
        quantity: "184g"
      }
    ];

    expect(recipeData.ingredients).toEqual(expectedIngredients);
  });

  it('extracts cooking steps', async () => {
    const steps = [
      {
        title: "Avant de commencer",
        description: "Préchauffez votre four à 220°C.\nDeuxième ligne.",
      },
      {
        title: "Les courgettes",
        description: "Coupez les extrémités des courgettes.",
      },
      {
        title: "La béchamel",
        description: "Astuce : Réalisez votre béchamel",
      },
      {
        title: "Le gratin de courgettes au jambon",
        description: "Une fois les courgettes cuites, sortez-les du four et passez le four sur grill (250°C).",
      },
      {
        title: "La salade",
        description: "Coupez les tomates en dés.",
      },
      {
        title: null,
        description: "Dégustez sans attendre !",
      },
    ];

    expect(recipeData.steps).toEqual(steps);
  });
});
