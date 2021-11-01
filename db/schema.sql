DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;


CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL  
  );



CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,  
  FOREIGN KEY(department_id) REFERENCES department(department_id)
);



CREATE TABLE employee (
    employee_id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT
   /* FOREIGN KEY(position_id) REFERENCES position(position_id)
    FOREIGN KEY(manager_id) REFERENCES employee(employee_id) */
);


ALTER TABLE employee
ADD FOREIGN KEY (role_id)
REFERENCES role(role_id);


ALTER TABLE employee
ADD FOREIGN KEY (manager_id)
REFERENCES employee(employee_id);
