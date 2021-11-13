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

  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
  });
      
};

 viewByID (id){

  db.query(`'SELECT * FROM role WHERE id = ${id}`, (err, result) => {

    if (err) {
      console.log(err);
    }
    console.table(result);
  });

};



 addRole (title, salary, dept_id) {

  db.query(`INSERT INTO role(title, salary, dept_id)
  VALUES(${title}, ${salary}, ${dept_id})`, (err, result) => {
    if (err) {
      console.log(err);
    }
   console.table(result);
  });
  
};


getTitles(){

  db.query(`SELECT title FROM role`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
  });
  
}

  };




  
  module.exports = role;