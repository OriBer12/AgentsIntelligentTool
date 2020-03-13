var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.post('/api/register', auth.optional, controllers.users.createUser);
    app.post('/api/login', auth.optional ,auth.login);
    //app.get('/api/logout', auth.required ,auth.logout);
    //app.get('/api/login', controllers.users.getLogin);

    /**app.get('/api/', function (req, res) {
        res.render('index', {currentUser: req.user});
    });

    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });*/
};
