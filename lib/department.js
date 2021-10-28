const cTable = require('console.table');



class deptartment {
    constructor(id, name) {
      this.id = id;
      this.deptName = deptName;
    
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