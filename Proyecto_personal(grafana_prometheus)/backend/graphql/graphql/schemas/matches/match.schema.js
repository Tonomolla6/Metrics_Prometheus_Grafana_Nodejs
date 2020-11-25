import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        match(slug: String!): Match
        matches(username: String): [Match]
        matchesResults(slug: String!): [Match]
    }
    extend type Mutation {
        createMatch(input: MatchInput): Match
        getMatches(input: UserInput): Match
    }
    type Match {
        id: ID!
        slug: String!
        result: Boolean
        author: User
    }
    input MatchInput {
        result: Boolean
    },
    input UserInput {
        username: String
    }
`;

export default typeDefs;