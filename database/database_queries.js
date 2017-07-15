const dbConnection = require('./db_connection.js');

data = {};

data.getJobs = (term, callback) => {
    dbConnection.query(
        `SELECT * FROM jobs
                      WHERE CATEGORY = $1
                      AND end_date < NOW()
                      ORDER BY start_date;`,
        [term],
        (err, res) => {
            if (err) {
                callback(err);
            }
            callback(null, res.rows);
        }
    );
};

data.getStudents = (term, callback) => {
    dbConnection.query(
        `SELECT * FROM students
                      WHERE CATEGORY = $1`,
        [term],
        (err, res) => {
            if (err) {
                callback(err);
            }
            callback(null, res.rows);
        }
    );
};

data.regStudents = (object, callback) => {
    dbConnection.query(
        `SELECT exists(SELECT students.email FROM students WHERE students.email = $1) FROM students`,
        [object.email],
        (err, res) => {
            console.log(res.rows);
            if (err) {
                callback(err);
            }
            callback(null, res.rows);
        }
    );
};


data.postStudents = (object, callback) => {
    dbConnection.query(
        `INSERT INTO students(first_name, last_name, email, DOB,
                      univ_school, job_cat, picture, bio, phone)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [object.first_name],
        [object.last_name],
        [object.email],
        [object.dob],
        [object.uni],
        [object.job_cat],
        [object.picture],
        [object.bio],
        [object.phone],
        (err, res) => {
            if (err) {
                callback(err);
            }
            callback(null, res.rows);
        }
    );
};

data.postResidents = (object, callback) => {
    dbConnection.query(
        `INSERT INTO residents(first_name, last_name, email, address, DOB,
                      picture, bio, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [object.first_name],
        [object.last_name],
        [object.email],
        [object.address],
        [object.dob],
        [object.picture],
        [object.bio],
        [object.phone],
        (err, res) => {
            if (err) {
                callback(err);
            }
            callback(null, res.rows);
        }
    );
};

data.postJobs = (object, callback) => {
    dbConnection.query(
        `INSERT INTO jobs(start_date, start_time, end_date, end_time, description,
                    rate, resident_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [object.start_date],
        [object.start_time],
        [object.end_date],
        [object.end_time],
        [object.description],
        [object.rate],
        [object.resident_id],
        (err, res) => {
            if (err) {
                callback(err);
            }
            callback(null, res.rows);
        }
    );
};

module.exports = data;
