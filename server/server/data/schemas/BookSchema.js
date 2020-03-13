const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList,
       GraphQLID, GraphQLInt, GraphQLSchema } = graphql;


var fakeBookDatabase = [
   { name:"Book 1", pages:432 , id:1},
   { name: "Book 2", pages: 32, id: 2},
   { name: "Book 3", pages: 532, id: 3 }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString },
        pages: { type: GraphQLInt }
    })
});

const fields =  {
  books: {
          type: new GraphQLList(BookType),
          args: {},
          resolve(parent, args) {
              //Here we define how to get data from database source

              //this will return the book with id passed in argument by the user
              return fakeBookDatabase;
          }
        },
  book: {
          type: BookType,
          args: { id: { type: GraphQLID } },
          resolve(parent, args) {
              //Here we define how to get data from database source

              //this will return the book with id passed in argument by the user
               return fakeBookDatabase.find((item) => { return item.id == args.id});
          }
        }
  };

module.exports = {
  db: fakeBookDatabase,
  type: BookType,
  fields: fields
}
