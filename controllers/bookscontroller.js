;
const p=require('../configuration/database');

class Books
{

    static async Add(coursetype,specialization,title,url)
    {
      let a=await p.query("INSERT INTO book(coursetype, specialization, title, url)VALUES ('"+coursetype+"','"+specialization+"','"+title+"','"+url+"')");

return {Status:true};

    }
   
    static async getBooks(p1, s) {
      try {
          const page = parseInt(p1);
          const size = parseInt(s);
  
          const offset = (page - 1) * size;
  
          const totalQuery = await p.query('SELECT COUNT(*) FROM book');
          const total = parseInt(totalQuery.rows[0].count);
  
          const usersQuery = await p.query('SELECT t1.id,  t1.title, t1.url,t2.specialization AS specialization, t3.coursename AS coursetype  FROM book t1 JOIN specializations t2 ON t1.specialization = t2.id JOIN course t3 ON t1.coursetype = t3.id LIMIT $1 OFFSET $2', [size, offset]);
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


//   static async getBooksbyTitle(title,p1, s) {
//     try {
//         const page = parseInt(p1);
//         const size = parseInt(s);

//         const offset = (page - 1) * size;

//         const totalQuery = await p.query('SELECT COUNT(*) FROM book');
//         const total = parseInt(totalQuery.rows[0].count);

//         const usersQuery = await p.query('SELECT t1.id,  t1.title, t1.url,t2.specialization AS specialization, t3.coursename AS coursetype  FROM book t1 JOIN specializations t2 ON t1.specialization = t2.id JOIN course t3 ON t1.coursetype = t3.id where title=$3  LIMIT $1 OFFSET $2', [size, offset,title]);
//         const users = usersQuery.rows;

//         return {
//             records: users,
//             total,
//             page,
//             size
//         };
//     } catch (error) {
//         console.error(error);
//         return error;
//     }
// }



    static async DeleteBook(id)
    {
       let a=await p.query("delete from book where id='"+id+"'");


        return {Status:true};
        

    }
    static async DeleteBookByCourseId(id)
    {
       let a=await p.query("delete from book where coursetype='"+id+"'");


        return {Status:true};
        

    }


    static async getParticularBook(id) {
     
 
      let result=await p.query("select * from book where id='"+id+"'");

      return result.rows;
  }
  
      static async UpdateParticlarBook(id,coursetype,specialization,title,url)
      {

      
      let a=await p.query("update book set coursetype='"+coursetype+"',specialization='"+specialization+"',title='"+title+"',url='"+url+"' where id='"+id+"'");


    return {Status:true};
    


      }
}
module.exports=Books;
