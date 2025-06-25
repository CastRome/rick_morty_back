const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Comment = sequelize.define("Comment", {
  characterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Comment;
