CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;

CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(255) NOT NULL
);

INSERT INTO todos (task) VALUES 
('Osta piima'),
('Õpi TypeScripti'),
('Tee MySQL praktikum läbi');