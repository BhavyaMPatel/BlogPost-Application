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

const blogs=[{cat:"game",date:"2023",auther:"Bhavya",title:"Hello HoneyBony",blog:"Hello HoneyBony"},{cat:"game",date:"2023",auther:"Bhavya",title:"Hello HoneyBony",blog:"Hii"},{cat:"ddd",date:"2023",auther:"Bhavya",title:"Hello HoneyBony",blog:"Hii"},{cat:"ddd",date:"2023",auther:"Bhavya",title:"Hello HoneyBony",blog:"Hii"}]


app.get("/ArticleOneBlogs", (req, res) => {
  res.render("BlogRead",{ba:blogs});
});   

app.get("/WriteBlog",(req,res)=>{
  res.render("Write");
});

app.get("/Post",(req,res)=>{
  res.render("Post");
});
// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
