
const p=require('../configuration/database');

class Subject
{

    static async Add(coursename,coursetype,specialization,duration,semester,subject,subjectcode)
    {

      
let a=await p.query("INSERT INTO subject(coursename, coursetype, specialization, duration, semester, subject, subjectcode) VALUES ('"+coursename+"','"+coursetype+"','"+specialization+"','"+duration+"','"+semester+"','"+subject+"','"+subjectcode+"')"); 


return {Status:true};

    }
    static async getSubject()
    {
   

      const r=await p.query("SELECT t1.id AS _id, t1.subject, t2.coursename   AS coursetype,t3.specialization ,t1.duration ,t1.semester ,t1.subjectcode  FROM subject t1 JOIN course t2 ON t1.coursetype = t2.id JOIN specializations t3 ON t1.specialization= t3.id")

      return r.rows;


    }
    static async DeleteSubject(id)
    {
       let a=await p.query("delete from subject where id='"+id+"'");
        return {Status:true};
        

    }

    static async DeleteSubjectByCourse(id)
    {
       let a=await p.query("delete from subject where coursetype='"+id+"'");
        return {Status:true};
        

    }
    
    static async DeleteSubjectBySpeciliazation(id)
    {
       let a=await p.query("delete from subject where specialization='"+id+"'");
        return {Status:true};
        

    }

    static async DeleteSubjectByUniversity(id)
    {
       let a=await p.query("delete from subject where coursename='"+id+"'");
        return {Status:true};
        

    }


    static async getParticularSubject(id) {
       let a=(await p.query("select * from subject where id='"+id+"'")).rows;

       return a;

      }
      static async UpdateParticlarSubject(id,coursename,coursetype,specialization,duration,semester,subject,subjectcode)
      {
       let a=await p.query("update subject set coursename='"+coursename+"',coursetype='"+coursetype+"',specialization='"+specialization+"',duration='"+duration+"',semester='"+semester+"',subject='"+subject+"',subjectcode='"+subjectcode+"' where id='"+id+"'");

      return {Status:true};
      
      }

      
}
module.exports=Subject;
