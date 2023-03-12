const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const port = process.env.PORT || 3001;
//  sync sequelize models to the database, then turn on the server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server

sequelize.sycn({ force: false }).then(() => {
  app.listen(port, () => console.log('Now listening'));
});




