-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

INSERT INTO users(first_name, last_name, email, password_hash) VALUES 
('test1', 'test1', 'test1@test.com', 'nottest1passwordhash'),
('test2', 'test2', 'test2@test.com', 'nottest2passwordhash'),
('test3', 'test3', 'test3@test.com', 'nottest3passwordhash');
