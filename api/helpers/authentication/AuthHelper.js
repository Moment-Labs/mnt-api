'use strict';

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const config = require('../../../config/config.json');

module.exports = {
  comparePassword: comparePassword,
  generateToken: generateToken,
  authenticateToken: authenticateToken,
  ensureRights: ensureRights,
  ensureAdmin: ensureAdmin
};

//Compares the password of a user with the password provided
function comparePassword (user, password, cb) {
  if (!user) {
    throw "No User Provided";
  }
  const success = user.authenticate(password);
  cb(success);
};

function generateToken (user) {
  if (!user) {
    throw "No User Provided";
  }
   return jwt.sign({
     data: user
   }, config.secret, {
     expiresIn: '24hr'
  });
}

function authenticateToken (token, cb) {
  jwt.verify(token, config.secret, cb)
}

//Ensure that user generated from the token has the rights to perform this action (IFF user involved is user initiating call)
function ensureRights (userData, target, key) {
  console.log(userData[key], target[key])
  return userData[key] === target[key];
}

function ensureAdmin (userData) {
  return userData.id === 1; //TODO; Use roles here
}