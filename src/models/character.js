const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Character = sequelize.define("Character", {
  name: DataTypes.STRING,
  status: DataTypes.STRING,
  species: DataTypes.STRING,
  gender: DataTypes.STRING,
  origin: DataTypes.STRING,
  image: DataTypes.STRING,
});

module.exports = Character;
