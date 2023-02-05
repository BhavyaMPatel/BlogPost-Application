const { Router } = require("express");
const express = require("express");
const app = express();
const ejs = require('ejs');

const PORT = process.env.PORT || 3000;
var $ = require('jquery')
app.use(express.json());
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
  res.render("BlogRead",{ba:blogs});
});   

app.get("/WriteBlog",(req,res)=>{
  res.render("Write");
});

app.get("/Post",(req,res)=>{
  res.render("Post");
});

app.get("/Post/:author/:title",(req,res)=>{
  res.render("Post",{AuthorName:req.params.author,Title:req.params.title});
});
// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
