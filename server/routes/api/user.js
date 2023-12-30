const express = require('express');
const router = express.Router();

const userModule = require('../../modules/user/userController');
const userValidations = require('../../modules/user/userValidations');
const { authentication } = require('../../middleware/authentication.middleware');


router.post('/register', userValidations.sanitizeRegister, userValidations.validateRegisterInput, userModule.Register);
router.post('/login', userValidations.sanitizeLogin, userValidations.validateLoginInput, userModule.Login);
router.post('/buycrypto',authentication, userModule.buyCryptoForUser);
router.post('/exchangecrypto',authentication, userModule.exchangeCryptoPoints);

router.get('/', authentication,userModule.getUserCrypto);

module.exports = router;
