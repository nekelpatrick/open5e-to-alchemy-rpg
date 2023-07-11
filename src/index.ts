import fetch from "isomorphic-fetch";
import fs from "fs/promises";
import { convertToAlchemy } from "./converter";

const output = "src/alchemy/generated-asset.json";
const baseUrl = "https://api.open5e.com/v1/monsters/";

async function fetchAllMonsters(baseUrl: string) {
  let monsters = [];
  let url = `${baseUrl}?limit=2`;
  let pageNumber = 1;

  while (url && monsters.length < 2) {
    console.log(`Fetching page ${pageNumber}...`);
    const response = await fetch(url);
    const data = await response.json();
    monsters = monsters.concat(data.results);
    url = data.next;
    pageNumber++;
  }

  return monsters;
}

fetchAllMonsters(baseUrl)
  .then(async (monsters) => {
    console.log(`Converting ${monsters.length} monsters to Alchemy format...`);
    const alchemyMonsters = await Promise.all(
      monsters.map((monster, index) => {
        console.log(`Converting monster ${index + 1} of ${monsters.length}`);
        return convertToAlchemy(monster);
      })
    );

    // Wrap alchemyMonsters in an object with a "characters" property
    const outputData = { characters: alchemyMonsters };

    return fs.writeFile(output, JSON.stringify(outputData, null, 2));
  })
  .then(() =>
    console.log(`Alchemy JSON data successfully written to ${output}.`)
  )
  .catch((error) => console.error("An error occurred:", error));
