const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// design file
app.use(express.static("public"));
app.set("view engine", "ejs");

// routers
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/a", (req, res) => {
  res.send("hi");
});

app.post("/BlogRead", (req, res) => {
  res.send("hi");
})
// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
