INSERT INTO department (id, name)
VALUES (1, "HR"),
       (2, "Production"),
       (3, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "HR Manager", 2000, 1),
       (2, "HR Assistant", 1000, 1),
       (3, "Production Manager", 2000, 2),
       (4, "Production Worker", 1000, 2),
       (5, "Sales Lead", 2000, 3),
       (6, "Sales Associate", 1000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, )