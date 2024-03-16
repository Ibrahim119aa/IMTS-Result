const express = require("express");
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const fs = require('fs');
const router = express.Router();
const studentController=require('../controllers/studentController');
const universitycontroller=require('../controllers/universityController');
const coursecontroller=require('../controllers/courseController');
const specializationcontroller=require('../controllers/specializationController');
const sessioncontroller=require('../controllers/sessionController');
const bookscontroller=require('../controllers/bookscontroller');
const resultcontroller=require('../controllers/resultcontroller');
const subjectcontroller=require('../controllers/subjectcontroller');



const requireLogin = (req, res, next) => {
  if (!req.session.username) {
    return  res.json({
      Status:false
    });
  }
  next();
};


router.post('/Admin-Login', express.json(), (req, res) => {
  const { username, password } = req.body;

  
    req.session.username = username;
  

    res.json(
      {
        Status: true
      }
    )
});

router.get("/get-BBA-Student",async(req,res)=>
{
  const r=await studentController.getBBAStudent();


  res.json(
{
  "Total":r
}
  );


});


router.get("/get-Advance-Certificate-Student",async(req,res)=>
{
  const r=await studentController.getAdvanceCertificateStudent();



  res.json(
{
  "Total":r
}
  );


});




router.get("/get-DBA-Student",async(req,res)=>
{
  const r=await studentController.getDBAStudent();



  res.json(
{
  "Total":r
}
  );


});



router.get("/get-MBA-Student",async(req,res)=>
{
  const r=await studentController.getMBAStudent();



  res.json(
{
  "Total":r
}
  );


});


router.get("/get-Dual-MBA-Student",async(req,res)=>
{
  const r=await studentController.getDualMBAStudent();



  res.json(
{
  "Total":r
}
  );


});

router.get("/get-Total-Course",async(req,res)=>
{
  const t=await coursecontroller.getTotalCourse();


  res.json(
    {
      "total":t
    }
  );
  
})
router.get("/get-Admin-Username",requireLogin,(req,res)=>
{
  res.json(
    {
    username:req.session.username}
    
  )
});



router.post('/get-Result-By-Roll-No',async(req,res)=>
{
  const {Id}=req.body;

  const result=await resultcontroller.getResultByRollNo(Id);
  const std=await studentController.getStudentBYRollNo1(Id);


  res.json(
    [
     {
      "Student":std,
      "Result":result
     }
    ]
  )
  ;

  

})
router.get('/dashboard', requireLogin, (req, res) => {
  res.json(
    {
      Status:true,
      username:req.session.username
    }
  );
});

router.post('/User-Login', express.json(), (req, res) => {
  const { username, password } = req.body;

  
 
  
    // req.session.username = username;

    const u=studentController.getStudentBYRollNoLogin(username);

    res.json(
      {
        Status:u
      }
    );
  
});


router.post('/logout', (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Your Successfully Logout');
    }
  });
});



router.get('/Check-Admin-Login', requireLogin, (req, res) => {
 
});




const storage = multer.diskStorage({
  destination:function(req,file,cb)
  {
    cb(null,'./Students');

  },
  filename:function(req,file,cb)
  {
    cb(null,file.originalname);


  }
});


const upload = multer({ storage: storage }).single('image');


router.post("/Add-Student", upload, async(req, res) => {
  
  const { image } = req.file;
  const { rollno,Name,fathername,DOB,mobile,Email,course,specialization,exam,session} = req.body;

  const r=await studentController.Add(rollno,Name,fathername,DOB,mobile,Email,course.toString(),specialization.toString(),exam.toString(),req.file.originalname,session.toString());



  res.json({
    Status:true
  });
});

router.post("/get-Course-Name",async(req,res)=>
{
  const {university}=req.body;

  const r=await coursecontroller.getCourseName(university);


  res.send(r)
  ;
})

router.post("/get-Specialization-Name",async(req,res)=>
{
  const {course}=req.body;

  const r=await specializationcontroller.getSpecializationByCourse(course);


  res.send(r)
  ;
});

router.post("/get-Course-Detail",async(req,res)=>
{
  const {course}=req.body;

  const r=await coursecontroller.getCourseDetail(course);

  res.send(r);
})






