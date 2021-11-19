const cTable = require('console.table');
const mysql = require('mysql2');
require('dotenv').config();


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


// class role  {
//     constructor(id, title, salary, dept_id) {
//       this.id = id;
//       this.title = title;
//       this.salary = salary;
//       this.dept_id = dept_id;
    
//     };

async function viewRoleWhole () {
  await new Promise ((resolve, reject) =>{
  db.query(`select role.id, title, salary, department_name from role 
  left join department on role.department_id=department.id;`, (err, result) => {
    if (err) {
      reject(err);
    }
    resolve(console.table(result));
  });
});
};

// function viewRoleByID (id){

//   db.query(`'SELECT * FROM role WHERE id = ${id}`, (err, result) => {

//     if (err) {
//       console.log(err);
//     }
//     console.table(result);
//   });

// };



async function addRole (title, salary, dept_id) {
  await new Promise ((resolve, reject) =>{
  db.query(`INSERT INTO role(title, salary, dept_id)
  VALUES(${title}, ${salary}, ${dept_id})`, (err, result) => {
    if (err) {
      reject(err);
    }
   resolve(console.table(result));
  });
});
};


async function getTitles(){
  await new Promise ((resolve, reject) =>{
  db.query(`SELECT id, title FROM role`, (err, result) => {
    if (err) {
      reject(err);
    }
    resolve(result);
  });
});
};



  
  module.exports = {viewRoleWhole, addRole, getTitles};