'use strict';

const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const path = require('path');
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
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
