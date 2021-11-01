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



class role extends department {
    constructor(id, title, salary, dept_id) {
      this.id = id;
      this.title = title;
      this.salary = salary;
      this.dept_id = dept_id;
    
    };

viewWhole (){

  db.query(`SELECT * FROM department`, async (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
  });
      
};

async viewByID (id){


};



async  viewByDeptName (deptName) {




};


  };




  
  module.exports = role;