router.post("/Add-Result", async(req, res) => {
  
 
  const {id,Name,rollno,course, percentagefirstyear,sessionfirstyear,yearfirstyear,percentagesecondyear,sessionsecondyear,yearsecondyear} = req.body;

  const r=await resultcontroller.Add(rollno,Name,course,req.body.percentagefirstyear,req.body.sessionfirstyear,req.body.yearfirstyear,req.body.percentagesecondyear,req.body.yearsecondyear,req.body.sessionsecondyear);



  res.json({
    Status:true
  });
});



router.post("/Update-Particular-Student-Result", async(req, res) => {
  
 
  const { id,Name,rollno,course,percentagefirstyear,sessionfirstyear,yearfirstyear,percentagesecondyear,sessionsecondyear,yearsecondyear} = req.body;



  const r=await resultcontroller.UpdateParticlarResult(id,Name,rollno,course,percentagefirstyear,sessionfirstyear,yearfirstyear,percentagesecondyear,sessionsecondyear,yearsecondyear);



  res.json({
    Status:true
  });
});



router.post("/Add-Subject", async(req, res) => {
  
 
  const { coursename,coursetype,specialization,duration,semester,subject,subjectcode} = req.body;

  const r=await subjectcontroller.Add(coursename,coursetype,specialization,duration,semester,subject,subjectcode);



  res.json({
    Status:true
  });
});

router.get("/get-Particular-Student", async(req, res) => {
  const {Id} = req.query;

  const r=await studentController.getParticularStudent(Id);




 res.send(r);

});



router.get("/get-Particular-Subject", async(req, res) => {
  const {Id} = req.query;

  const r=await subjectcontroller.getParticularSubject(Id);




 res.send(r);

});


router.post("/Update-Particular-Subject", async(req, res) => {
  
 
  const { id,coursename,coursetype,specialization,duration,semester,subject,subjectcode} = req.body;


  
  const r=await subjectcontroller.UpdateParticlarSubject(id,coursename,coursetype,specialization,duration,semester,subject,subjectcode);



  res.json({
    Status:true
  });
});


router.post("/Add-Examination",async(req,res) => {
  const {rollno,coursetype,studentname,title}=req.body;


  const r=await studentController.addExam(rollno,coursetype,studentname,title);


  res.send(
    {
      Status:true
    }
  );
});

router.post("/Add-Feedback",async(req,res) => {
  const {ftype,username,message}=req.body;


  const r=await studentController.addfeedback(ftype,username,message);


  res.send(
    {
      Status:true
    }
  );
});



router.get("/get-Particular-Result", async(req, res) => {
  const {Id} = req.query;

  const r=await resultcontroller.getParticularResult(Id);




 res.send(r);

});


router.get("/get-Total-Student",async(req,res)=>
{
  let t=await studentController.getTotalStudent();


  res.json(
    {
     total:t
    }
  )
  
})

router.get("/Student-Login",async(req,res)=>
{
  const {rollno}=req.query;

  const student = await studentController.getStudentBYRollNoLogin(rollno);
  
if (student && typeof student === 'object' && Object.keys(student).length > 0) {
    req.session.username = rollno;
    res.send({
        Status: true
    });
} else {
    res.send({
        Status: false
    });
}



 




 


})


router.get("/get-Subject",async(req,res)=>
{
  const r=await subjectcontroller.getSubject();


  res.send(r);

})
router.get("/Get-Student-By-Roll-No",async(req,res)=>
{


  const r=await studentController.getStudentBYRollNo1(req.query.rollno);

  res.send(r);


})


router.get("/Get-University-By-Name",async(req,res)=>
{


  const r=await universitycontroller.getUniversityByName(req.query.name,req.query.page,req.query.limit);

  res.send(r);

 




})



router.get("/Get-Book-By-Name",async(req,res)=>
{


  const r=await universitycontroller.getUniversityByName(req.query.name,req.query.page,req.query.limit);

  res.send(r);

 




})


router.get("/Get-Student-By-Email",async(req,res)=>
{
  

  const r=await studentController.getStudentBYEmail(req.query.email,parseInt(req.query.page),parseInt(req.query.limit));


  res.send(r);


})

