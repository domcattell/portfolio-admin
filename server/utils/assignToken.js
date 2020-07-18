const jwt = require('jsonwebtoken');

//assign token and expiration date
const assignToken = (username) => {
	const payload = { username };
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: '60m'
	});
	if (!token) throw Error('token error');
	
	return token;
};

module.exports = assignToken;
