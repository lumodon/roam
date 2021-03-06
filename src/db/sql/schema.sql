DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS cities;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL,
  user_id INTEGER,
  city_id INTEGER,
  post_body VARCHAR NOT NULL
);

CREATE TABLE cities (
  id SERIAL,
  name VARCHAR(255) NOT NULL
);
