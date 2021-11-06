const fs = require('fs');
const excelToJson = require('convert-excel-to-json');
// model
const EducationModel = require('../models/EducationModel')
const ExperienceModel = require('../models/ExperienceModel')
const LanguageModel = require('../models/LanguageModel')
const ProjectModel = require('../models/ProjectModel')
const SkillsModel = require('../models/SkillsModel')
// schema
const schemaAll = require("../helper/excelFileConversion")

// store modelNames
let modelsAll = {
    education: EducationModel, experience: ExperienceModel, language: LanguageModel,
    project: ProjectModel, skill: SkillsModel
}

const sendFileHelper = async (req, res, next) => {
    console.log(req.fileNameCustom);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + req.fileNameCustom);
    var filestream = fs.createReadStream(`./uploads/templates/${req.fileNameCustom}`);
    filestream.pipe(res);
    res.json({ success: true })
}

const updateFileHelper = async (req, res, next) => {
    let model, schema, file;
    switch (req.modelPathCustom) {
        case "education": {
            model = modelsAll.education;
            schema = schemaAll.educationSchema;
            file = req.file;
            break;
        }
        case "experiences": {
            model = modelsAll.experience;
            schema = schemaAll.experienceSchema;
            file = req.file;
            break;
        }
        case "language": {
            model = modelsAll.language;
            schema = schemaAll.languageSchema;
            file = req.file;
            break;
        }
        case "projects": {
            model = modelsAll.project;
            schema = schemaAll.projectSchema;
            file= req.files.excelFile[0]
            // should always visualize request weeeeellllllllll!!!!!!!!!!!!
            console.log({ file, body: req.body, files: req.files })
            break;
        }
        case "skills": {
            model = modelsAll.skill;
            schema = schemaAll.skillsSchema;
            file = req.file;
            console.log({ file })
            break;
        }
    }
    console.log({ file, model, schema })
    if (file) {
        try {
            const result = excelToJson({
                source: fs.readFileSync(`${basedir}/uploads/projects/${file.filename}`),
                // fs.readFileSync return a Buffer
                sheets: [{ name: 'Sheet1', header: { rows: 1 }, columnToKey: { ...schema } }]
            });
            let resultSheet1 = result.Sheet1
            // objects are written by reference so no need to return map
            resultSheet1.map((object) => {
                Object.keys(object).forEach((key) => {
                    if ((['startDate', 'endDate'].includes(key))) {
                        console.log({ key: new Date(object[key]) })
                        object[key] = new Date(object[key])
                    }
                }
                );
            })
            console.log({ resultSheet1 })
            console.log({ resultSheet1: resultSheet1.length })
            if (resultSheet1.length < 1) throw "Error";
            await model.deleteMany();
            let data = await model.create(resultSheet1)

            res.json({ data })
        }
        catch (err) {
            console.log({ err });
        }
    }
    else {
        res.json({ success: false })
    }
}

module.exports = {
    sendFileHelper,
    updateFileHelper
};
