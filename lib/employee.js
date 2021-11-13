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



class employee extends role {
    constructor(id, first_name, last_name, role_id, manager_id) 
    {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.role_id = role_id;
      this.manager_id = manager_id;
          
    };

viewWhole (){


    db.query(`SELECT * FROM employee`, function (err, result){
        if (err) {
          console.log(err);
        }
        console.table(result);
      });
          
    };

 viewByID (id){
  db.query(`'SELECT * FROM employee WHERE id = ${id}`, (err, result) => {

    if (err) {
      console.log(err);
    }
    console.table(result);
  });

};



 viewByDeptName (deptName) {

  db.query(`'SELECT * FROM employee 
JOIN role ON employee.role_id = role.id;`, (err, result) => {

    if (err) {
      console.log(err);
    }
    console.table(result);
  });



};


addEmployee(first_name, last_name, role_id, manager_id){

db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES(${first_name}, ${last_name}, ${role_id}, ${manager_id})`, (err, result) => {
  if (err) {
    console.log(err);
  }
 console.table(result);
});


  };

getManagers(){

  db.query(`'SELECT first_name, last_name FROM employee WHERE id = NULL`, (err, result) => {

    if (err) {
      console.log(err);
    }
    console.table(result);
  });
}

};



  
  module.exports = employee;