router.get("/Get-Student-By-DOB",async(req,res)=>
{
  

  const r=await studentController.getStudentBYDOB(req.query.DOB,parseInt(req.query.page),parseInt(req.query.limit));

  

  res.send(r);


})

router.get("/Get-Student-By-Enrollment-No",async(req,res)=>
{
  const {rollno}=req.query;

  const r=await studentController.getStudentByEn(rollno);

  res.json(r);


})

router.post("/Update-Particular-Student", async(req, res) => {
  const { id,rollno,Name,fathername,DOB,mobile,Email,course,specialization,exam} = req.body;


const r=await studentController.UpdateParticlarStudent(id,rollno,Name,fathername,DOB,mobile,Email,course,specialization,exam);


  res.json({
    Status:true
  });


 

});


router.post("/Update-Particular-Subject", async(req, res) => {
  const { id,coursename,coursetype,duration,semester,specialization,subject,subjectcode} = req.body;



const u={
  coursename:coursename,
  coursetype:coursetype,
  duration:duration,
  semester:semester,
  specialization:specialization,
  subject:subject,
  subjectcode:subjectcode
};
const r=await subjectcontroller.UpdateParticlarSubject(id,u);


  res.json({
    Status:true
  });


 

});


router.get("/get-Particular-University", async(req, res) => {
  const {Id} = req.query;

  const r=await universitycontroller.getParticularUniversity(Id);




 res.send(r);

});


router.post("/Update-Particular-University", async(req, res) => {
 

  
  const {id,Name,Code} = req.body;

  const r=await universitycontroller.UpdateParticlarUniversity(id,Name,Code)

  res.json({
    Status:true
  });
});



router.get("/get-Particular-Course", async(req, res) => {
  const {Id} = req.query;

  const r=await coursecontroller.getParticularCourse(Id);




 res.send(r);

});
router.get("/get-Particular-Specialization", async(req, res) => {
  const {Id} = req.query;

  const r=await specializationcontroller.getParticularSpecialization(Id)




 res.send(r);

});



router.get("/get-Particular-Session", async(req, res) => {
  const {Id} = req.query;

  const r=await sessioncontroller.getParticularSession(Id)




 res.send(r);

});



router.get("/get-Particular-Book", async(req, res) => {
  const {Id} = req.query;

  const r=await bookscontroller.getParticularBook(Id);





 res.send(r);

});

router.post("/Update-Particular-Book", async(req, res) => {
  const {id,coursetype,specialization,title,url} = req.body;


  const r=await bookscontroller.UpdateParticlarBook(id,coursetype,specialization,title,url);




  res.json({
    Status:true
  });
});
router.post("/Update-Particular-Course", async(req, res) => {
 

  
  const {id,university,coursetype,coursename,coursedescription,coursecode,sequence,duration,semester} = req.body;

 
  const r=await coursecontroller.UpdateParticlarCourse(id,university,coursetype,coursename,coursedescription,coursecode,sequence,duration,semester);



  res.json({
    Status:true
  });


});



router.post("/Update-Particular-Session", async(req, res) => {
  const { id,session,year,serial} = req.body;




const r=await sessioncontroller.UpdateParticlarSession(id,session,year,serial)


  res.json({
    Status:true
  });
});


router.post("/Update-Particular-Specialization", async(req, res) => {
 

  
  const {id,university,coursetype,specialization,specializationcode,coursefee,registrationfee,examfee} = req.body;

 

  const r=await specializationcontroller.UpdateParticlarSpecialization(id,university,coursetype,specialization,specializationcode,coursefee,registrationfee,examfee);



  res.json({
    Status:true
  });


});



router.get("/Delete-Student", async(req, res) => {
  const {Id} = req.query;

  const r=await studentController.DeleteStudent(Id);




  res.json({
    Status:true
  });
});


router.get("/Delete-Subject", async(req, res) => {
  const {Id} = req.query;

  const r=await subjectcontroller.DeleteSubject(Id)




  res.json({
    Status:true
  });
});


router.get("/Delete-Result", async(req, res) => {
  const {Id} = req.query;

  const r=await resultcontroller.DeleteResult(Id);





  res.json({
    Status:true
  });
});

