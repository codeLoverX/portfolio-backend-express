const express = require("express");
const cors = require("cors");
const educationRoutes = require("./routes/EducationRoutes");
const experienceRoutes = require("./routes/ExperienceRoutes");
const languageRoutes = require("./routes/LanguageRoutes");
const projetRoutes = require("./routes/ProjectRoutes");
const skillRoutes = require("./routes/SkillRoutes");
const userRoutes = require("./routes/UserRoutes");
const messageRoutes = require("./routes/MessageRoutes");
const {connectDB, importData} = require('./db');
require("dotenv").config({ path: __dirname+ "\\env\\config.env" });
global.basedir = __dirname;

const app = express();
// for parsing json
app.use(express.json({extended: true }));
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
connectDB();
// if axios mention it
app.use(cors({origin: 'http://localhost:3000'}));

app.get("/",  function(req, res, next){
  res.json({'success': true})
});
app.use("/educations", educationRoutes);
app.use("/experiences", experienceRoutes);
app.use("/languages", languageRoutes);
app.use("/projects", projetRoutes);
app.use("/skills", skillRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.get("/resetData", async function(req, res, next){
  // prevent race conditions
  await importData()
  res.json({'success': true})
});
app.use("/uploads", express.static("uploads"));
// app.use("/initialData", express.static("initialData"));


app.listen(process.env.PORT, () =>
  console.log(`server is running in port ${process.env.PORT}`)
);
