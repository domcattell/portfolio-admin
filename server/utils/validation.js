const is = {
	required(...values) {
		values.forEach((value) => {
			if (!value) {
				throw Error(`Please enter required fields`);
			}
		});
	},

	passwordMatch(password, confirmPassword) {
		if (confirmPassword != password) throw Error('Passwords do not match');
	}
};

module.exports = is;
