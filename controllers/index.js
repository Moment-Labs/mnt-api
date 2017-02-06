const express = require('express');
const router = express.Router();

//Controllers on Routes
router.use('/users', require('./users'));

// Index
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;