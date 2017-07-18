const dbConnection = require('./db_connection.js');

data = {};

data.getJobs = (callback, term) => {
    if (!term) {
        dbConnection.query(
            `SELECT * FROM jobs WHERE end_date < NOW()
         ORDER BY start_date LIMIT 10;`,
            (err, res) => {
                if (err) {
                    callback(err);
                }
                callback(null, res.rows);
            }
        );
    } else {
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
    }
};

data.getStudents = callback => {
    console.log('inside database_queries');
    dbConnection.query(
        'SELECT * FROM students',
        // WHERE CATEGORY = $1`,
        // [term],
        (err, res) => {
            if (err) {
                callback(err);
            }
            callback(null, res.rows);
        }
    );
};

data.postStudents = (StudentObject, callback) => {
    dbConnection.query(
        `INSERT INTO students(first_name, last_name, email, DOB,
                      univ_school, job_cat, picture, bio, phone)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
            StudentObject.first_name,
            StudentObject.last_name,
            StudentObject.email,
            StudentObject.dob,
            StudentObject.uni,
            StudentObject.job_cat,
            StudentObject.picture,
            StudentObject.bio,
            StudentObject.phone
        ],
        (err, res) => {
            if (err) {
                callback(err);
            }
            callback(null, res.rows);
        }
    );
};

data.postResidents = (residentObject, callback) => {
    dbConnection.query(
        `INSERT INTO residents(first_name, last_name, email, address, DOB,
                      picture, bio, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
            residentObject.first_name,
            residentObject.last_name,
            residentObject.email,
            residentObject.address,
            residentObject.dob,
            residentObject.picture,
            residentObject.bio,
            residentObject.phone
        ],
        (err, res) => {
            if (err) {
                callback(err);
            }
            callback(null, res.rows);
        }
    );
};

data.postJobs = (jobsObject, callback) => {
    dbConnection.query(
        `INSERT INTO jobs(job_title, start_date, start_time, end_date, end_time, description,
                    rate, resident_id, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
            jobsObject.job_title,
            jobsObject.start_date,
            jobsObject.start_time,
            jobsObject.end_date,
            jobsObject.end_time,
            jobsObject.description,
            jobsObject.rate,
            jobsObject.resident_id,
            jobsObject.category
        ],
        (err, res) => {
            if (err) {
                callback(err);
            }

            callback(null, res.rows);
        }
    );
};

module.exports = data;
