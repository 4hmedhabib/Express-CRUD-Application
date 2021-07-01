const Teacher = require('../models/teachers/teacher');
const Class = require('../models/classes/class');

module.exports.teachersIndex = async(req, res) => {
    const teachers = await Teacher.find({}).populate('classes');

    res.render('teachers/teachers', { teachers });
};

module.exports.teacherRenderForm = async(req, res) => {
    const classesNull = await Class.find({ teacher: { $eq: null } }).populate('classes');
    res.render('teachers/addTeacher', { classesNull })
};

module.exports.createTeacher = async(req, res) => {
    const classFind = await Class.find({ name: req.body.teacher.class });

    if (classFind) {
        const classId = classFind[0]._id;
        const clss = await Class.findByIdAndUpdate(classId);
        const teacher = new Teacher(req.body.teacher);

        teacher.classes = clss._id;
        clss.teacher = teacher._id;
        clss.status = true

        await teacher.save();
        await clss.save();
        return res.redirect('/teachers/');
    }
    res.redirect('/teachers/create');
};

module.exports.teacherProfile = async(req,res)=> {
    const {id} = req.params;
    const teacher = await Teacher.findById(id).populate('classes');
    
    res.render('teachers/teacherProfile', {teacher})
}