const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Student = require('./models/students/student');
const Parent = require('./models/parents/parent');
const Class = require('./models/classes/class');
const Teacher = require('./models/teachers/teacher');


const db = mongoose.connect('mongodb://localhost:27017/expressCrud', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('DATABASE SUCCESSFULLY CONNECTED!!!');
    })
    .catch((err) => {
        console.log('CONNECTION ERROR!!!');
    })

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const studentsRoute = require('./routes/students');
const classesRoute = require('./routes/classes');
const teachersRoute = require('./routes/teachers');
const parentsRoute = require('./routes/parents');


app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next()
});

app.get('/', (req, res) => {
    res.render('dashboard')
});

app.use('/students', studentsRoute);

app.use('/classes', classesRoute);

app.use('/teachers', teachersRoute)

app.use('/parents', parentsRoute)


app.listen(3000, () => {
    console.log('Server Running PORT: 3000')
});