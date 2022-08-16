-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS yawp_users CASCADE;
DROP TABLE IF EXISTS yawp_restaurants CASCADE;
DROP TABLE IF EXISTS yawp_reviews CASCADE;

CREATE TABLE yawp_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

INSERT INTO yawp_users(first_name, last_name, email, password_hash) VALUES 
('test1', 'test1', 'test1@test.com', 'nottest1passwordhash'),
('test2', 'test2', 'test2@test.com', 'nottest2passwordhash'),
('test3', 'test3', 'test3@test.com', 'nottest3passwordhash');

CREATE TABLE yawp_restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL
);

INSERT INTO yawp_restaurants(name, type) VALUES 
('Vinnys', 'Indian'),
('Rachels', 'Italian'),
('Putus', 'Indonesian');

CREATE TABLE yawp_reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  stars TEXT NOT NULL,
  restaurant_id BIGINT,
  user_id BIGINT,
  FOREIGN KEY (restaurant_id) REFERENCES yawp_restaurants(id),
  FOREIGN KEY (user_id) REFERENCES yawp_users(id)
  );

INSERT INTO yawp_reviews (stars) VALUES
  ('5'),
  ('4'),
  ('1');
