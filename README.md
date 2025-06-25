# Rick and Morty Character Search API

This project is a backend API built with **Express** and **GraphQL** that allows searching for characters from the Rick and Morty universe. It is designed to be robust, efficient, and easy to extend.

## Features

- **GraphQL API**: Search for Rick and Morty characters using flexible queries.
- **Filtering**: Filter characters by Status, Species, Gender, Name, and Origin.
- **Relational Database**: Uses Sequelize ORM to connect to a relational database (MySQL or PostgreSQL).
- **Database Initialization**: On setup, the database is seeded with 15 characters from the official Rick and Morty API.
- **Redis Caching**: Search results are cached in Redis for improved performance.
- **Request Logging Middleware**: Every request logs relevant information to the console.
- **Execution Time Decorator**: Query methods print their execution time to the console.
- **Scheduled Updates**: A cron job runs every 12 hours to update character data in the database.

## Requirements

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**
- **MySQL** or **PostgreSQL** database
- **Redis** server

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd rick_morty_back
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DB_HOST=localhost
DB_PORT=3306 # or 5432 for PostgreSQL
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=rick_morty
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 4. Run Database Migrations

```bash
npx sequelize-cli db:migrate
```

### 5. Seed the Database

This will fetch and insert 15 characters from the Rick and Morty API.

```bash
npx sequelize-cli db:seed:all
```

### 6. Start the Server

```bash
npm start
# or
yarn start
```

The API will be available at `http://localhost:3000/graphql`.

## Usage

You can use any GraphQL client (such as [Apollo Studio](https://studio.apollographql.com/) or [GraphQL Playground](https://github.com/graphql/graphql-playground)) to interact with the API.

### Example Query

```graphql
query {
  characters(
    filter: {
      status: "Alive"
      species: "Human"
      gender: "Male"
      name: "Rick"
      origin: "Earth"
    }
  ) {
    id
    name
    status
    species
    gender
    origin
  }
}
```

## Project Structure

- `/src`
  - `/models` - Sequelize models
  - `/migrations` - Database migrations
  - `/resolvers` - GraphQL resolvers
  - `/schemas` - GraphQL schemas
  - `/middlewares` - Custom middleware (logging, etc.)

## Additional Notes

- **Caching**: Redis is used to cache search results for faster response times.
- **Logging**: Middleware logs each request's details to the console.
- **Performance Monitoring**: Decorators print the execution time of each query.
- **Scheduled Updates**: The cron job ensures your character data stays up to date.

## License

MIT

---

Feel free to contribute or open issues if you find any bugs or have suggestions!
