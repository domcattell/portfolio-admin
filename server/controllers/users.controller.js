const is = require('../utils/validation'),
	UserService = require('../services/users.service'),
	assignToken = require('../utils/assignToken');

const login = async (req, res) => {
	const { username, password } = req.body;
	const { currentUser } = req;
	try {
		await UserService.validateUser(password, currentUser.password);
		const token = assignToken(username);

		res.status(200).json(token);
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
};

const register = async (req, res) => {
	const { username, password, confirmPassword } = req.body;
	try {
		is.required(req.body);
		is.passwordMatch(password, confirmPassword);

		await UserService.createAccount(req.body);

		res.status(200).json({ msg: 'Account successfully created' });
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
};

const changePassword = async (req, res) => {
	const { newPassword, currentPassword, retypePassword } = req.body;
	const { currentUser } = req;
	const { username } = req;
	try {
		is.passwordMatch(newPassword, retypePassword);

		await UserService.validateUser(currentPassword, currentUser.password);
		await UserService.updatePassword(username, newPassword);

		res.status(200).json({ msg: 'Password successfully updated' });
	} catch (err) {
		console.log(err);
		res.status(400).json({ msg: err.message });
	}
};

const getUser = async (req, res) => {
	const { username } = req;
	try {
		await UserService.findUsername(username);

		res.status(200).json(username);
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
};

module.exports = {
	login,
	register,
	getUser,
	changePassword
};
