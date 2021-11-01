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



class employee {
    constructor(id, first_name, last_name, role_id, manager_id) 
    {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.role_id = role_id;
      this.manager_id = manager_id;
          
    };

viewWhole (){


    db.query(`SELECT * FROM department`, function (err, rows){
        if (err) {
          console.log(err);
        }
        console.table(rows);
      });
          
    };

async viewByID (id){


};



async  viewByDeptName (deptName) {




};


  };




  
  module.exports = employee;