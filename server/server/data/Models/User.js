var mongoose = require('mongoose'),
    encryption = require('../../utilities/cripto');
    crypto = require('crypto');
    jwt = require('jsonwebtoken');

module.exports.init = function () {
  var userSchema = new mongoose.Schema({
      username : String,
      email: { type: String, require: '{PATH} is required', unique: true },
      salt: String,
      hashPass: String,
      roles: [String]
  });

  userSchema.method({
      authenticate: function(password) {
          if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
              return true;
          }
          else {
              return false;
          }
      },
      setPassword: function(password){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
      },
      validatePassword: function(password) {
        const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash === hash;
      },
      generateJWT: function() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
          email: this.email,
          id: this._id,
          exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');
      },
      toAuthJSON: function() {
        return {
          _id: this._id,
          email: this.email,
          token: this.generateJWT(),
        }
      }
    });

  var db = mongoose.model('User', userSchema);
};
