const fs = require('fs');
const dbConnection = require('./db_connection.js');

data = {};

data.getJobs = (callback, term) => {
    if (!term) {
        dbConnection.query(
            `SELECT * FROM jobs 
                WHERE end_date < NOW()
                ORDER BY start_date 
                LIMIT 10;`,
            (err, res) => {
                if (err) {
                    return callback(err);
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
                    return callback(err);
                }
                callback(null, res.rows);
            }
        );
    }
};

data.getStudents = (callback, term) => {
    if (!term) {
        dbConnection.query(
            `SELECT 
                students.student_id, 
                students.first_name, 
                students.last_name, 
                students.email, 
                students.dob, 
                students.univ_school, 
                students.bio, 
                students.picture, 
                students.phone, 
                students.job_cat
                    FROM students LIMIT 10;`,
            (err, res) => {
                if (err) {
                    return callback(err);
                }

                callback(null, res.rows);
            }
        );
    } else {
        dbConnection.query(
            `SELECT 
                students.student_id, 
                students.first_name, 
                students.last_name, 
                students.email, 
                students.dob, 
                students.univ_school, 
                students.bio, 
                students.picture, 
                students.phone, 
                students.job_cat 
                    FROM students WHERE $1 = ANY (job_cat);`,
            [term],
            (err, res) => {
                if (err) {
                    return callback(err);
                }

                callback(null, res.rows);
            }
        );
    }
};

data.loginRequest = (email, callback) => {
    dbConnection.query(
        `SELECT residents.resident_id AS id, 
        residents.email, residents.password_hash, 
        'Resident' AS role
            FROM residents
            WHERE residents.email = $1
            UNION ALL
            SELECT students.student_id AS id, 
            students.email, students.password_hash, 
            'Student' AS role
                FROM students
                WHERE students.email = $1;`,
        [email],
        (err, res) => {
            if (err) {
                return callback(err);
            }
            callback(null, res.rows[0]);
        }
    );
};

data.getMyJobs = (callback, student_id) => {
    dbConnection.query(
        'SELECT * FROM jobs WHERE $1 = ANY (student_id)',
        [student_id],
        (err, res) => {
            if (err) {
                return callback(err);
            }
            callback(null, res.rows[0]);
        }
    );
};

data.studentExists = (email, callback) => {
    dbConnection.query(
        `SELECT exists(
            SELECT 1 FROM students
                WHERE email = $1);`,
        [email],
        (err, res) => {
            if (err) {
                return callback(err);
            }
            callback(null, res.rows[0]);
        }
    );
};

data.postStudents = (student, callback) => {
    dbConnection.query(
        `INSERT INTO students(
            first_name, last_name, email, DOB, univ_school, 
            bio, phone, job_cat, password_hash)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
        [
            student.firstName,
            student.lastName,
            student.email,
            student.DOB,
            student.univSchool,
            student.bio,
            student.phone,
            student.jobCat,
            student.passwordHash,
        ],
        (err, res) => {
            if (err) {
                return callback(err);
            }
            callback(null, res.rows);
        }
    );
};

data.postAvatar = (file, callback) => {
    fs.readFile(file, 'hex', (err, imgData) => {
        imgData = '\\x' + imgData;
        dbConnection.query(
            `INSERT INTO avatars(picture) 
                VALUES ($1);`,
            [imgData],
            (err, writeResult) => {
                if (err) {
                    return callback(err);
                }
                callback(null, writeResult);
            }
        );
    });
};

data.residentExists = (email, callback) => {
    dbConnection.query(
        `SELECT exists(
            SELECT 1 FROM residents
                WHERE email = $1);`,
        [email],
        (err, res) => {
            if (err) {
                return callback(err);
            }
            callback(null, res.rows[0]);
        }
    );
};

data.postResidents = (resident, callback) => {
    dbConnection.query(
        `INSERT INTO residents(
            first_name, last_name, email, DOB, 
            address, bio, phone, password_hash) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
        [
            resident.firstName,
            resident.lastName,
            resident.email,
            resident.DOB,
            resident.address,
            resident.bio,
            resident.phone,
            resident.passwordHash,
        ],
        (err, res) => {
            if (err) {
                return callback(err);
            }
            callback(null, res.rows);
        }
    );
};

data.postJobs = (jobsObject, callback) => {
    dbConnection.query(
        `INSERT INTO jobs(
        job_title, start_date, start_time, end_date, 
        end_time, description, rate, resident_id, category) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
        [
            jobsObject.job_title,
            jobsObject.start_date,
            jobsObject.start_time,
            jobsObject.end_date,
            jobsObject.end_time,
            jobsObject.description,
            jobsObject.rate,
            jobsObject.resident_id,
            jobsObject.category,
        ],
        (err, res) => {
            if (err) {
                return callback(err);
            }

            callback(null, res.rows);
        }
    );
};

module.exports = data;
