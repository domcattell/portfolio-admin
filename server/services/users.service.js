const User = require('../models/user');
const bcrypt = require('bcrypt');
const hashPassword = require('../utils/hashPassword');
const user = require('../models/user');

//find a user based on username
const findUsername = async(username) => {
	const findUsername = await user.findOne({ username }).select('-password');
	if(!findUsername) throw Error('User not found');
	return findUsername
}

//check password matches
const validateUser = async (bodyPassword, userPassword) => {
	const checkPassword = await bcrypt.compare(bodyPassword, userPassword);
	if (!checkPassword) throw Error('Incorrect credentials');
};

//create account
const createAccount = async (username, password) => {
	const hashedPassword = hashPassword(password);

	const newUser = new User({
		username,
		password: hashedPassword
	});

	const registerUser = await newUser.save();
	if (!registerUser) throw Error('Something went wrong creating this account');
};

//update a users password
const updatePassword = async (username, password) => {
	const hashedPassword = hashPassword(password);

	const updateUserPassword = await user.findOneAndUpdate({ username }, { password: hashedPassword }, { new: true });
	if(!updateUserPassword) throw Error('Error updating password')
}

module.exports = {
	validateUser,
	createAccount,
	updatePassword,
	findUsername
};
