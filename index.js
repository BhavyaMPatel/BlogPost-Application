const express = require("express");
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const authRoutes=require('./routes/authRoute');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true })

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/ArticleOne",{useNewUrlParser: true});

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// design file
app.use(express.static("public"));
app.set("view engine", "ejs");

// routers

app.get("/", (req, res) => {
  res.render("HomePage",{Post:blogs});
});

const blogs=[{cat:"game",date:"2023",author:"Bhavya",title:"HelloHoneyBony",blog:"HelloHoneyBony"},{cat:"ss",date:"2023",author:"Bhv",title:"HelloHoneyBony",blog:"Hii"},{cat:"ddd",date:"2023",author:"Bhav",title:"HHoneyBony",blog:"Hii"},{cat:"ddnr",date:"2023",author:"Bhaa",title:"HeeyBony",blog:"Hii"}]


app.get("/ArticleOneBlogs", (req, res) => {
  res.render("BlogRead",{ba:blogs,UserName:"UserNameFromJWT"});
});   

app.get("/WriteBlog",(req,res)=>{
  res.render("Write",{UserName:"UserNameFromJWT"});
});

app.get("/Post",(req,res)=>{
  res.render("Post",{UserName:"UserNameFromJWT"});
});

app.get("/Post/:author/:title",(req,res)=>{
  res.render("Post",{AuthorName:req.params.author,Title:req.params.title});
});

  
app.use(authRoutes)
// server listening


app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
