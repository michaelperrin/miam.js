import fs from 'fs';
import downloadPicture from './downloadPicture.js';

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

    data.pictures.forEach((pictureData) => {
      downloadPicture(pictureData.url, `${recipePath}/${pictureData.name}`, () => { });
    });
  });
};

export default saveToFilesystem;
