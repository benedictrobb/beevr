const fs = require('fs');

const buildDatabase = () => {
  const connection = require('./db_connection.js');
  const sql = fs.readFileSync('./database/db_build.sql', 'utf-8');


  connection.query(sql, (err, result) => {
    if (err) {
      throw new Error('Cannot create database');
    } else {
      console.log('Database created');
    }
  });
};

buildDatabase();

module.exports = buildDatabase;
