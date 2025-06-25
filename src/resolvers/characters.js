const Character = require("../models/character");
const Redis = require("ioredis");
const redis = new Redis();
const { Op } = require("sequelize");

function buildCacheKey(args) {
  const { page, limit, ...filters } = args;
  return `characters:${JSON.stringify(filters)}:page=${page || 1}:limit=${
    limit || 10
  }`;
}

function buildWhereClause(filters) {
  const where = {};
  for (const [key, value] of Object.entries(filters)) {
    if (!value || typeof value !== "string") continue;
    if (["name", "status", "gender", "origin"].includes(key)) {
      where[key] = { [Op.iLike]: `%${value.trim()}%` };
    } else if (key === "species") {
      where[key] = { [Op.iLike]: value.trim() };
    }
  }
  return where;
}

module.exports = {
  Query: {
    characters: async (_, args) => {
      const page = Number(args.page) || 1;
      const limit = Number(args.limit) || 10;
      const offset = (page - 1) * limit;

      const { sort, ...rest } = args;
      const filters = { ...rest };

      const cacheKey = buildCacheKey(args);
      const cached = await redis.get(cacheKey);
      if (cached) {
        console.log("🔁 Cache hit");
        return JSON.parse(cached);
      }

      const where = buildWhereClause(filters);
      const order = [["name", sort === "DESC" ? "DESC" : "ASC"]];

      const results = await Character.findAll({
        where,
        offset,
        limit,
        order,
      });

      await redis.set(cacheKey, JSON.stringify(results), "EX", 60);
      return results;
    },
  },
};
