const dbConnection = require('./db_connection.js');

data = {};

data.getStudents = (term, callback) => {
  dbConnection.query(`SELECT * FROM jobs
                      WHERE CATEGORY = $1
                      AND end_date < NOW()
                      ORDER BY start_date;`, [term], (err,res) => {
                          if (err) {
                              callback(err);
                          }
                          callback(null, res.rows);
                      });
                  };


module.exports = data;
