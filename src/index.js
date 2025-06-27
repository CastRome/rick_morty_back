const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const logger = require("./middleware/logger");
const sequelize = require("./db");
const Redis = require("ioredis");
const cron = require("node-cron");
const fetchCharacters = require("../seed/fetchCharacters");
const charactersRouter = require("./routes/characters");

async function startServer() {
  const app = express();

  // Middleware global
  app.use(logger);

  // REST routes
  app.use("/api/characters", charactersRouter);

  // Redis instance for caching
  const redis = new Redis();

  // Apollo Server (GraphQL)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ redis }),
  });

  await server.start();
  server.applyMiddleware({ app });

  // Database connection and sync
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected successfully");
    await sequelize.sync();
  } catch (error) {
    console.error("❌ Error connecting or syncing the DB:", error);
    process.exit(1);
  }

  // Cron job: update characters every 12 hours
  cron.schedule("0 */12 * * *", async () => {
    console.log("🕒 Cron job running: updating characters...");
    try {
      await fetchCharacters();
      console.log("✅ Characters updated.");
    } catch (error) {
      console.error("❌ Error updating characters:", error);
    }
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
