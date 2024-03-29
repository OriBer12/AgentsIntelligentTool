var express = require('express');
var cors = require('cors');
var env = process.env.NODE_ENV || 'development';

var app = express();
app.use(cors());

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app);
require('./server/config/graphql')(app);

app.listen(config.port);
console.log("Server running on port: " + config.port);
