DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;


CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL  
  );



CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,  
  FOREIGN KEY(department_id) REFERENCES department(id)
);



CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    job_id INT, 
    manager_id INT
   /* FOREIGN KEY(position_id) REFERENCES position(position_id)
    FOREIGN KEY(manager_id) REFERENCES employee(employee_id) */
);


ALTER TABLE employee
ADD FOREIGN KEY (job_id)
REFERENCES role(id);


ALTER TABLE employee
ADD FOREIGN KEY (manager_id)
REFERENCES employee(id);

/*the above alters are added b/c i could not get the initial create table to run with the self foreign key*/