const { gql } = require("apollo-server-express");

module.exports = gql`
  type Character {
    id: ID!
    name: String!
    status: String
    species: String
    gender: String
    origin: String
    image: String
    favoritesCount: Int
    comments: [Comment]
  }

  type Comment {
    id: ID!
    userId: String!
    text: String!
    characterId: Int!
  }

  type Query {
    characters(
      page: Int
      limit: Int
      name: String
      status: String
      species: String
      gender: String
      origin: String
      sort: String
    ): [Character]

    favorites(userId: String!): [Favorite]
    comments(characterId: Int!): [Comment]
  }

  type Favorite {
    id: ID!
    userId: String!
    characterId: Int!
  }

  type Mutation {
    addFavorite(characterId: Int!, userId: String!): Favorite
    removeFavorite(characterId: Int!, userId: String!): Boolean
    addComment(characterId: Int!, userId: String!, text: String!): Comment
    removeComment(commentId: ID!, userId: String!): Boolean
  }
`;
