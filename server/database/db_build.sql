
BEGIN;

DROP TABLE IF EXISTS students, residents, jobs;

CREATE TABLE students (
    student_id      SERIAL          PRIMARY KEY NOT NULL,
    first_name      VARCHAR(25)     NOT NULL,
    last_name       VARCHAR(100)    NOT NULL,
    email           VARCHAR(50)     NOT NULL,
    DOB             DATE            ,
    univ_school     VARCHAR(250)    NOT NULL,
    bio             VARCHAR(1500)   ,
    picture         VARCHAR(1500)           ,
    phone           VARCHAR(15)     NOT NULL,
    job_cat         VARCHAR[]       ,
    password_hash   VARCHAR(100)    NOT NULL
);

CREATE TABLE residents (
    resident_id     SERIAL          PRIMARY KEY NOT NULL,
    first_name      VARCHAR(25)     NOT NULL,
    last_name       VARCHAR(100)    NOT NULL,
    email           VARCHAR(50)     NOT NULL,
    DOB             DATE            ,
    address         VARCHAR(200)    NOT NULL,
    bio             VARCHAR(1500)   ,
    picture         VARCHAR(1500)           ,
    phone           VARCHAR(15)     NOT NULL,
    password_hash   VARCHAR(100)    NOT NULL
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
    student_id      INTEGER[]       ,
    resident_id     INTEGER         REFERENCES residents(resident_id)
);

INSERT INTO students(first_name, last_name, email, DOB, univ_school, bio, picture, phone, job_cat, password_hash) VALUES
('Maja', 'Kudlicka','maja.kudlicka@gmail.com','01/01/1970','Ruskin University','111-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','https://images.pexels.com/photos/20787/pexels-photo.jpg?w=940&h=650&auto=compress&cs=tinysrgb','01234567891','{{coding},{start-ups},{tuition}}','$2a$10$uCXeITshhIPg5ZK81.KQTuDIF782fmH/cKZFh/TSCEIgxpO.jf5eq'),
('Antonio','Trabalza','antoniotrkdz@gmail.com','10/08/1979','Cambridge University','222-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?w=940&h=650&auto=compress&cs=tinysrgb','07577833827','{{coding},{science},{handyman}}','$2a$10$67daGjo4zz.UX9zH9x/rLuYVcp5H5edK4uhsc2KYQ4rJBPB38KBM6'),
('Ben','Robb','ben.robb@gmail.com','10/04/1987','Cambridge University','333-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','https://images.pexels.com/photos/14644/pexels-photo-14644.jpeg?w=940&h=650&auto=compress&cs=tinysrgb','07578890890','{{funding},{SES},{invoice}}','$2a$10$N3kz2lFulFAVSDmOcQnL3OMXgrDxBqjLCBgBFyvKcUD67qJT7iVJW'),
('Jessica', 'Salomom','j.salm@gmail.com','01/01/1980','Ruskin University','444-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?w=940&h=650&auto=compress&cs=tinysrgb','01234567891','{{Photography},{Cat sitting},{Other}}','#');

INSERT INTO residents(first_name, last_name, email, DOB, address, bio, picture, phone, password_hash) VALUES
('John','Smith','john.smith@gmail.com','01/03/1973','1 Cranston Court','333-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','#','012345678901','$2a$10$s9uPMNiX91YNjIKtJV9f1uJegbZpArU/k5Pv38gTx6ImKbVWzTjJ.'),
('Jane','Doe','jane.doe@gmail.com','01/02/1972','34 High Street','444-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','#','012345678901','#');

INSERT INTO jobs(job_title, start_date, start_time, end_date, end_time, description, category, rate, student_id, resident_id) VALUES
('Reliable and friendly dog walker wanted!','03/07/2017','10:00','03/07/2017','18:00','555-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','Dog-walking',75.00,'{1, 2}',1),
('Urgent - babysitter needed for a 3-year-old baby','07/07/2017','07:00','03/07/2017','09:00','666-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','Babysitting',50.00,'{}',2),
('My lovely dog need someone to take her for long walks','10/07/2017','10:00','03/07/2017','18:00','777-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','Dog-walking',100.00,'{1, 2, 3, 4}',1),
('A talented amateur photographer needed to photograph a birthday party','04/07/2017','09:00','03/07/2017','13:00','888-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','Photography',25.00,'{1}',2),
('Reliable and friendly dog walker wanted!','03/07/2017','10:00','03/07/2017','18:00','555-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','Dog-walking',75.00,'{1, 2}',1),
('Urgent - babysitter needed for a 3-year-old baby','07/07/2017','07:00','03/07/2017','09:00','666-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','Babysitting',50.00,'{}',2),
('My lovely dog need someone to take her for long walks','10/07/2017','10:00','03/07/2017','18:00','777-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','Dog-walking',100.00,'{1, 2, 3, 4}',1),
('A talented amateur photographer needed to photograph a birthday party','04/07/2017','09:00','03/07/2017','13:00','888-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','Photography',25.00,'{1}',2),
('Reliable and friendly dog walker wanted!','03/07/2017','10:00','03/07/2017','18:00','555-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','Dog-walking',75.00,'{1, 2}',1),
('Urgent - babysitter needed for a 3-year-old baby','07/07/2017','07:00','03/07/2017','09:00','666-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','Babysitting',50.00,'{}',2),
('My lovely dog need someone to take her for long walks','10/07/2017','10:00','03/07/2017','18:00','777-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','Dog-walking',100.00,'{1, 2, 3, 4}',1),
('A talented amateur photographer needed to photograph a birthday party','04/07/2017','09:00','03/07/2017','13:00','888-Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni maxime dicta ullam aut, sunt. Quidem veniam unde, minima, velit tempore odit voluptas alias, harum tenetur placeat animi, quaerat perspiciatis?','Photography',25.00,'{1}',2);

COMMIT;
