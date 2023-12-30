const express = require('express');
const router = express.Router();


// All route of User
const userRoutes = require('./api/user');
router.use('/user', userRoutes);

// All route of Crypto
const crypto = require('./api/crypto');
router.use('/crypto', crypto);




module.exports = router;
