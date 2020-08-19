import fs from 'fs';
import getRecipePath from './getRecipePath.js';

/**
 * Tells whether recipe is already saved
 *
 * @param {string} basePath
 * @param {string} slug
 */
const recipeExists = (basePath, slug) => {
  return fs.existsSync(getRecipePath(basePath, slug));
};

export default recipeExists;
