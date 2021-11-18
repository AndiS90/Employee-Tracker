const cTable = require('console.table');
const mysql = require('mysql2');



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


// class employee  {
//     constructor(id, first_name, last_name, role_id, manager_id)
//     {
//       this.id = id;
//       this.first_name = first_name;
//       this.last_name = last_name;
//       this.role_id = role_id;
//       this.manager_id = manager_id;

//     };

function viewEmployeeWhole() {

  const query = `select concat(employee1.first_name, " ", employee1.last_name) as manager,
  concat(employee2.first_name, " ", employee2.last_name) as 'employees',
  role.title, role.salary, department.department_name from employee as employee1
  right outer join employee as employee2  on employee2.manager_id = employee1.id
  inner join role on employee2.job_id = role.id
  inner join department on role.department_id = department.id;`


  db.query(query, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.table(result);
  });
};

// function viewEmployeeByID(id) {
//   db.query(`'SELECT * FROM employee WHERE id = ${id}`, (err, result) => {

//     if (err) {
//       console.log(err);
//     }
//     console.table(result);
//   });
// };



function viewEmployeeByDeptName(deptName) {

  db.query(`'SELECT * FROM employee
JOIN role ON employee.role_id = role.id;`, (err, result) => {

    if (err) {
      console.log(err);
    }
    console.table(result);
  });
};


function addEmployee(first_name, last_name, role_id, manager_id) {

  db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES(${first_name}, ${last_name}, ${role_id}, ${manager_id})`, (err, result) => {
    if (err) {
      console.log(err);
    }
    return result;
  });
};

function getManagers() {

  db.query(`SELECT id, CONCAT(first_name, " ",last_name) AS managers FROM employee WHERE manager_id is NULL`, (err, result) => {

    if (err) {
      console.log(err);
    }
    return result;
  });
};


function getEmpNames(){

  db.query(`SELECT id, CONCAT(first_name, " ",last_name) AS name FROM employee`,
  (err, result) => {
  if (err) {
    console.log(err);
  }

return result;
  // console.table(result);
}
);
};

function updateEmployee(id, job) {
  db.query(`UPDATE employee
  SET job_id = ${job}
  WHERE id = ${id}`, (err, result) => {

    if (err) {
      console.log(err);
    }
    console.table(result);
  });


}








module.exports = {viewEmployeeWhole,  addEmployee, getManagers, updateEmployee, getEmpNames};