const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Student = require('./models/students/student');
const Parent = require('./models/parents/parent')


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
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next()
});

app.get('/', (req, res) => {
    res.render('dashboard')
});

app.get('/students', async(req, res) => {
    const students = await Student.find({}).populate('students');

    res.render('students/students', { students })
});

app.get('/students/create', (req, res) => {

    res.render('students/addStudent');
});

app.get('/students/:id/profile', async(req, res) => {
    const { id } = req.params
    const student = await Student.findById(id).populate('parent');
    res.render('students/StudentProfile', { student })
});

app.post('/students', async(req, res) => {
    const parent = await Parent.findOneAndUpdate({ phone: req.body.student.phone });
    if (!parent) {
        return res.send("Can't get This Parent")
    }
    const std = new Student(req.body.student);
    parent.students.push(std);
    std.parent = parent._id;
    await std.save();
    await parent.save();
    res.redirect(`/students/${std._id}/profile`);
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

app.get('/parents', async(req, res) => {
    const parents = await Parent.find({});
    res.render('parents/parents', { parents })
});

app.get('/parents/create', (req, res) => {
    res.render('parents/addParent')
});

app.get('/parents/:id/profile', async(req, res) => {
    const { id } = req.params;
    const parent = await Parent.findById(id).populate('students').catch((err) => {
        return res.redirect('/parents')
    });
    res.render('parents/parentProfile', { parent })
});

app.post('/parents', async(req, res) => {
    const parent = new Parent(req.body.parent);
    await parent.save()
    res.redirect(`/parents/${parent._id}/profile`)
});

app.get('/test', (req, res) => {
    res.render('test')
})


app.listen(3000, () => {
    console.log('Server Running PORT: 3000')
});