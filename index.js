//Include packages needed for this application
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// const { viewWholeDept, addDept, getDepts}= require('./lib/department');
// const {viewRoleWhole,  addRole, getTitles} = require('./lib/role');
// const {viewEmployeeWhole,  addEmployee, getManagers, updateEmployee, getEmpNames} = require('./lib/employee');
require('dotenv').config();

//arrays to hold question response options
let allEmployees = [];
let allRoles = [];
let allDepts = [];
let allManagers = [];

//arrays to hold the full objects
let allEmpID = [];
let allRolesID = [];
let allDeptsID = [];
let allManagersID = [];





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


//inquirer questions
const menu = [{
    type: "list",
    name: "menu",
    message: "You may choose:",
    choices: ["VIEW ALL DEPTS", "VIEW ALL ROLES", "VIEW ALL EMPLOYEES","ADD DEPARTMENT",
        "ADD A ROLE", "ADD AN EMPLOYEE", "UPDATE EMPLOYEE ROLE", "Finish!"]
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
        type: 'list',
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
        type: 'list',
        name: 'employeeRole',
        message: 'What role does this employee have?',
        choices: allRoles
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: "Who is this employee's manager?",
        choices: allManagers
    }
];


const updateEmployeeQ= [{

    type: 'list',
    name: 'empName',
    message: 'What employee would you like to update?',
    choices: allEmployees
},
{

    type: 'list',
    name: 'empRole',
    message: 'What is the new role?',
    choices: allRoles
}];


// fillAll functions fill the arrays at the beginning with necessary info
 async function fillAllRoles() {

   let rolez =  await getTitles();
//    console.log(rolez);
    
    for(i=0; i < rolez.length; i++){
       
         allRolesID.push(rolez[i]);
        allRoles.push(rolez[i].title);

    }
   
};

async function fillAllEmps() {
    let emps = await getEmpNames();

    for (i=0; i<emps.length; i++){
         allEmpID.push(emps[i]);
        allEmployees.push(emps[i].name);

    }

};


async function fillAllDepts() {

    let depts = await getDepts();
    // console.log(depts);

    for(i=0; i<depts.length; i++){

        allDeptsID.push(depts[i]);
        allDepts.push(depts[i].department_name);
    }

};

async function fillAllManagers() {

    let mgrs = await getManagers();

    for(i=0; i<mgrs.length; i++){

         allManagersID.push(mgrs[i]);
        allManagers.push(mgrs[i].managers);
    }
 
};


function init(){
    fillAllDepts();
    fillAllRoles();
    fillAllEmps();    
    fillAllManagers();

//    console.log(allRolesID);

    // getTitles();
    
    // console.log(allDepts);
    // console.log(allEmployees);
    // console.log(allManagers);
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

                // deptID = viewIDbyDeptName(data.roleDept);

                for(i=0; i<allDeptsID.length; i++){

                    if(data.roleDept === allDeptsID[i].department_name){

                        const deptID = allDeptsID[i].id;

                     addRole(data.title, data.roleSalary, deptID);
                    
                    };
                   
                };
               
                
            });
            fillAllRoles();
        promptMenu();

    } else if (answer === "ADD AN EMPLOYEE") {
        await inquirer.prompt(addEmployeeQ)
            .then((data) => {

                let roleID;

                for (i=0; i<allRolesID.length; i++){

                    if(data.employeeRole === allRolesID[i].title){

                        roleID = allRolesID[i].id;
                       
                    }
                    
                }

                for (i=0; i<allManagersID.length; i++){

                    if(data.employeeManager === allManagersID[i].managers){

                       const manID = allManagersID[i].id

                       addEmployee(data.employeeFirst, data.employeeLast, roleID, manID);
                    }
                }         
                
            });

            fillAllEmps();
            fillAllManagers();
        promptMenu();

    } else if (answer === "ADD DEPARTMENT") {


        await inquirer.prompt(addDeptQ)
            .then((data) => {
                addDept(data.deptName); 

            });

            fillAllDepts();
        promptMenu();

    } else if (answer === "UPDATE EMPLOYEE ROLE") {

        await inquirer.prompt(updateEmployeeQ)
            .then((data) => {
                let jobID;

                for (i=0; i<allRolesID.length; i++){

                    if(data.empRole === allRolesID[i].title){

                        jobID = allRolesID[i].id
                     
                    };
                };

                for (i=0; i<allEmpID.length; i++){

                    if(data.empName === allEmpID[i].name )
                    {

                        const empID = allEmpID[i].id
                       updateEmployee(empID, jobID );
                    };
                };
               

            });


        promptMenu();

    } else if (answer === "Finish!") {

        //exit application       
            db.end();
            console.log('Thank you, Good-bye!');
        }
       //return;
    };

    init();

