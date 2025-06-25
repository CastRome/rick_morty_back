const charactersResolver = require("./characters");
const favoritesResolver = require("./favorites");
const commentsResolver = require("./comments");
const wrapResolvers = require("../middleware/wrapResolvers");

module.exports = {
  Query: {
    ...wrapResolvers({
      ...charactersResolver.Query,
      ...favoritesResolver.Query,
      ...commentsResolver.Query,
    }),
  },
  Mutation: {
    ...wrapResolvers({
      ...favoritesResolver.Mutation,
      ...commentsResolver.Mutation,
    }),
  },
};
