DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXITS destinations;

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(100),
    first_name VARCHAR(100),
    cell_phone VARCHAR
    affiliation VARCHAR(100),
    position VARCHAR(100),
    arrival_date DATE,
    arrival_time TIME,
    destination_id INT FOREIGN KEY REFERENCES destinations(id)

)

CREATE TABLE destinations (
    id SERIAL PRIMARY KEY,
    airport TEXT

)