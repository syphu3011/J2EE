const { GraphQLDateTime } = require("graphql");
const {gql} = require('apollo-server-express')
const phu = require('./index.phu')
const thao = require('./index.thao')

const rootType = gql`
 type Query {
     root: String
 }
 type Mutation {
     root: String
 }
`;
module.exports = [rootType,...phu, ...thao];