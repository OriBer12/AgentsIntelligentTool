var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var auth = require('./auth');
const schema = require('../data/schemas/schema');
// GraphQL schema
// GraphQL schema

console.log('GraphQL')
var client = require('graphql-client')({
  url: 'https://api.monday.com/v2/',
  headers: {
    Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM2ODYwMTE0LCJ1aWQiOjEyNDgwMDY3LCJpYWQiOiIyMDIwLTAyLTA2IDA3OjEwOjQzIFVUQyIsInBlciI6Im1lOndyaXRlIn0.tg5ePY7zO-zhhsoHpq6vganw436bSb2g37WwNjGLGpE'
  }
});

var variables = {};

client.query(`
  query {
  boards {

  id
  name
  items{
    column_values {
    id
    text
    value
    }
  }

  }
  }`, variables, function(req, res) {
  if(res.status === 401) {
    throw new Error('Not authorized')
  }
})
.then(function(body) {
  console.log(JSON.stringify(body));
})
.catch(function(err) {
  console.log(err.message)
})
module.exports = function(app) {
  app.use('/graphql' ,express_graphql({
    schema: schema,
    graphiql: true
}));
}
