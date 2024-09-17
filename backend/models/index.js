// models/index.js

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models here
db.User = require('./user')(sequelize, DataTypes);
db.Order = require('./order')(sequelize, DataTypes);

module.exports = db;
