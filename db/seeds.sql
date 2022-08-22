-- Initial departments for the database.
INSERT INTO department (id, name)
VALUES (1, "Upper Management"),
       (2, "HR"),
       (3, "Production"),
       (4, "Sales");

-- Initial roles for the database.
INSERT INTO role (id, title, salary, department_id, is_manager)
VALUES (1, "CEO", 3000, 1, true),
       (2, "HR Manager", 2000, 2, true),
       (3, "HR Assistant", 1000, 2, false),
       (4, "Production Manager", 2000, 3, true),
       (5, "Production Worker", 1000, 3, false),
       (6, "Sales Lead", 2000, 4, true),
       (7, "Sales Associate", 1000, 4, false);

-- Initial employees for the database.
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Axl", "Hull", 1, null),
       (2, "Mitchell", "Booker", 2, 1),
       (3, "Rohit", "Berna", 3, 2),
       (4, "Lincoln", "Ashton", 3, 2),
       (5, "Jedd", "Farrington", 4, 1),
       (6, "Kareem", "Kaufman", 5, 5),
       (7, "Luisa", "Hussain", 5, 5),
       (8, "Christy", "Snow", 6, 1),
       (9, "Billy-Joe", "Beach", 7, 8),
       (10, "Laurel", "Kemp", 7, 8);