const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Student = require('./models/students/student');


const db = mongoose.connect('mongodb://localhost:27017/expressCrud', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
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
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next()
});

app.get('/', (req, res) => {
    res.render('dashboard')
});

app.get('/students', async(req, res) => {
    const students = await Student.find({})
    console.log(students)
    res.render('students/students', { students })
});

app.get('/students/create', (req, res) => {
    res.render('students/addStudent')
});

app.post('/students', async(req, res) => {
    console.log(req.body.student, req.body)
    const std = new Student(req.body.student)
    await std.save()
    res.redirect('/students/')
});

app.get('/teachers', (req, res) => {
    res.render('teachers/teachers')
});

app.get('/teachers/create', (req, res) => {
    res.render('teachers/addTeacher')
});

app.get('/classes', (req, res) => {
    res.render('classes/classes')
});

app.get('/classes/create', (req, res) => {
    res.render('classes/addClass')
});

app.get('/parents', (req, res) => {
    res.render('parents/parents')
});

app.get('/parents/create', (req, res) => {
    res.render('parents/addParents')
});


app.listen(3000, () => {
    console.log('Server Running PORT: 3000')
});