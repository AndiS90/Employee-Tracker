//Include packages needed for this application
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const department = require('./lib/department');
const role = require('./lib/role');
const employee = require('./lib/employee')


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user:process.env.DB_USER,
      // MySQL password
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME
    },
    console.log(`Connected to the company_db database.`)
  );


const menu = [{
    type: "list",
    name: "menu",
    message: "You may add:",
    choices: ["VIEW ALL DEPTS", "VIEW ALL ROLES", "VIEW ALL EMPLOYEES", 
                "ADD A ROLE", "ADD AN EMPLOYEE", "UPDATE EMPLOYEE ROLE"]
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

}];

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
    message: "What is this employees's salary (INT ONLY PLZ)?",
},
{
    type: 'input',
    name: 'employeeRole',
    message: 'What is the role does this employee have?',
},
{
    type: 'input',
    name: 'employeeManager',
    message: "Who is this employee's manager?"
}];