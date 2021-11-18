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


// class role  {
//     constructor(id, title, salary, dept_id) {
//       this.id = id;
//       this.title = title;
//       this.salary = salary;
//       this.dept_id = dept_id;
    
//     };

function viewRoleWhole (){

  db.query(`select role.id, title, salary, department_name from role 
  left join department on department_id=department.id;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
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



function addRole (title, salary, dept_id) {

  db.query(`INSERT INTO role(title, salary, dept_id)
  VALUES(${title}, ${salary}, ${dept_id})`, (err, result) => {
    if (err) {
      console.log(err);
    }
   console.table(result);
  });
  
};


function getTitles(){

  db.query(`SELECT id, title FROM role`, (err, result) => {
    if (err) {
      console.log(err);
    }
    return result;
  });
  
};


getTitles();


  
  module.exports = {viewRoleWhole, addRole, getTitles};