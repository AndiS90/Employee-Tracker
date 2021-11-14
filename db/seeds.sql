INSERT INTO department (department_name)
    VALUES ("Math"),
        ("Comp_Sci"),
         ("Business");

INSERT INTO role (title, salary, department_id)
    VALUES ("Manager", 52000, 1),
           ("Maintenance", 22000, 3),
           ("Analyst", 35000, 2),
           ("Instructor", 40000, 3);

INSERT INTO employee (first_name, last_name, job_id, manager_id)
    VALUES ( "Bob", "Smith", 1, NULL),
            ("Mat", "Cauthon", 3, 1),
            ("Moiraine", "Damodred", 4, 1),
            ("Padan", "Fain", 1, NULL ),
            ("Perrin", "Aybarra", 4, 4),
            ("Nynaeve", "al'Maera", 2, 4);