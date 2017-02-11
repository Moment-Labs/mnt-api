'use strict';

//Libraries
const bcrypt = require('bcrypt');

const models = require('../../models');
const AuthHelper = require('../helpers/authentication/AuthHelper');
module.exports = {
  login: login
};

//POST /auth
function login (req, res, next) {
  models.User.findOne({
    email: req.body.email
  }).then((user, err) => {
    if (!user || !!err) {
      res.status(400).json({
        message: 'Authentication Error, please try again.'
      });
    } else {
      AuthHelper.comparePassword(user, req.body.password, (success) => {
        if (!success) {
          res.status(400).json({
            message: 'Authentication Error, please try again.'
          });
        } else {
          const token = AuthHelper.generateToken(user);
          res.json({
            token: AuthHelper.generateToken(user)
          });
        }
      })
    }
  });
}