'use strict';

const db = require('../../config/db.js')();
module.exports = {
  query,
  create,
  get,
  update,
  remove
};

function query (req, res, next) {
  res.json({ users: db.find() })
}

function create (req, res, next) {
  const success = db.save(req.body);
  res.json({
    success: success,
    description: "Added user successfully"
  })
}

function get (req, res, next) {
  const id = req.swagger.params.id.value;
  const user = db.find(id);
  if (user) {
    res.json(user)
  } else {
    res.status(404).send();
  }
}

function update (req, res, next) {
  const id = req.swagger.params.id.value;
  const user = req.body;
  const success = db.update(id, user);
  if (success) {
    res.json({
      success: success,
      description: "User updated"
    })
  } else {
    res.status(204).send();
  }
}

function remove (req, res,  next) {
  const id = req.swagger.params.id.value;
  const success = db.remove(id);
  if (success) {
    res.json({
      success: success,
      description: "User deleted"
    })
  } else {
    res.status(204).send();
  }
}