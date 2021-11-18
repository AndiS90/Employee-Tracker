const cTable = require('console.table');
const mysql = require('mysql2');



// class department {
//     constructor(id, deptName) {
//       this.id = id;
//       this.deptName = deptName;
    
//     };

function viewIDbyDeptName(dept_name){
  db.query(`SELECT id FROM department WHERE department_name = ?`, dept_name, (err, result) => {
    if (err) {
      console.log(err);
    }
    return result;
  });


}

   function viewWholeDept (){

      db.query(`SELECT * FROM department`,  (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
        return result;
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


function addDept (deptName) {

  db.query(`INSERT INTO department(deptartment_name)
  VALUES(${deptName})`, (err, result) => {
    if (err) {
      console.log(err);
    }
   console.table(result);
  });
};

function getDepts(){
  db.query(`SELECT id, department_name FROM department`, (err, result) => {

    if (err) {
      console.log(err);
    }
    return result;
  });
}


module.exports = {viewIDbyDeptName, viewWholeDept, addDept, getDepts};