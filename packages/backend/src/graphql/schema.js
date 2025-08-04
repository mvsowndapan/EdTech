const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum Level {
    beginner
    intermediate
    advanced
  }

  enum Role {
    student
    professor
  }

  type Course {
    id: ID!
    title: String!
    description: String!
    level: Level!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Enrollment {
    id: ID!
    user: User!
    course: Course!
    role: Role!
  }

  type Query {
    courses: [Course!]!
    course(id: ID!): Course
  }

  type Mutation {
    enrollUser(userId: ID!, courseId: ID!, role: Role!): Enrollment!
  }
`;

module.exports = typeDefs;
