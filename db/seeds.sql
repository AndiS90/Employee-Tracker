INSERT INTO department (id, name)
    VALUES (11, Math)
           (12, Comp Sci)
            (13, Business)

INSERT INTO role (id, title, salary, department_id)
    VALUES (111, Instructor, 52000, 11)
           (112, Maintenance, 22000, 13)
           (113, Analyst, 35000, 12)
           (114, Manager, 40000, 13)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES (1111, Bob, Smith, 111, )