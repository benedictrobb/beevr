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

data.getRandomJobs = callback => {};

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

data.postStudents = (studentObject, callback) => {
    dbConnection.query(
        `INSERT INTO students(first_name, last_name, email, password, DOB,
                      univ_school, bio, picture, phone, job_cat)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
            studentObject.first_name,
            studentObject.last_name,
            studentObject.email,
            studentObject.password,
            studentObject.DOB,
            studentObject.univ_school,
            studentObject.bio,
            studentObject.picture,
            studentObject.phone,
            studentObject.job_cat
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
        `INSERT INTO residents(first_name, last_name, email, password, DOB, address,
                      bio, picture, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
            residentObject.first_name,
            residentObject.last_name,
            residentObject.email,
            residentObject.password,
            residentObject.DOB,
            residentObject.address,
            residentObject.bio,
            residentObject.picture,
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
