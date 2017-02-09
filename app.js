'use strict';

const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const path = require('path');
const models = require('./models');

module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

app.use(express.static(path.join(__dirname, 'public')));

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err){
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;

  models.sequelize.sync().then(() => {
    listen(port, swaggerExpress)
  });
});


function listen (port, swaggerExpress) {
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('Listening on http://127.0.0.1:' + port);
  }
}