// department functions 
async function viewIDbyDeptName(dept_name){
    return new Promise ((resolve, reject) =>{
    db.query(`SELECT id FROM department WHERE department_name = ?`, dept_name, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
    });
  };
  
    async function viewWholeDept (){
        return new Promise ((resolve, reject) =>{
        db.query(`SELECT * FROM department`,  (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(console.table(result));
         
        });
      }); 
     };

     async function getDepts(){
        return new Promise ((resolve, reject) =>{
        db.query(`SELECT id, department_name FROM department`, (err, result) => {
      
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });
      };

      async function addDept (deptName) {
        return new Promise ((resolve, reject) =>{
        db.query(`INSERT INTO department(department_name)
        VALUES("${deptName}")`, (err, result) => {
          if (err) {
            reject(err);
          }
         resolve(result);
        });
      });
      };

//role functions
async function viewRoleWhole () {
    return new Promise ((resolve, reject) =>{
    db.query(`select role.id, title, salary, department_name from role 
    left join department on role.department_id=department.id;`, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(console.table(result));
    });
  });
  };

  
async function addRole (title, salary, dept_id) {
    return new Promise ((resolve, reject) =>{
    db.query(`INSERT INTO role(title, salary, department_id)
    VALUES("${title}", ${salary}, ${dept_id})`, (err, result) => {
      if (err) {
        reject(err);
      }
     resolve(result);
    });
  });
  };
  
  
  async function getTitles(){
    return new Promise ((resolve, reject) =>{
    db.query(`SELECT id, title FROM role`, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
  ;
  };

  //employee functions
  async function viewEmployeeWhole() {

    const query = `select concat(employee1.first_name, " ", employee1.last_name) as manager,
    concat(employee2.first_name, " ", employee2.last_name) as 'employees',
    role.title, role.salary, department.department_name from employee as employee1
    right outer join employee as employee2  on employee2.manager_id = employee1.id
    inner join role on employee2.job_id = role.id
    inner join department on role.department_id = department.id;`
  
    return new Promise ((resolve, reject) =>{
    db.query(query, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(console.table(result));
    });
  });
  };

  async function addEmployee(first_name, last_name, role_id, manager_id) {
    return new Promise ((resolve, reject) =>{
    db.query(`INSERT INTO employee(first_name, last_name, job_id, manager_id)
  VALUES("${first_name}", "${last_name}", ${role_id}, ${manager_id})`, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
  };
  
  async function getManagers() {
    return new Promise ((resolve, reject) =>{
    db.query(`SELECT id, CONCAT(first_name, " ",last_name) AS managers FROM employee WHERE manager_id is NULL`, (err, result) => {
  
      if (err) {
        reject(err);
      }
      resolve (result);
    });
  });
  };
  
  
  async function getEmpNames(){
    return new Promise ((resolve, reject) =>{
    db.query(`SELECT id, CONCAT(first_name, " ",last_name) AS name FROM employee`,
    (err, result) => {
    if (err) {
      reject(err);
    }
  
  resolve(result);
    // console.table(result);
  });
    });
  };
  
  async function updateEmployee(id, job) {
    return new Promise ((resolve, reject) =>{
    db.query(`UPDATE employee
    SET job_id = ${job}
    WHERE id = ${id}`, (err, result) => {
  
      if (err) {
        reject(err);
      }
      resolve(result);
    });
    });
  };