router.get("/Delete-University", async(req, res) => {
  const {Id} = req.query;

  const r=await universitycontroller.DeleteUniversity(Id);





  res.json({
    Status:true
  });
});


router.get("/Delete-Course", async(req, res) => {
  const {Id} = req.query;

  const r=await coursecontroller.DeleteCourse(Id);

  


  res.json({
    Status:true
  });


  
});



router.get("/Delete-Specialization", async(req, res) => {
  const {Id} = req.query;

  const r=await specializationcontroller.DeleteSpecialization(Id);

  res.json({
    Status:true
  });
  




 
});


router.get("/Delete-Session", async(req, res) => {
  const {Id} = req.query;

  const r=await sessioncontroller.DeleteSession(Id);
  
  
  res.json({
    Status:true
  });




  
});

router.get("/Delete-Book", async(req, res) => {
  const {Id} = req.query;

  const r=await bookscontroller.DeleteBook(Id);
  
  
  




  res.json({
    Status:true
  });
});


router.get("/get-University", async(req, res) => {


  const r=await universitycontroller.getUniversity(req.query.page,req.query.size);


  return res.send(r);





 
});






router.get("/get-Result", async(req, res) => {


  const r=await resultcontroller.getResult();



  return res.send(r);





 
});



router.get("/get-Courses", async(req, res) => {


  const r=await coursecontroller.getCourses();



  return res.send(r);





 
});


router.get("/get-Specialization", async(req, res) => {


  const r=await specializationcontroller.getSpecialization();
  


  return res.send(r);





 
});


router.get("/get-Session", async(req, res) => {


  const r=await sessioncontroller.getSession();

  


  return res.send(r);





 
});


router.get("/get-Books", async(req, res) => {


  const r=await bookscontroller.getBooks(req.query.page,req.query.size);

  
  


  return res.send(r);





 
});



router.get("/get-Student", async(req, res) => {



  const r=await studentController.getStudent(req.query.page,req.query.size);


  return res.json(r);





 
});


router.post("/Add-Specialization", async(req, res) => {
  const { university,coursetype,specialization,specializationcode,coursefee,registrationfee,examfee} = req.body;

  const r=await specializationcontroller.Add(university,coursetype,specialization,specializationcode,coursefee,registrationfee,examfee);




  res.json({
    Status:true
  });
});



router.post("/Add-Books", async(req, res) => {
  const { coursetype,specialization,title,url} = req.body;

  const r=await bookscontroller.Add(coursetype,specialization,title,url);




  res.json({
    Status:true
  });
});


router.post("/Add-Session", async(req, res) => {
  const { session,year,serial} = req.body;

  const r=await sessioncontroller.Add(session,year,serial);





  res.json({
    Status:true
  });
});

router.post("/Add-Course", async(req, res) => {
  const { university,coursetype,coursename,coursedescription,coursecode,sequence,duration,semester} = req.body;

  const r=await coursecontroller.Add(university,coursetype,coursename,coursedescription,coursecode,sequence,duration,semester);



  res.json({
    Status:true
  });
});



router.post("/Add-University", async(req, res) => {
  const {Name,Code} = req.body;

  const r=await universitycontroller.Add(Name,Code);



  res.json({
    Status:true
  });
});

router.post('/Get-Images', async(req, res) => {

  const {rollno}=req.body;


  const imageFolder = path.join(__dirname, 'Students');
  try {
    const student = await studentController.getStudentBYRollNoLogin(rollno);

    if (student && student.image) {
        const Imgurl = `/Students/${student.image}`;
        res.send(Imgurl);
    } else {
        res.send("Image not found");
    }
} catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send("Internal Server Error");
}
  

});

// router.get('/Get-Images',async (req, res) => {
 
  
  

//   const {rollno}=req.query;

//   const student = await studentController.getStudentBYRollNoLogin(rollno);

// const imageFolder = path.join(__dirname, 'Students');
//   const imageFileNames = fs.readdirSync(imageFolder);

//   const imagePaths = imageFileNames.map((filename) => `/Students/${filename}`);
  
//   res.send(imagePaths);


// });



module.exports = router;
