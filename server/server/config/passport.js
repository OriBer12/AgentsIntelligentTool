/**var passport = require('passport'),
    LocalPassport = require('passport-local'),
    User = require('mongoose').model('User');

module.exports = function(app) {
    app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

    passport.use(new LocalStrategy({
      usernameField: 'user[email]',
      passwordField: 'user[password]',
    }, (email, password, done) => {
      Users.findOne({ email })
        .then((user) => {
          if(!user || !user.validatePassword(password)) {
            return done(null, false, { errors: { 'email or password': 'is invalid' } });
          }

          return done(null, user);
        }).catch(done);
    }));
    passport.use(new LocalPassport(function(username, password, done) {
        User.findOne({ username: username }).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }

            if (user && user.authenticate(password)) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    }));

    passport.serializeUser(function(user, done) {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({_id: id}).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }

            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    });
};*/
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = mongoose.model('User');

module.exports = function(app) {
  passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'},
     (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if(!user || !user.validatePassword(password)) {
          return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }

        return done(null, user);
      }).catch(done);
  }));
};
