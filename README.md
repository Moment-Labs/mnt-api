# API Project

### Prerequisites
1. Install NodeJS and NVM (https://nodejs.org/en/, https://github.com/creationix/nvm)
2. Make sure you are on Node version 7.0.0 or higher (`node -v`)
3. Install Postgres and create a database for the application: https://www.postgresql.org/  
You can use PGAdmin4 to create the database instead of using the provided psql CLI (https://www.pgadmin.org/).

### Installation
1. Install Swagger `npm install -g swagger`
2. Install dependencies `npm install`
3. `npm install --save pg pg-hstore`
4. Copy the database config (db-default.json) to a new file (db.json) and enter your database information.  
`cp config/db-default.json config/db.json`
5. Run the latest migrations `node_modules/.bin/sequelize db:migrate`

### Running
1. Run `swagger project start` to run the server.
2. To edit swagger docs, run `swagger project edit`  

The urls to the deployment urls are provided when the above commands are run.

### Application Documentation
The index route provides the API Documentation: 
http://127.0.0.1:10010/#!/default

### Useful Docs
Editing Swagger Docs: https://scotch.io/tutorials/speed-up-your-restful-api-development-in-node-js-with-swagger
Sequelize: http://docs.sequelizejs.com/en/1.7.0/articles/getting-started/
Sequelize with NodeJS and Express: http://mherman.org/blog/2015/10/22/node-postgres-sequelize/