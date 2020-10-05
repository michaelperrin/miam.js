import fs from 'fs';
import http from 'https';

const downloadPicture = (url, filename, callback) => {
  const file = fs.createWriteStream(filename);

  file.on('error', (err) => { // Handle errors
    fs.unlink(filename); // Delete the file async
    console.error(`❌ ${err.message}`)
  });

  const request = http.get(url, (response) => {
    if (response.statusCode !== 200) {
      console.log('Response status was ' + response.statusCode);
      return;
    }

    file.on('finish', () => {
      file.close();
      console.log(`🍤 Successfully downloaded picture`);
      callback();
    });

    response.pipe(file);
  });
}

export default downloadPicture;
