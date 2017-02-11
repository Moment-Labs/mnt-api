'use strict';

//Libraries
const bcrypt = require('bcrypt');

const models = require('../../models');
const AuthHelper = require('../helpers/authentication/AuthHelper');

module.exports = {
  query,
  create,
  get,
  update,
  remove
};

// GET /users
function query (req, res, next) {
  models.User.findAll({}).then((users, err) => {
    if (!!err) {
      console.log('User Controller Error:', err);
      res.status(500).json({
        message: err
      }).send();
    } else {
      res.json(users)
    }
  });
}

// POST /users
function create (req, res, next) {

  const userPassword = req.body.password;
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (!!err) {
      console.log('User Controller Error:', err);
      res.status(500).json({
        message: err
      }).send();
    }
    bcrypt.hash(userPassword, salt, function(err, hash) {
      if (!!err) {
        console.log('User Controller Error:', err);
        res.status(500).json({
          message: err
        }).send();
      }

      models.User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
        salt: salt
      }).then((user, err) => {
        if (!!err) {
          console.log('User Controller Error:', err);
          res.status(500).json({
            message: err
          }).send();
        } else {
          res.json({
            success: 1,
            description: "User generated successfully"
          })
        }
      });
    });
  });
}

// GET /users/:id
function get (req, res, next) {
  const token = req.swagger.params.auth_token.value;
  const id = req.swagger.params.id.value;
  models.User.findOne({
    where: {
      id: id
    }
  }).then((user, err) => {
    if (!!err){
      console.log('User Controller Error:', err);
      res.status(500).json({
        message: err
      }).send();
    } else {

      AuthHelper.authenticateToken(token, (err, result) => {
        if (!!err) {
          res.status(500).json({
            message: 'Bad Token'
          }).send();
        } else {
          res.json({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          });
        }
      });
    }
  });
}

// PUT /users/:id
function update (req, res, next) {
  const token = req.swagger.params.auth_token.value;
  const id = req.swagger.params.id.value;

  models.User.findOne({
    where: {
      id: id
    }
  }).then((user, err) => {
    if (!!err) {
      console.log('User Controller Error:', err);
      res.status(500).json({
        message: err
      }).send();
    } else {
      console.log(user)
      if (!user) {
        res.status(404).send();
      } else{

        AuthHelper.authenticateToken(token, (err, result) => {
          if (!!err) {
            res.status(500).json({
              message: 'Bad Token'
            }).send();
          } else {

            const ensureRights = AuthHelper.ensureRights(result.data, user, 'id');
            if (!ensureRights) {
              res.status(403).json({
                message: 'Not Authorized'
              }).send();
            } else {
              let updateAttrs = {};
              for (const key in req.body) {
                updateAttrs[key] = req.body[key];
              };

              user.updateAttributes(updateAttrs)
                .then((user, err) => {
                  if (!!err) {
                    console.log('User Controller Error:', err);
                    res.status(500).json({
                      message: err
                    }).send();
                  } else {
                    res.json({
                      success: 1,
                      description: "User updated"
                    })
                  }
                })
            }

          }
        });

      }
    }
  });
}

// DELETE /users/:id
function remove (req, res,  next) {
  const id = req.swagger.params.id.value;
  const token = req.swagger.params.auth_token.value;

  models.User.findOne({
    where: {
      id: id
    }
  }).then((user, err) => {
    if (!!err) {
      console.log('User Controller Error:', err);
      res.status(500).json({
        message: err
      }).send();
    } else {

      AuthHelper.authenticateToken(token, (err, result) => {
        if (!!err) {
          res.status(500).json({
            message: 'Bad Token'
          }).send();
        } else {

          const ensureRights = AuthHelper.ensureAdmin(result.data);
          if (!ensureRights) {
            res.status(403).json({
              message: 'Not Authorized'
            }).send();
          } else {
            models.User.destroy({
              where: {
                id: id
              }
            }).then((user, err) => {
              if (!!err) {
                res.status(204).send();
              } else {
                res.json({
                  success: 1,
                  description: "User deleted"
                })
              }
            });
          }

        }
      });
    }

  });


}