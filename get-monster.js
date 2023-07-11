const fetch = require('isomorphic-fetch');
const fs = require('fs');

async function writeJSONToFile(url, filename) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filename, jsonData);
    console.log(`JSON data successfully written to ${filename}.`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Usage
const url = 'https://api.open5e.com/v1/monsters/aboleth/';
const filename = 'open5e-asset.json';

writeJSONToFile(url, filename);


