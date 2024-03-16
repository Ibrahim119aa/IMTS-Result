
const p=require('../configuration/database');

class Student
{

    static async Add(rollno,Name,fathername,DOB,mobile,Email,course,specialization,exam,image,session)
    {


    let a=await p.query("INSERT INTO student( rollno, name, fathername, dob, mobile, email, course, specialization, exam, image, session) VALUES ('"+rollno+"','"+Name+"','"+fathername+"','"+DOB+"','"+mobile+"','"+Email+"','"+course+"','"+specialization+"','"+exam+"','"+image+"','"+session+"')");

return {Status:true};

    }

    static async addExam(rollno,courename,studentname,comments)
    {
      let a=await p.query("INSERT INTO examination( rollno, coursetype, studentname, comments) VALUES ('"+rollno+"','"+courename+"','"+studentname+"','"+comments+"')");
       return {Status:true};

      
    }
    static async DeleteExamByCourse(id)
    {
      let a=await p.query("delete from examination where coursetype='"+id+"'");
      return {Status:true};

    }


    static async addfeedback(ptype,message,studentname)
    {
      let a=await p.query("INSERT INTO feedback( rollno, ftype, message) VALUES ('"+studentname+"','"+ptype+"','"+message+"')");

      return {Status:true};

      
    }
    static async getStudent(p1, s) {
      try {
          const page = parseInt(p1);
          const size = parseInt(s);
  
          const offset = (page - 1) * size;
  
          const totalQuery = await p.query('SELECT COUNT(*) FROM student');
          const total = parseInt(totalQuery.rows[0].count);
  
          const usersQuery = await p.query('SELECT t1.id AS _id,t1.rollno,t1.name AS Name,t1.fathername,t1.dob as DOB,t1.mobile,t1.email AS Email,t2.coursename AS course,t3.specialization,t1.exam FROM student t1 JOIN course t2 ON t1.course=t2.id JOIN specializations t3 ON t1.specialization=t3.id LIMIT $1 OFFSET $2', [size, offset]);
          const users = usersQuery.rows;
  
          return {
              records: users,
              total,
              page,
              size
          };
      } catch (error) {
          console.error(error);
          return error;
      }
  }
  
    static async DeleteStudent(id)
    {
      let a=await p.query("delete from student where id='"+id+"'");

      return {Status:true}
        

    }
    static async DeleteStudentBySpecialization(id)
    {
      let a=await p.query("delete from student where specialization='"+id+"'");

      return {Status:true};

    }
    static async DeleteStudentByCourse(id)
    {
      let a=await p.query("delete from student where course='"+id+"'");

      return {Status:true};
      
    }
    static async DeleteStudentBySession(id)
    {
      let a=await p.query("delete from student where session='"+id+"'");

      return {Status:true};
      
    }
   
    static async getParticularStudent(id) {
       let a=(await p.query("select * from student where id='"+id+"'")).rows;


       return a;

      }
      static async UpdateParticlarStudent(id,rollno,Name,fathername,DOB,mobile,Email,course,specialization,exam)
      {

        let a=await p.query("update student set rollno='"+rollno+"',name='"+Name+"',fathername='"+fathername+"',dob='"+DOB+"',mobile='"+mobile+"',email='"+Email+"',course='"+course+"',specialization='"+specialization+"',exam='"+exam+"'");

        return {Status:true};

      }
      static async getStudentBYRollNoLogin(id)
      {
        let a=(await p.query("select * from student where rollno='"+id+"'")).rows;
        return a[0];

      }

      static async getStudentBYRollNo1(id)
      {
        let a=(await p.query("select * from student where rollno='"+id+"'")).rows;

        return a[0];


      }

