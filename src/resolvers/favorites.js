const { Favorite } = require("../models");

module.exports = {
  Query: {
    favorites: async (_, { userId }) => {
      return await Favorite.findAll({ where: { userId } });
    },
  },
  Mutation: {
    addFavorite: async (_, { characterId, userId }) => {
      const [fav, created] = await Favorite.findOrCreate({
        where: { characterId, userId },
      });
      return fav;
    },
    removeFavorite: async (_, { characterId, userId }) => {
      const deleted = await Favorite.destroy({
        where: { characterId, userId },
      });
      return deleted > 0;
    },
  },
};
