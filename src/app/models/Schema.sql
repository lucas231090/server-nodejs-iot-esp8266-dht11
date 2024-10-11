CREATE DATABASE IF NOT EXISTS sensores_db;
USE sensores_db;

CREATE TABLE IF NOT EXISTS sensores (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    user_id VARCHAR(255) NOT NULL,      
    ipArduino VARCHAR(50) NOT NULL,     
    tipoMedida1 VARCHAR(50) NOT NULL,   
    unidadeMedida1 VARCHAR(20) NOT NULL, 
    valor1 FLOAT NOT NULL,               
    tipoMedida2 VARCHAR(50),            
    unidadeMedida2 VARCHAR(20),          
    valor2 FLOAT,                       
    modeloSensor VARCHAR(100) NOT NULL,  
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);