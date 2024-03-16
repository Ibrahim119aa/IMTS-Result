
const p=require('../configuration/database');

class Result
{

  static async Add(rollno, Name, course, PercentageOfFirstYear, SessionOfFirstYear,  YearOfFirstYear,PercentageOfSecondYear,SessionOfSecondYear,YearOfSecondYear) {
    try {
        await p.query(
            "INSERT INTO results(rollno, name, course, percentageoffirstyear, sessionoffirstyear, yearoffirstyear, percentageofsecondyear, sessionofsecondyear, yearofsecondyear) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [rollno, Name, course, PercentageOfFirstYear, SessionOfFirstYear, YearOfFirstYear, PercentageOfSecondYear, SessionOfSecondYear, YearOfSecondYear]
        );

        return { Status: true };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

static async getResult() {
    let a=await p.query("SELECT t1.rollno,t1.name AS Name,t2.coursename AS course,t1.percentageoffirstyear as PercentageOfFirstYear,t1.percentageofsecondyear as PercentageOfSecondYear,t1.id FROM results t1 JOIN course t2 ON t1.course=t2.id");

    return a.rows;

}

static async DeleteResultByCourse(id)
{
  let a=await p.query("delete from results where course='"+id+"'");

  return {Status:true};
  
}

    static async DeleteResult(id)
    {
       let a=await p.query("delete from results where id='"+id+"'");


        return {Status:true};

        

    }
    static async getStudentBYRollNo(rollno)
    {
      const response=table.findOne(
        {
          rollno:rollno
        }
      );
      return response;
      
    }
    static async getParticularResult(id) {
      
      let a=(await p.query("select * from results where id='"+id+"'")).rows;

      return a;


      }
      static async UpdateParticlarResult(id,Name,rollno,course,percentagefirstyear,sessionfirstyear,yearfirstyear,percentagesecondyear,sessionsecondyear,yearsecondyear)
      {
      
        let a=await p.query("update results set rollno='"+rollno+"',name='"+Name+"',course='"+course+"',percentageoffirstyear='"+percentagefirstyear+"',sessionoffirstyear='"+sessionfirstyear+"',yearoffirstyear='"+yearfirstyear+"',percentageofsecondyear='"+percentagesecondyear+"',sessionofsecondyear='"+sessionsecondyear+"',yearofsecondyear='"+yearsecondyear+"' where id='"+id+"'");

        return {Status:true};
        


    


      }

      // static async getResultByRollNo(Id) {
      //   const r = await table.findOne({
      //     rollno: Id
      //   });
      
      //   let percentagefirstyear=r.PercentageOfFirstYear;
      //   let percentagesecondyear=r.PercentageOfSecondYear;
      //   let course=r.course;

      //   const s=await secondarytable.find(
      //     {
      //       duration:"1",
      //       coursetype:course
      //     }
      //   );
      //   const subjectArr=[];
      //   const marksArr=[];
      //   s.forEach(item=>
      //     {
      //         subjectArr.push(item.subject);
      //         marksArr.push(Math.floor(Math.random() * (percentagefirstyear - 50 + 1)) + 50);
      //     });

       
      // let a={
      //   percentagefirstyear:percentagefirstyear,
      //   percentagesecondyear:percentagesecondyear,
      //   subject :subjectArr,
      //   marks:marksArr 
       
      // };
      //   return a;

      // }

      static async getResultByRollNo(Id) {
        const r = (await p.query("select * from results where rollno='"+Id+"'")).rows;


        if(r.length>0)
        {
          let percentagefirstyear=r[0].percentageoffirstyear;
          let percentagesecondyear=r[0].percentageofsecondyear;
          let course=r[0].course;
  
         
          const s=(await p.query("select * from subject  where coursetype='"+course+"' and duration='1'")).rows;

          const subjectArr=[];
          const marksArr=[];
          s.forEach(item=>
            {
                subjectArr.push(item.subject);
                marksArr.push(Math.floor(Math.random() * (percentagefirstyear - 50 + 1)) + 50);
            });
  
         
        let a={
          percentagefirstyear:percentagefirstyear,
          percentagesecondyear:percentagesecondyear,
          subject :subjectArr,
          marks:marksArr 
         
        };
        return a;
        }
      }
       

}
module.exports=Result;
