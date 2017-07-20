
BEGIN;

DROP TABLE IF EXISTS students, residents, jobs;

CREATE TABLE students (
    student_id      SERIAL          PRIMARY KEY NOT NULL,
    first_name      VARCHAR(25)     NOT NULL,
    last_name       VARCHAR(100)    NOT NULL,
    email           VARCHAR(50)     NOT NULL,
    password        VARCHAR(50)	    ,
    DOB             DATE            ,
    univ_school     VARCHAR(250)    NOT NULL,
    bio             VARCHAR(1500)   NOT NULL,
    picture         BYTEA           ,
    phone           VARCHAR(15)     NOT NULL,
    job_cat         VARCHAR(1000)   
);

CREATE TABLE residents (
    resident_id     SERIAL          PRIMARY KEY NOT NULL,
    first_name      VARCHAR(25)     NOT NULL,
    last_name       VARCHAR(100)    NOT NULL,
    email           VARCHAR(50)     NOT NULL,
    password        VARCHAR(50)     ,
    DOB             DATE            ,
    address         VARCHAR(200)    NOT NULL,
    bio             VARCHAR(1500)   NOT NULL,
    picture         BYTEA           ,
    phone           VARCHAR(15)     NOT NULL
);

CREATE TABLE jobs (
    job_id          SERIAL          PRIMARY KEY,
    job_title       VARCHAR(150)    NOT NULL,
    start_date      DATE            NOT NULL,
    start_time      TIME            NOT NULL,
    end_date        DATE            NOT NULL,
    end_time        TIME            NOT NULL,
    description     VARCHAR(1000)   NOT NULL,
    category        VARCHAR(100)    NOT NULL,
    rate            DECIMAL(5,2)    NOT NULL,
    student_id      INTEGER         ,
    resident_id     INTEGER         REFERENCES residents(resident_id)
);

INSERT INTO students(first_name, last_name, email, password, DOB, univ_school, bio, picture, phone, job_cat) VALUES
('Antonio','Trabalza','antoniotrkdz@gmail.com','#','10/08/1979','Cambridge University','111-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','#','07577833827','[ coding, science, handyman ]'),
('Maja', 'Kudlika','maja.kudlika@gmail.com','#','01/01/1970','Ruskin University','222-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','#','01234567891','[ coding, start-ups, tuition ]');

INSERT INTO residents(first_name, last_name, email, password, DOB, address, bio, picture, phone) VALUES
('John','Smith','john.smith@gmail.com','#','01/03/1973','1 Cranston Court','333-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','#','012345678901'),
('Jane','Doe','jane.doe@gmail.com','#','01/02/1972','34 High Street','444-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','#','012345678901');

INSERT INTO jobs(job_title, start_date, start_time, end_date, end_time, description, category, rate, resident_id) VALUES
('Reliable and friendly dog walker wanted!','03/07/2017','10:00','03/07/2017','18:00','555-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','dog walking',75.00,1),
('Urgent - babysitter needed for a 3-year-old baby','07/07/2017','07:00','03/07/2017','09:00','666-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','babysitting',50.00,2),
('My lovely dog need someone to take her for long walks','10/07/2017','10:00','03/07/2017','18:00','777-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','dog walking',100.00,1),
('A talented amateur photographer needed to photograph a birthday party','04/07/2017','09:00','03/07/2017','13:00','888-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','photography',25.00,2);

COMMIT;
