const Student = require("../models/students/student");
const Parent = require("../models/parents/parent");
const Class = require("../models/classes/class");

module.exports.studentsIndex = async (req, res) => {
  const students = await Student.find({ status: { $ne: false } }).populate(
    "parent"
  );
  const inActiveStds = await Student.find({ status: { $ne: true } }).populate(
    "parent"
  );
  res.render("students/students", { students, inActiveStds });
};

module.exports.studentRenderForm = async (req, res) => {
  const classes = await Class.find({});
  res.render("students/addStudent", { parent: null, classes });
};

module.exports.studentRenderForm2 = async (req, res) => {
  const { parentId } = req.params;
  const parent = await Parent.findById(parentId);
  const classes = await Class.find({});
  res.render("students/addStudent", { parent, classes });
};

module.exports.createStudent = async (req, res) => {
  const findParent = await Parent.find({ phone: req.body.student.phone });
  const findClass = await Class.find({ name: req.body.student.class });
  const parentId = await findParent[0]._id;
  const classId = await findClass[0]._id;
  const parent = await Parent.findByIdAndUpdate(parentId);
  const clss = await Class.findByIdAndUpdate(classId);
  if (!parent) {
    return res.send("Can't get This Parent");
  }
  const std = new Student(req.body.student);

  parent.students.push(std);
  std.parent = parent._id;
  clss.students.push(std);
  std.class = clss._id;

  await std.save();
  await parent.save();
  await clss.save();

  console.log(std);
  res.redirect(`/students/${std._id}/profile`);
};

module.exports.createStudent2 = async (req, res) => {
  const { parentId } = req.params;
  const findClass = await Class.find({ name: req.body.student.class });
  const classId = await findClass[0]._id;
  const clss = await Class.findByIdAndUpdate(classId);
  const parent = await Parent.findById(parentId);
  if (!parent) {
    return res.send("Can't get This Parent");
  }
  const std = new Student(req.body.student);

  parent.students.push(std);
  std.parent = parent._id;
  clss.students.push(std);
  std.class = clss._id;

  await std.save();
  await parent.save();
  await clss.save();
  res.redirect(`/students/${std._id}/profile`);
};

module.exports.studentProfile = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id)
    .populate("parent")
    .populate({
      path: "class",
      populate: {
        path: "teacher",
      },
    });
  console.log(student);
  res.render("students/StudentProfile", { student });
};
