
const p=require('../configuration/database');
const studentController=require('../controllers/studentController');

class Session
{

    static async Add(session,year,serial)
    {

      let a=await p.query("INSERT INTO session(session, year, serial)VALUES ('"+session+"','"+year+"','"+serial+"')");


return {Status:true};


    }


    static async getSession()
    {
        const r=(await p.query("select * from session")).rows

        return r;

    }
    static async DeleteSession(id)
    {
        await studentController.DeleteStudentBySession(id);

        let a=await p.query("delete from session where id='"+id+"'");

        return {Status:true};

        

    }


    static async getParticularSession(id) {
        
      let a=(await p.query("select * from session where id='"+id+"'")).rows;

      return a;

      }

      static async UpdateParticlarSession(id,session,year,serial)
      {
      
let a=await p.query("update session set session='"+session+"',year='"+year+"',serial='"+serial+"' where id='"+id+"'");
    return {Status:true};
    


      }
}
module.exports=Session;
