const express = require('express');
const router = express.Router();

const cryptoModule = require('../../modules/crypto/cryptoController');
const fileUpload = require('../../helper/upload.helper')('public/crypto');

const uploader = fileUpload.uploader;
const validation = require('../../modules/crypto/cryptoValidations');

router.post('/',uploader.any('file'),validation.sanitize, validation.validate, cryptoModule.addCrypto);
router.get('/allcrypto',  cryptoModule.getCrypto);
router.delete('/delete/:id',  cryptoModule.deleteCrypto);
router.get('/detail/:id', cryptoModule.getCryptoDetail);


module.exports = router;




