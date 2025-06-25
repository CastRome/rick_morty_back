const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Favorite = sequelize.define("Favorite", {
  characterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING, // Por ahora simple, puedes usar UUID o email
    allowNull: false,
  },
});

module.exports = Favorite;
