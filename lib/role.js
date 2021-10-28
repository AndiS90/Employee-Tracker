const cTable = require('console.table');



class role {
    constructor(id, title, salary, dept_id) {
      this.id = id;
      this.title = title;
      this.salary = salary;
      this.dept_id = dept_id;
    
    };

async viewWhole (){

   db.query(`SELECT * FROM department`, await (err, rows) => {
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




  
  module.exports = department;