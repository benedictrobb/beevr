const dbConnection = require('./db_connection.js');

data = {};

data.getJobs = (term, callback) => {
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

data.getStudents = (term, callback) => {
  dbConnection.query(`SELECT * FROM students
                      WHERE CATEGORY = $1`, [term], (err,res) => {
                            if (err) {
                               callback(err);
                             }
                             callback(null, res.rows);
                          });
                      };


data.postStudents = (object) => {
  dbConnection.query(`INSERT INTO students(first_name, last_name, email, DOB,
                      univ_school, job_cat, picture, bio, phone)
                      VALUES ('${object.first_name}', '${object.last_name}', '${object.email}',
                      '${object.dob}', '${object.uni}', '${object.job_cat})', '${object.picture}',
                      '${object.bio}', '${object.phone}'`, (err,res) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log('Data saved in the database');
                        });
                    };


data.postResidents = (object) => {
  dbConnection.query(`INSERT INTO residents(first_name, last_name, email, address, DOB,
                      picture, bio, phone) VALUES ('${object.first_name}', '${object.last_name}', '${object.email}',
                      '${object.address}', '${object.dob}','${object.picture}', '${object.bio}',
                      '${object.phone}' )`, (err,res) => {

                              if (err) {
                                console.log(err);
                              }
                              console.log('Data saved in the database');
                          });
                      };

data.postJobs = (object) => {
dbConnection.query(`INSERT INTO jobs(start_date, start_time, end_date, end_time, description,
                    rate, resident_id) VALUES ('${object.start_date}', '${object.start_time}', '${object.end_date}',
                    '${object.end_time}', '${object.description}','${object.rate}', '${object.resident_id}')`
                   ,(err,res) => {

                            if (err) {
                              console.log(err);
                            }
                            console.log('Data saved in the database');
                        });
                    };



module.exports = data;
