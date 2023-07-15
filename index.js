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

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// design file
app.use(express.static("public"));
app.set("view engine", "ejs");

// routers  
app.use(authRoutes)
// server listening

app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
