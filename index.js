require("dotenv").config();
const express=require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const cookieParser = require("cookie-parser");


const expressesion=require('express-session');
const session = require("express-session");

const studentController=require('./controllers/studentController');

const app=express();
app.use(express.urlencoded({
    extended:false
}));



  
app.use(express.json());

app.use('/Students', express.static(path.join(__dirname, 'Students')));

// Endpoint to get image paths






app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 60 * 60 * 24*30,
    secure:false
  },
 
}));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));


app.set('view-engine','ejs');


app.use("",require('./routers/routes'));

const PORT= 4000;

app.get("/",(req,res)=>
{
  res.send("dfsdf");

})
app.listen(PORT,()=>
{

    
console.log("fsdfsdf");

});


