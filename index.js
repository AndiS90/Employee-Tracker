//Include packages needed for this application
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const {viewWholeDept, viewDeptByID, addDept, getDepts}= require('./lib/department');
const {viewRoleWhole, viewRoleByID, addRole, getTitles} = require('./lib/role');
const {viewEmployeeWhole, viewEmployeeByID, viewEmployeeByDeptName, addEmployee, getManagers, updateEmployee, getEmpNames} = require('./lib/employee');



const allEmployees = [];
const allRoles = [];
const allDepts = [];
const allManagers = [];

const allEmpID = [];
const allRolesID = [];
const allDeptsID = [];
const allManagersID = [];



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
        "ADD A ROLE", "ADD AN EMPLOYEE", "UPDATE EMPLOYEE ROLE"]
}];

const addDeptQ = [{

    type: 'input',
    name: 'deptName',
    message: 'What is the name of the Department?'

}];

const addRoleQ = [{

        type: 'input',
        name: 'title',
        message: 'What is the title of the role?',
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
        choices: allDepts
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
        name: 'employeeSalary',
        message: "What is this employees's salary?",
    },
    {
        type: 'input',
        name: 'employeeRole',
        message: 'What role does this employee have?',
        choices: allRoles
    },
    {
        type: 'input',
        name: 'employeeManager',
        message: "Who is this employee's manager?",
        choices: allManagers
    }
];


const updateEmployeeQ= [{

    type: 'input',
    name: 'empRole',
    message: 'What is the new role?',
    choices: allRoles
}];



 function fillAllRoles() {

    let rolez = getTitles();
    
    for(i=0; i < rolez.length; i++){
       
        allRolesID.push(rolez[i]);
        allRoles.push(rolez[i].title);

    }
};

function fillAllEmps() {
    let emps = getEmpNames();

    for (i=0; i<emps.length; i++){
        allEmpID.push(emps[i]);
        allEmployees.push(emps[i].name);

    }
};


function fillAllDepts() {

    let depts = getDepts();

    for(i=0; i<depts.length; i++){

        allDeptsID.push(depts[i]);
        allDepts.push(depts[i].department_name)
    }
};

function fillAllManagers() {

    let mgrs = getManagers();

    for(i=0; i<mgrs.length; i++){

        allManagersID.push(mgrs[i]);
        allManagers.push(mgrs[i].manager);
    }
};


function init(){
    fillAllRoles();
    fillAllEmps();
    fillAllDepts();
    fillAllManagers();
    
    promptMenu();
};

async function promptMenu() {
    await inquirer.prompt(menu)
        .then((data) => {
            menuAnswer = data.menu;
            menuIf(menuAnswer);
        })
};


async function menuIf(answer) {

    if (answer === "VIEW ALL DEPTS") {

        await viewWholeDept();

        promptMenu();

    } else if (answer === "VIEW ALL ROLES") {

        await viewRoleWhole();

        promptMenu();

    } else if (answer === "VIEW ALL EMPLOYEES") {

        await viewEmployeeWhole();

        promptMenu();

    } else if (answer === "ADD A ROLE") {

        await inquirer.prompt(addRoleQ)
            .then((data) => {



                addRole(data.title, data.roleSalary, data.roleDept);
            });


        promptMenu();

    } else if (answer === "ADD AN EMPLOYEE") {

        await inquirer.prompt(addEmployeeQ)
            .then((data) => {

                addEmployee(data.employeeFirst, data.employeeLast, data.employeeSalary, data.employeeRole, data.employeeManager);



            });


        promptMenu();

    } else if (answer === "ADD DEPARTMENT") {

        await inquirer.prompt(addDeptQ)
            .then((data) => {

                addDept(data.deptName); 


            });


        promptMenu();

    } else if (answer === "UPDATE EMPLOYEE ROLE") {

        await inquirer.prompt()
            .then((data) => {

                role.addRole(data.roleName, data.roleSalary, data.roleDept);



            });


        promptMenu();

    } else if (answer === "Finish!") {

        //exit application       
            connection.end();
            console.log('Thank you, Good-bye!');
        }




        //return;

    };

    init();
