import slugify from 'slugify';

const getRecipeSlug = (title) => slugify(title, { lower: true });

export default getRecipeSlug;
