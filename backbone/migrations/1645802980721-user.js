'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

module.exports.up = function (next) {
  console.log('Migration started...');
  const connectString = `mongodb://${process.env.DB_URI ? process.env.DB_URI : '127.0.0.1'}:${process.env.DB_PORT ? process.env.DB_PORT : 27017}/${process.env.DB_NAME ? process.env.DB_NAME : 'car_insurance_db'}`;
  console.log('Connection string... ', connectString);
  mongoose
    .connect(connectString)
    .then(() => {
      console.log('Try user insert.');
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync('Ninja', salt);
      return mongoose.connection.db.collection('users').insertOne({
        username: 'Qover',
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    })
    .then(() => {
      console.log('User inserted.');
      console.log('Try cars inserts.');
      return mongoose.connection.db.collection('cars').insertMany([
        {
          manufacturer: 'PORSCHE',
          ageLimit: 25,
          highRisk: true,
          globalPrice: 500,
          universalPercentage: 0.07,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          manufacturer: 'BMW',
          ageLimit: 18,
          highRisk: false,
          globalPrice: 150,
          universalPercentage: 0.04,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          manufacturer: 'AUDI',
          ageLimit: 18,
          highRisk: false,
          globalPrice: 250,
          universalPercentage: 0.03,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    })
    .then(() => {
      console.log('Cars inserted.');
      return mongoose.disconnect();
    })
    .then(() => {
      next();
    })
    .catch((e) => {
      console.log(`Failed to connect on MongoDB ${e}`);
    });
};

module.exports.down = function (next) {
  next();
};
