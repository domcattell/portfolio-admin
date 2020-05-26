const express = require('express'),
    router = express.Router({ mergeParams: true }),
    user = require('../models/user'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    checkAuth = require('../middleware/checkAuth');
    const secret = require('../config/keys').secretToken;

router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) throw Error('Please enter the fields')

        //find user, print json response if not found
        const loginUser = await user.findOne({ username });
        if (!loginUser) throw Error('user not found')

        //compare body pass with db password using bcrypt
        const matched = await bcrypt.compare(password, loginUser.password);
        if (!matched) throw Error('incorrect credentials')

        //assign token and expiration date
        const payload = { username };
        const token = jwt.sign(payload, secret, {
            expiresIn: '60m'
        });

        if (!token) throw Error('token error')

        //send token as json to be used for auth in client
        res.status(200).json(token);
    } catch (e) {
        res.status(400).json({ msg: e.message })
        console.log(e.message)
    }
});

router.get('/admin/user', checkAuth, async (req, res) => {
    const { username } = req;
    try {
        const loggedInUser = await user.findOne({ username }).select('-password');
        if (!loggedInUser) throw Error("User not found");
        res.status(200).json(username);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

//register route. won't be used, and thus no error handling added
// router.post("/admin/register", async (req, res) => {
//     const {username, password} = req.body;

//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(password, salt);

//         const newUser = new user({
//             username,
//             password: hash
//         })

//         const regiserUser = await newUser.save();

//         res.status(200);
//         console.log("Ok")
//     } catch (err) {
//         console.log(err)
//     }
// })

module.exports = router;
