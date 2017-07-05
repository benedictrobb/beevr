const dbConnection = require('./db_connection.js');

data = {};

data.getStudents = (term, callback) => {
  dbConnection.query(`SELECT * FROM jobs
                      WHERE CATEGORY = ${term}
                      AND end_date < NOW()
                      ORDER BY start_date;`,
   (err,res) => {
     if (err) {
       callback(err);
     }
     callback(null, res.rows);
   });
};


module.exports = data;
