// -------------DB CONNECTION
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: __dirname + "\\env\\config.env" })
const path = require('path');
const bcrypt = require("bcrypt");


// -------------DB SEEDER
const fs = require('fs');
const fs_extra = require("fs-extra");

// Load models
const EducationModel = require('./models/EducationModel')
const ExperienceModel = require('./models/ExperienceModel')
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
let fileNames = ['education', 'experience',  'project', 'skill',]
// store modelNames
let modelNames = [EducationModel, ExperienceModel, ProjectModel, SkillsModel]
// store data from JSON files
let data = []
for (let k = 0; k < fileNames.length; k++) {
  let json = JSON.parse(fs.readFileSync(`${__dirname}/uploads/templates/${fileNames[k]}.json`, 'utf-8'))
  json.map((object) => {

    Object.keys(object).forEach((key) => {
      if ((['startDate', 'endDate'].includes(key))) {
        object[key] = new Date(object[key])
      }
    }
    );
    // console.log({ object })
  })
  data.push((json))
}

/* create users
*/


// delete files

function deleteFiles() {

  const directory = 'uploads/projects';

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });

}

function copyFiles() {
  var source = 'uploads/templates'
  var destination = 'uploads/projects'

  // Copy the source folder to the destination
  fs_extra.copy(source, destination, function (err) {
    if (err) {
      console.log('An error occurred while copying the folder.')
      return console.error(err)
    }
    console.log('Copy completed!')
  });
}

// Import into DB
const importData = async () => {
  try {
    // wait for this to occur first
    // deleteData() 
    // xxxxxxxxxxxxxxxxxxxxxx
    // RACE CONDITIONS
    // inside same function, let one async operation occur. then do the second one.
    await deleteFiles()
    await copyFiles()
    await deleteData()
    await UserModel.deleteMany();
    for (let i = 0; i < modelNames.length; i++) {
      await modelNames[i].create(data[i])
    }
    let json = JSON.parse(fs.readFileSync(`${__dirname}/uploads/templates/user.json`, 'utf-8'))
    json.map((object) => {
      bcrypt.hash(object.password, 10, async (err, hash) => {
        await UserModel.create({ name: object.name, email: object.email, password: hash })
        // console.log({ object })
      })
    })
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