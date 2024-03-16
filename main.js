require("dotenv").config();
const express=require('express');
const mongoose=require('mongoose');
const expressesion=require('express-session');
const app=express();

const port=process.env.PORT || 4000;
app.get("/",(req,res)=>
{
res.send("efsdfjk");

});
app.listen(PORT,()=>
{
console.log("fsdfsdf");

});