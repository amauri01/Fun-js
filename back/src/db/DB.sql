CREATE DATABASE IF NO EXISTS futbol_equipos;
USE futbol_equipos;

CREATE TABLE equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
);

