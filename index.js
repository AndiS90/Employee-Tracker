//Include packages needed for this application
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const department = require('./lib/department');
const role = require('./lib/role');
const employee = require('./lib/employee')


allEmployees = [];
allRoles = [];
allDepts = [];

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: process.env.DB_USER,
        // MySQL password
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the company_db database.`)
);




const menu = [{
    type: "list",
    name: "menu",
    message: "You may choose:",
    choices: ["VIEW ALL DEPTS", "VIEW ALL ROLES", "VIEW ALL EMPLOYEES",
        "ADD A ROLE", "ADD AN EMPLOYEE", "UPDATE EMPLOYEE ROLE"
    ]
}];

const addDeptQ = [{

    type: 'input',
    name: 'deptName',
    message: 'What is the name of the Department?'

}];

const addRoleQ = [{

        type: 'input',
        name: 'roleName',
        message: 'What is the role name?',
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary for this role?',
    },
    {
        type: 'input',
        name: 'roleDept',
        message: 'What is the department for this role?',
        choices: [department.getDepts()]
    }
];

const addEmployeeQ = [{

        type: 'input',
        name: 'employeeFirst',
        message: "What is the employee's first name?",
    },
    {

        type: 'input',
        name: 'employeeLast',
        message: "What is the employee's last name?",
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: "What is this employees's salary?",
    },
    {
        type: 'input',
        name: 'employeeRole',
        message: 'What role does this employee have?',
        choices: [role.getTitles()]
    },
    {
        type: 'input',
        name: 'employeeManager',
        message: "Who is this employee's manager?",
        choices: [employee.getManagers()]
    }
];




async function promptMenu() {
        await inquirer.prompt(menu)
            .then((data) => {
                menuAnswer = data.menu;
                menuIf(menuAnswer);
            })};





        async function menuIf(answer) {

            if (answer === "VIEW ALL DEPTS") {

                await department.viewWhole();


                promptMenu();

            } else if (answer === "VIEW ALL ROLES") {

                await role.viewWhole();


                promptMenu();



            } else if (answer === "VIEW ALL EMPLOYEES") {

                await employee.viewWhole();

                promptMenu();

            } else if (answer === "ADD A ROLE") {

               await inquirer.prompt(addRoleQ)
                    .then((data) => {

                        role.addRole(data.roleName, data.roleSalary, data.roleDept);
                   });


                promptMenu();

            } else if (answer === "ADD AN EMPLOYEE") {

               await inquirer.prompt(addEmployeeQ)
                    .then((data) => {




                    });


                promptMenu();

            } else if (answer === "UPDATE EMPLOYEE ROLE") {

               await inquirer.prompt(addDeptQ)
                    .then((data) => {

                        role.addRole(data.roleName, data.roleSalary, data.roleDept);



                    });


                promptMenu();

            } else if (answer === "Finish!") {

                await




                //return;

            }
        };
