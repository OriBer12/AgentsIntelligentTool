const graphql = require('graphql');
User = require('mongoose').model('User');
const { GraphQLObjectType, GraphQLString, GraphQLList,
       GraphQLID, GraphQLInt, GraphQLSchema, GraphQLNonNull } = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID  },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        salt:  { type: GraphQLString },
        hashPass:  { type: GraphQLString },
        roles: {type:new GraphQLList(GraphQLString)}

    })
});

const fields =  {
    users: {
      type: new GraphQLList(UserType),
      args: {},
      resolve(parent, args) {
        return User.find({});
      }
    },
    user: {
      type: (UserType),
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return User.findById(args.id);
      }
    }
};
const mutations =
{
    addUser: {
        type: (UserType),
        args: {
            //GraphQLNonNull make these field required
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {

            let user = new User({
                email: args.email,
                password: args.password
            });
            return user.save();
        }
    }
};
module.exports = {
  type: UserType,
  fields: fields,
  mutations: mutations
}
