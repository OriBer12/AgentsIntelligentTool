var encryption = require('../utilities/cripto'),
    usersData = require('../data/usersData');
    User = require('mongoose').model('User');

module.exports = {
    createUser: function (req, res, next) {
      console.log('createUser');
      const { body: { user } } = req;

      if(!user.email) {
        return res.status(422).json({
          errors: {
            email: 'is required',
          },
        });
      }

      if(!user.password) {
        return res.status(422).json({
          errors: {
            password: 'is required',
          },
        });
      }

      const finalUser = new User(user);
      
      finalUser.setPassword(user.password);
      console.log('before save');
      return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }))
        .catch(() => res.status(422).json({error: 'user already exists'}));
    }
  };
