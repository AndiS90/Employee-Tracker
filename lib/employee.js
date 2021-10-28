const cTable = require('console.table');



class employee {
    constructor(id, first_name, last_name, role_id, manager_id) 
    {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.role_id = role_id;
      this.manager_id = manager_id;
          
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




  
  module.exports = Employee;