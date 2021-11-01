const cTable = require('console.table');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user:  process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASSWORD,
    database:  process.env.DB_NAME
  },
  console.log(`Connected to the company_db database.`)
);


class deptartment {
    constructor(id, name) {
      this.id = id;
      this.deptName = deptName;
    
    };

    viewWhole (){

      db.query(`SELECT * FROM department`, function (err, rows){
       if (err) {
         console.log(err);
       }
       console.table(rows);
     });
         
   };
   

 viewByID (id){


};



 pullAllDeptName () {

  db.query(`SELECT name FROM department`, async (err, rows) => {
    if (err) {
      console.log(err);
    }
   await console.table(rows);
  });


};


  };


deptartment.viewWhole()

  
  module.exports = department;