const graphql = require('graphql');
const Book = require('./BookSchema');
const User = require('./UserSchema');
const { GraphQLObjectType, GraphQLString, GraphQLList,
       GraphQLID, GraphQLInt, GraphQLSchema } = graphql;

schems = [User];
fields = {};
mutations = {};

schems.forEach((s) => {
  Object.assign(fields,s.fields);
  Object.assign(mutations,s.mutations);
});

console.log(JSON.stringify(mutations));
console.log(JSON.stringify(fields));
//Schema defines data on the Graph like object types(book type), relation between
//these object types and descibes how it can reach into the graph to interact with
//the data to retrieve or mutate the data



//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book
//or get a particular author.

RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: fields
});

Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
});
//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutations
});
