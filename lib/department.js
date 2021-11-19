const cTable = require('console.table');
const mysql = require('mysql2');
require('dotenv').config();

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

// class department {
//     constructor(id, deptName) {
//       this.id = id;
//       this.deptName = deptName;
    
//     };

async function viewIDbyDeptName(dept_name){
  await new Promise ((resolve, reject) =>{
  db.query(`SELECT id FROM department WHERE department_name = ?`, dept_name, (err, result) => {
    if (err) {
      reject(err);
    }
    resolve(result);
  });
  });
};

  async function viewWholeDept (){
    await new Promise ((resolve, reject) =>{
      db.query(`SELECT * FROM department`,  (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(console.table(result));
       
      });
    }); 
   };
   

//    function viewDeptByID (id){
// db.query(`'SELECT * FROM department WHERE id = ${id}`, (err, result) => {

//   if (err) {
//     console.log(err);
//   }
//   console.table(result);
// });
// };
// Connect to database



async function addDept (deptName) {
  await new Promise ((resolve, reject) =>{
  db.query(`INSERT INTO department(deptartment_name)
  VALUES(${deptName})`, (err, result) => {
    if (err) {
      reject(err);
    }
   resolve(console.table(result));
  });
});
};

async function getDepts(){
  await new Promise ((resolve, reject) =>{
  db.query(`SELECT id, department_name FROM department`, (err, result) => {

    if (err) {
      reject(err);
    }
    resolve(console.log(result));
  });
});
}

getDepts();

module.exports = {viewIDbyDeptName, viewWholeDept, addDept, getDepts};