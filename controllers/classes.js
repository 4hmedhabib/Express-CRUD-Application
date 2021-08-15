const Class = require('../models/classes/class');

module.exports.classesIndex = async (req, res) => {
	const classes = await Class.find({}).populate('teacher');
	console.log(classes);
	res.render('classes/classes', { classes });
};

module.exports.classesRenderForm = (req, res) => {
	res.render('classes/addClass');
};

module.exports.createClass = async (req, res) => {
	const clss = new Class(req.body.class);
	await clss.save();
	res.redirect('/classes');
};

module.exports.classProfile = async (req, res) => {
	const { id } = req.params;
	const clss = await Class.findById(id).populate('teacher').populate('students');
	const edit = false;
	const detail = false;
	console.log('load', clss.teacher);
	res.render('classes/classProfile', { clss, detail, edit });
};
