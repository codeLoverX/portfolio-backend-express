

const educationSchema = {
    A: 'title',
    B: 'school',
    C: 'city',
    D: 'startDate',
    E: 'endDate'
}

const experienceSchema = {
    A: 'title',
    B: 'company',
    C: 'city',
    D: 'startDate',
    E: 'endDate',
    F: 'description',
    G: 'technologies'
}

const languageSchema = {
    A: 'name',
    B: 'level'
}

const projectSchema = {
    A: 'title',
    B: 'description',
    C: 'technologies',
    D: 'haveLink',
    E: 'link',
    F: 'projectImage'
}

const skillsSchema = {
    A: 'type',
    B: 'level'
}

const messageSchema = {
    A: 'name',
    B: 'email', 
    C: 'subject',
    D: 'message',
    E: 'isSeen',
    F: 'date'
}

module.exports = {
    educationSchema,
    experienceSchema,
    skillsSchema, 
    projectSchema,
    languageSchema,
    messageSchema
}