import fs from 'fs';

const saveToFilesystem = (basePath, data) => {
  const fileContent = JSON.stringify(data, null, 2);
  const recipePath = `${basePath}/${data.slug}`;

  fs.mkdir(recipePath, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }

    fs.writeFile(`${recipePath}/recipe.json`, fileContent, (err) => {
      if (err) {
        throw err;
      }

      console.log(`✅ Successfully saved recipe "${data.title}"`);
    });
  });
};

export default saveToFilesystem;
