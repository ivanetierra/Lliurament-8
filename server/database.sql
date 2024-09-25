CREATE DATABASE IF NOT EXISTS store;
USE store;

-- Create the calendar_events table
CREATE TABLE IF NOT EXISTS calendar_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME NOT NULL
);

-- Insert sample data into calendar_events table
INSERT INTO calendar_events (title, start, end) VALUES
('Meeting with client', '2024-09-26 10:00:00', '2024-09-20 11:00:00'),
('Team Stand-up', '2024-09-25 09:00:00', '2024-09-21 09:30:00'),
('Project Deadline', '2024-09-25 12:00:00', '2024-09-25 13:00:00');

-- Create the products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

-- Insert sample data into products table
INSERT INTO products (name, description, price, stock) VALUES
('Hammer', 'Heavy-duty hammer for construction work', 25.50, 110),
('Screwdriver Set', 'Set of various screwdrivers for different uses', 29.00, 55),
('Electric Drill', 'Cordless electric drill with multiple bits', 75.00, 25),
('Circular Saw', 'High-power circular saw for cutting wood and metal', 155.00, 10);