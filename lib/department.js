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


class department {
    constructor(id, deptName) {
      this.id = id;
      this.deptName = deptName;
    
    };

    viewWhole (){

      db.query(`SELECT * FROM department`,  (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
      });
         
   };
   

 viewByID (id){
db.query(`'SELECT * FROM department WHERE id = ${id}`, (err, result) => {

  if (err) {
    console.log(err);
  }
  console.table(result);
});



};



 addDept (deptName) {

  db.query(`INSERT INTO department(deptartment_name)
  VALUES(${deptName})`, (err, result) => {
    if (err) {
      console.log(err);
    }
   console.table(result);
  });
};

getDepts(){

  db.query(`'SELECT department_name FROM department`, (err, result) => {

    if (err) {
      console.log(err);
    }
    console.table(result);
  });
}

};


  };




  
  module.exports = department;