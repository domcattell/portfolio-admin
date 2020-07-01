const user = require('../models/user'),
	bcrypt = require('bcrypt'),
	jwt = require('jsonwebtoken'),
	is = require('../utils/validation');

const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		if (!username || !password) throw Error('Please enter the required fields');

		//find user, print json response if not found
		const loginUser = await user.findOne({ username });
		if (!loginUser) throw Error('user not found');

		//compare body pass with db password using bcrypt
		const matched = await bcrypt.compare(password, loginUser.password);
		if (!matched) throw Error('incorrect credentials');

		//assign token and expiration date
		const payload = { username };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '60m'
		});

		if (!token) throw Error('token error');

		//send token as json to be used for auth in client
		res.status(200).json(token);
	} catch (e) {
		res.status(400).json({ msg: e.message });
		console.log(e.message);
	}
};

const register = async (req, res) => {
	const { username, password, confirmPassword } = req.body;

	try {
		is.required(password, username, confirmPassword);

		if (confirmPassword != password) throw Error('Passwords do not match');

		//salt & has password field
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		//create new user
		const newUser = new user({
			username,
			password: hash
		});

		//save user
		const registerUser = await newUser.save();
		if (!registerUser) throw Error('Something went wrong creating the account');

		res.status(200).json({ msg: 'Account successfully created' });
	} catch (err) {
		console.log(err.message);
		res.status(400).json({ msg: err.message });
	}
};

const changePassword = async (req, res) => {
	const { newPassword, currentPassword, retypePassword } = req.body;
	const { username } = req;

	try {
		is.required(newPassword, currentPassword, retypePassword);

		const foundUser = await user.findOne({ username });

		if (newPassword != retypePassword) throw Error('New password does not match');

		const matched = await bcrypt.compare(currentPassword, foundUser.password);
		if (!matched) throw Error('Your current password is incorrect');

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(newPassword, salt);

		const updatePassword = await user.findOneAndUpdate({ username }, { password: hash }, { new: true });
		if (!updatePassword) throw Error('Error updating password');

		res.status(200).json({ msg: 'Password successfully updated' });
	} catch (err) {
		console.log(err);
		res.status(400).json({ msg: err.message });
	}
};

const getUser = async (req, res) => {
	const { username } = req;

	try {
		//check if user exists
		const loggedInUser = await user.findOne({ username }).select('-password');
		if (!loggedInUser) throw Error('User not found');

		//send username as json
		res.status(200).json(username);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
};

module.exports = {
	login,
	register,
	getUser,
	changePassword
};
