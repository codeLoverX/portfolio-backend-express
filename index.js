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
app.use(express.json());
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
connectDB();
// header should be put here?
app.use(cors());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
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
