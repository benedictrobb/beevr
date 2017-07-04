BEGIN;

DROP TABLE IF EXISTS students, residents, jobs;

CREATE TABLE students (
    student_id      SERIAL          PRIMARY KEY NOT NULL,
    first_name      VARCHAR(25)     NOT NULL,
    last_name       VARCHAR(100)    NOT NULL,
    email           VARCHAR(50)     NOT NULL,
    password        VARCHAR(500)	,
    DOB             DATE            NOT NULL,
    univ_school     VARCHAR(250)    NOT NULL,
    job_cat         VARCHAR(1000)   NOT NULL,
    picture         VARCHAR(500)    NOT NULL,
    bio             VARCHAR(1500)   NOT NULL,
    phone           VARCHAR(15)     NOT NULL
);

CREATE TABLE residents (
    resident_id     SERIAL          PRIMARY KEY NOT NULL,
    first_name      VARCHAR(25)     NOT NULL,
    last_name       VARCHAR(100)    NOT NULL,
    email           VARCHAR(50)     NOT NULL,
    password        VARCHAR(500)    ,
    address         VARCHAR(100)    NOT NULL,
    DOB             DATE            NOT NULL,
    picture         VARCHAR(500)    NOT NULL,
    bio             VARCHAR(1500)   NOT NULL,
    phone           VARCHAR(15)     NOT NULL
);

CREATE TABLE jobs (
    job_id          SERIAL          PRIMARY KEY,
    start_date      DATE            NOT NULL,
    start_time      TIME            NOT NULL,
    end_date        DATE            NOT NULL,
    end_time        TIME            NOT NULL,
    description     VARCHAR(1000)   NOT NULL,
    rate            DECIMAL(5,2)    NOT NULL,
    student_id      INTEGER         ,
    resident_id     INTEGER         REFERENCES residents(resident_id)
);

INSERT INTO students(first_name, last_name, email, DOB, univ_school, job_cat, picture, bio, phone) VALUES
('Antonio','Trabalza','antoniotrkdz@gmail.com','10/08/1979','Cambridge University','[ coding, science, handyman ]','#','111-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','07577833827'),
('Maja', 'Kudlika','maja.kudlika@gmail.com','01/01/1970','Ruskin University','[ coding, start-ups, tuition ]','#','222-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','01234567891');

INSERT INTO residents(first_name, last_name, email, address, DOB, picture, bio, phone) VALUES
('John','Smith','john.smith@gmail.com','1 Cranston Court','01/03/1973','#','333-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','012345678901'),
('Jane','Doe','jane.doe@gmail.com','34 High Street','01/02/1972','#','444-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','012345678901');

INSERT INTO jobs(start_date, start_time, end_date, end_time, description, rate, resident_id) VALUES
('03/07/2017','10:00','03/07/2017','18:00','555-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?',75.00,1),
('07/07/2017','07:00','03/07/2017','09:00','666-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?',50.00,2),
('10/07/2017','10:00','03/07/2017','18:00','777-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?',100.00,1),
('04/07/2017','09:00','03/07/2017','13:00','888-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?',25.00,2);

COMMIT;
