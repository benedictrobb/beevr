const fs = require('fs');

const buildDatabase = () => {
    const connection = require('./db_connection.js');
    const dbSchema = fs
        .readFileSync('./server/database/db_build.sql', 'utf-8')
        .toString();

    connection.query(dbSchema, (err, res) => {
        if (err) {
            console.log(err);
            throw new Error('Cannot create database');
        } else {
            console.log('Database created with result: ', res);
        }
    });
};

buildDatabase();

module.exports = buildDatabase;
