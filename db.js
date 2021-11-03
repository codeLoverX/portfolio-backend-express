// -------------DB CONNECTION
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: __dirname + "\\env\\config.env" })


// -------------DB SEEDER
const fs = require('fs');
// Load models
const EducationModel = require('./models/EducationModel')
const ExperienceModel = require('./models/ExperienceModel')
const LanguageModel = require('./models/LanguageModel')
const ProjectModel = require('./models/ProjectModel')
const UserModel = require('./models/UserModel')
const SkillsModel = require('./models/SkillsModel')


// -------------DB CONNECTION
let connectionString = process.env['DB_CONNECTION']
let connectDB = () => {
  try {
    mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log('Connected to Database') // outputs green text

  }
  catch {
    console.log('Failed to connect to Database') // outputs green text
  }
}


// -------------DB SEEDER
// store fileNames
let fileNames = ['education', 'experience', 'language', 'project', 'skill', 'user']
// store modelNames
let modelNames = [EducationModel, ExperienceModel, LanguageModel, ProjectModel, SkillsModel, UserModel]
// store data from JSON files
let data = []
for (let k = 0; k < fileNames.length; k++) {
  let json = JSON.parse(fs.readFileSync(`${__dirname}/uploads/initialData/${fileNames[k]}.json`, 'utf-8'))
  json.map((object) => {

    Object.keys(object).forEach((key) => 
    {
      if ((['startDate', 'endDate'].includes(key))){
        console.log({key: new Date(object[key])})
        object[key] = new Date(object[key])
      }}
    );
      // console.log({ object })
  })
  data.push((json))
}


// Import into DB
const importData = async () => {
  try {
    // wait for this to occur first
    // deleteData() 
    // xxxxxxxxxxxxxxxxxxxxxx
    // RACE CONDITIONS
    // inside same function, let one async operation occur. then do the second one.
    await deleteData()
    for (let i = 0; i < modelNames.length; i++) {
      await modelNames[i].create(data[i])
    }
    console.log('Data Imported...')
    // process.exit();
  } catch (err) {
    console.error(err);
  }
};
// Delete data
const deleteData = async () => {
  try {
    for (let j = 0; j < modelNames.length; j++) {
      await modelNames[j].deleteMany()
    }
    console.log('Data Destroyed...')
    // process.exit()
  } catch (err) {
    console.error(err)
  }
};


// -------------Export 
module.exports = {
  // connectDB
  connectDB, deleteData, importData
}