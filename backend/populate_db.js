'use strict';

let sequelize_fixtures = require('sequelize-fixtures'),
  models = require('./models');

//can use glob syntax to select multiple files
sequelize_fixtures.loadFile('fixtures/*.js*', models).then(function(){
  console.log('fixtures loaded');
});
