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

data.getStudents = (callback, term) => {
    if (!term) {
        dbConnection.query('SELECT * FROM students LIMIT 10', (err, res) => {
            if (err) {
                callback(err);
            }

            callback(null, res.rows);
        });
    } else {
        dbConnection.query(
            'SELECT * FROM students WHERE $1 = ANY (job_cat)',
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

data.getMyJobs = (callback, student_id) => {
    dbConnection.query(
        'SELECT * FROM jobs WHERE $1 = ANY (student_id)',
        [student_id],
        (err, res) => {
            if (err) {
                callback(err);
            }

            callback(null, res.rows);
        }
    );
};

data.postStudents = (student, callback) => {
    dbConnection.query(
        `INSERT INTO students(first_name, last_name, email, password, DOB,
                      univ_school, bio, picture, phone, job_cat)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
            student.first_name,
            student.last_name,
            student.email,
            student.password,
            student.DOB,
            student.univ_school,
            student.bio,
            student.picture,
            student.phone,
            student.job_cat
        ],
        (err, res) => {
            if (err) {
                callback(err);
            }
            callback(null, res.rows);
        }
    );
};

data.postResidents = (resident, callback) => {
    dbConnection.query(
        `INSERT INTO residents(first_name, last_name, email, password, DOB, address,
                      bio, picture, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
            resident.first_name,
            resident.last_name,
            resident.email,
            resident.password,
            resident.DOB,
            resident.address,
            resident.bio,
            resident.picture,
            resident.phone
        ],
        (err, res) => {
            if (err) {
                callback(err);
            }
            callback(null, res.rows);
        }
    );
};

data.sendApplication = (job_id, callback) => {
    dbConnection.query(
        'UPDATE jobs SET student_id = array_append(student_id, \'5\') WHERE job_id = $1',
        [job_id],
        (err, res) => {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
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
