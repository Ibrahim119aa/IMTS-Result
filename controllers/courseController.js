

const p=require('../configuration/database');

const studentController=require('../controllers/studentController');
const specializationController=require('../controllers/specializationController');
const subjectController=require('../controllers/subjectcontroller');
const bookscontroller=require('../controllers/bookscontroller');
const result=require('../controllers/resultcontroller');




class Course
{

    static async Add(university,coursetype,coursename,coursedescription,coursecode,sequence,duration,semester)
    {


      let a=await p.query("INSERT INTO course(university, coursetype, coursename, coursedescription, coursecode, sequence, duration, semester)VALUES ('"+university+"','"+coursetype+"','"+coursename+"','"+coursedescription+"','"+coursecode+"','"+sequence+"','"+duration+"','"+semester+"')");
      return {Status:true};

    }

    static async getCourses()
    {
const r=(await p.query("select * from course")).rows;

return r;
    }


    static async DeleteCourse(id)
    {
      await studentController.DeleteExamByCourse(id);
      
      await result.DeleteResultByCourse(id);

      await bookscontroller.DeleteBookByCourseId(id);

        await studentController.DeleteStudentByCourse(id);
        await subjectController.DeleteSubjectByCourse(id);
        await specializationController.DeleteSpecializationbyCourse(id);


        let a=await p.query("delete from course where id='"+id+"'");

        return {Status:true};

        

    }
    static async DeleteCourseByUniversity(ID)
    {
      let a1=(await p.query("select * from course where university='"+ID+"'")).rows;
        if(a1.length>0)
        {
          let I=a1[0].id;
      await studentController.DeleteStudentByCourse(I);
        await specializationController.DeleteSpecializationbyCourse(I);
await subjectController.DeleteSubjectByCourse(I);
        let a=await p.query("delete from course where university='"+ID+"'");
        }

        return {Status:true};
        
        

    }
    static async getParticularCourse(id) {
        let a=await p.query("select * from course where id='"+id+"'");

        return a.rows;

      }
      static async UpdateParticlarCourse(id,university,coursetype,coursename,coursedescription,coursecode,sequence,duration,semester)
      {
    let a=await p.query("update course set university='"+university+"',coursetype='"+coursetype+"',coursename='"+coursename+"',coursedescription='"+coursedescription+"',coursecode='"+coursecode+"',sequence='"+sequence+"',duration='"+duration+"',semester='"+semester+"'");

    return {Status:true};



      }
      static async getCourseName(university)
      {
        

        let d=await p.query("select * from course where university='"+university+"'")
        return d.rows;

      }
      static async getCourseDetail(type)
      {
        let r=(await p.query("select t1.id as _id , t1.coursetype ,t2.name as university from course t1 join university t2 on t1.university=t2.id")).rows

         return r;

         
      }
      static async getTotalCourse()
      {
        let t=(await p.query("select count(*) as total from course")).rows

        return t[0].total;
        
      }
}
module.exports=Course;
