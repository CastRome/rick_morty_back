const axios = require("axios");
const Character = require("../src/models/character");
const sequelize = require("../src/db");

async function fetchAllCharacters() {
  await sequelize.sync();

  let page = 1;
  let allCharacters = [];

  while (true) {
    const res = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const characters = res.data.results;

    allCharacters = allCharacters.concat(characters);

    if (!res.data.info.next) break;
    page++;
  }

  for (const c of allCharacters) {
    await Character.findOrCreate({
      where: { name: c.name },
      defaults: {
        status: c.status,
        species: c.species,
        gender: c.gender,
        origin: c.origin.name,
        image: c.image,
      },
    });
  }

  console.log(`✅ ${allCharacters.length} personajes importados`);
}

fetchAllCharacters();
