const User = require('../models/user');
const is = require('../utils/validation');

module.exports = async (req, res, next) => {
    const {username, password} = req.body;
    try {
        is.required(username, password);

        const currentUser = await User.findOne({username});
        if(!currentUser) throw Error('User not found')

        req.currentUser = currentUser;

        next();
    } catch(err) {
        res.status(400).json({msg: err.message})
    }
}