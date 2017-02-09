'use strict';

const models = require('../../models');
module.exports = {
  query,
  create,
  get,
  update,
  remove
};

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

function create (req, res, next) {
  models.User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
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
}

function get (req, res, next) {
  const id = req.swagger.params.id.value;
  models.User.findOne({
    id: id
  }).then((user, err) => {
    if (!!err){
      console.log('User Controller Error:', err);
      res.status(500).json({
        message: err
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

function update (req, res, next) {
  const id = req.swagger.params.id.value;

  models.User.findOne({
    id: id
  }).then((user, err) => {
    if (!!err) {
      console.log('User Controller Error:', err);
      res.status(500).json({
        message: err
      }).send();
    } else {
      if (!user) {
        res.status(404).send();
      } else{
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

function remove (req, res,  next) {
  const id = req.swagger.params.id.value;
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