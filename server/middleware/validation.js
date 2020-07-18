const is = require('../utils/validation');

const userValidation = (req, res, next) => {
    const {username, password} = req.body;

    is.required(username);
    is.required(password);

    
}