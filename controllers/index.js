const Students = require("../models/students/student");
const Parents = require("../models/parents/parent");
const Classes = require("../models/classes/class");
const Teachers = require("../models/teachers/teacher");

module.exports.index = async (req, res) => {
  const parents = await Parents.find({});
  const teachers = await Teachers.find({});
  const classes = await Classes.find({});
  const students = await Students.find({});
  res.render("dashboard", { parents, teachers, classes, students });
};
