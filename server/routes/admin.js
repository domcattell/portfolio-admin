const express = require('express'),
    router = express.Router({ mergeParams: true }),
    checkAuth = require('../middleware/checkAuth'),
    auth = require('../controllers/auth');

/**
 * @route /api/admin
 * @private: @get /user
 * @private: @put /update
 * @private: @post /register
 */

router.post('/login', auth.login);
router.get('/user', checkAuth, auth.getUser);
router.post('/register', checkAuth, auth.register)
router.put('/account', checkAuth, auth.changePassword)

module.exports = router;