      static async getStudentByRollNo(rollno, p, s) {
        let users = {};
    
        try {
            const page = parseInt(p);
            const size = parseInt(s);
    
            const offset = (page - 1) * size;
    
            let query = '';
            let queryParams = [];
    
            if (rollno.length === 0) {
                query = 'SELECT * FROM student OFFSET $1 LIMIT $2';
                queryParams = [offset, size];
            } else {
                query = 'SELECT * FROM student WHERE rollno = $1 OFFSET $2 LIMIT $3';
                queryParams = [rollno, offset, size];
            }
    
            const totalQuery = 'SELECT COUNT(*) AS total FROM student';
            const { rows: totalRows } = await p.query(totalQuery);
            const total = totalRows[0].total;
    
            const { rows } = await p.query(query, queryParams);
    
            return {
                records: rows,
                total,
                page,
                size
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
        
    static async getStudentByEmail(email, p, s) {
      let users = {};
  
      try {
          const page = parseInt(p);
          const size = parseInt(s);
  
          const offset = (page - 1) * size;
  
          let query = '';
          let queryParams = [];
  
          if (email.length === 0) {
              query = 'SELECT * FROM student OFFSET $1 LIMIT $2';
              queryParams = [offset, size];
          } else {
              query = 'SELECT * FROM student WHERE UPPER(email) = UPPER($1) OFFSET $2 LIMIT $3';
              queryParams = [email, offset, size];
          }
  
          const totalQuery = 'SELECT COUNT(*) AS total FROM student';
          const { rows: totalRows } = await p.query(totalQuery);
          const total = totalRows[0].total;
  
          const { rows } = await p.query(query, queryParams);
  
          return {
              records: rows,
              total,
              page,
              size
          };
      } catch (error) {
          console.log(error);
          throw error;
      }
  }
  

  static async getStudentByDOB(D, p, s) {
    let users = {};

    try {
        const page = parseInt(p);
        const size = parseInt(s);

        const offset = (page - 1) * size;

        let query = '';
        let queryParams = [];

        if (D.length === 0) {
            query = 'SELECT * FROM student OFFSET $1 LIMIT $2';
            queryParams = [offset, size];
        } else {
            query = 'SELECT * FROM student WHERE DOB = $1 OFFSET $2 LIMIT $3';
            queryParams = [D, offset, size];
        }

        const totalQuery = 'SELECT COUNT(*) AS total FROM student';
        const { rows: totalRows } = await p.query(totalQuery);
        const total = totalRows[0].total;

        const { rows } = await p.query(query, queryParams);

        return {
            records: rows,
            total,
            page,
            size
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}


    static async getStudentByEn(rollno)
    {
      const response=(await p.query("select * from student where rollno='"+rollno+"'")).rows;

      return response;
      
    }
    

    static async getTotalStudent() {
      try {
          const query = 'SELECT COUNT(*) AS total FROM student';
          const { rows } = await p.query(query);
          const total = rows[0].total;
  

          return total;
      } catch (error) {
          console.log(error);
          throw error;
      }
  }
  
    static async getBBAStudent()
    {
      let a=(await p.query("SELECT COUNT(*) AS total FROM student t1 JOIN course t2 ON t1.course=t2.id where t2.coursename='B.B.A'")).rows;

      

      return a[0].total;


    }

    static async getAdvanceCertificateStudent()
    {
      let a=(await p.query("SELECT COUNT(*) AS total FROM student t1 JOIN course t2 ON t1.course=t2.id where t2.coursename='Advance Certificate'")).rows;

      

      return a[0].total;


    }

    static async getDBAStudent()
    {
      let a=(await p.query("SELECT COUNT(*) AS total FROM student t1 JOIN course t2 ON t1.course=t2.id where t2.coursename='D.B.A'")).rows;

      

      return a[0].total;


    }

   
    static async getMBAStudent()
    {
      let a=(await p.query("SELECT COUNT(*) AS total FROM student t1 JOIN course t2 ON t1.course=t2.id where t2.coursename='M.B.A'")).rows;

      

      return a[0].total;


    }

    static async getDualMBAStudent()
    {
      let a=(await p.query("SELECT COUNT(*) AS total FROM student t1 JOIN course t2 ON t1.course=t2.id where t2.coursename='MBA-DUAL'")).rows;

      

      return a[0].total;


    }
    


}
module.exports=Student;
