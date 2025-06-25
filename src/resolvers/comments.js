const { Comment } = require("../models");

module.exports = {
  Query: {
    comments: async (_, { characterId }) => {
      return await Comment.findAll({
        where: { characterId },
        order: [["id", "ASC"]],
      });
    },
  },
  Mutation: {
    addComment: async (_, { characterId, userId, text }) => {
      return await Comment.create({ characterId, userId, text });
    },
    removeComment: async (_, { commentId, userId }) => {
      const deleted = await Comment.destroy({
        where: { id: commentId, userId },
      });
      return deleted > 0;
    },
  },
};
