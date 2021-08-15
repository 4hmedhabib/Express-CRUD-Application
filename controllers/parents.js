const Parent = require('../models/parents/parent');

module.exports.parentsIndex = async (req, res) => {
	const parents = await Parent.find({});
	res.render('parents/parents', { parents });
};

module.exports.parentsRenderForm = (req, res) => {
	res.render('parents/addParent');
};

module.exports.createParent = async (req, res) => {
	const parent = new Parent(req.body.parent);
	await parent.save();
	res.redirect(`/parents/${parent._id}/profile`);
};

module.exports.parentProfile = async (req, res) => {
	const { id } = req.params;
	const parent = await Parent.findById(id).populate('students').catch((err) => {
		return res.redirect('/parents');
	});
	res.render('parents/parentProfile', { parent });
};
