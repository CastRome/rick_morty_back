const Character = require("./character");
const Favorite = require("./favorite");
const Comment = require("./comment");

// Relación opcional: Un personaje tiene muchos favoritos y comentarios
Character.hasMany(Favorite, { foreignKey: "characterId", onDelete: "CASCADE" });
Favorite.belongsTo(Character, { foreignKey: "characterId" });

Character.hasMany(Comment, { foreignKey: "characterId", onDelete: "CASCADE" });
Comment.belongsTo(Character, { foreignKey: "characterId" });

module.exports = {
  Character,
  Favorite,
  Comment,
};
