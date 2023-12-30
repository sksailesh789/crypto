const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otherHelper = require('../../helper/others.helper');
const userSch = require('./userSchema.js');
const { secretOrKey, tokenExpireTime } = require('../../config/keys');
const userController = {};


userController.getUserCrypto = async (req, res, next) => {
    try {
    const id = req.user.id;
      let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 10);
      searchQuery = {
        _id: id,
        ...searchQuery,
      };
      selectQuery = 'cryptoList total_points';
  
      populate = [
        {
          path: 'cryptoList.crypto',
          select: 'name image ',
        },
      ];
      let data = await userSch
        .findOne(searchQuery)
        .select(selectQuery)
        .populate(populate)
        .lean();
      return res.status(httpStatus.OK).json(data);
      // let data = await otherHelper.getQuerySendResponse(userSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
      // return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data, 'User Crypto Get Success', page, size, data.totaldata,sortQuery);
    } catch (err) {
      next(err);
    }
  };
  
  userController.buyCryptoForUser = async (req, res, next) => {
    try {
      const crypto = req.body;
      const id = req.user.id;
      console.log(id, crypto.id,crypto.point,'9855')
      // const user = await userSch.findOne({ _id:id });
      const isUserfound = await userSch.findOne({
        $and: [
          { _id: id }, 
          {
            cryptoList: {
              $elemMatch: { crypto: crypto.id }
            }
          }
        ]
      })
      let update;
      if(isUserfound){
         update = await userSch.findOneAndUpdate(
          {
            _id: id,
            'cryptoList.crypto': crypto.id
          },
          {
            $inc: {
              'cryptoList.$.point': crypto.point
            }
          },
          { new:true }
          )
      // return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'Crypto update success', null);

      }else {
         update = await userSch.findOneAndUpdate(
          { _id: id },
          {
            $push: {
              cryptoList: {
                crypto: crypto.id,
                point: crypto.point
              }
            }
          },
          { new: true })
      // return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'Crypto update success', null);

      }
 // Calculate total_points by summing up points from cryptoList
 const totalPoints = update.cryptoList.reduce((total, cryptoItem) => total + cryptoItem.point, 0);

 // Update total_points in the user document
 update = await userSch.findOneAndUpdate(
   { _id: id },
   {
     $set: {
       total_points: totalPoints,
     },
   },
   { new: true }
 );
 return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'Crypto update success', null);
  
    } catch (err) {
      next(err);
    }
  };

  
  userController.Register = async (req, res, next) => {
    try{
  
    const user = await userSch.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      const errors = { email: 'Email already exists' };
      const data = { email: req.body.email };
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, data, errors, errors.email, null);
    } else {
      const { name, email, password } = req.body;
       const newUser = new userSch({ name, email: email.toLowerCase(), password});
  
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
          const user = await newUser.save();
  
          
          // Create JWT payload
          let payload = {
            id: user._id,
            name: user.name,
            email: user.email,
          };
  
          // Sign Token
          let token = jwt.sign(payload, secretOrKey, {
            expiresIn: tokenExpireTime,
          });
          token = `Bearer ${token}`;
          return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, 'Register Successfully', token);
    }
  }catch(err){
    next(err)
  }
  };
  
  
  userController.Login = async (req, res, next) => {
    try {
      let errors = {};
      let email = req.body.email.toLowerCase();
      const {
        body: { password},
      } = req;
      userSch.findOne({ email }).then((user) => {
        if (!user) {
          errors.email = 'User not found';
          return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, errors, errors.email, null);
        }
  
        // Check Password
        bcrypt.compare(password, user.password).then(async (isMatch) => {
          if (isMatch) {
            // User Matched
            // Create JWT payload
            let payload = {
              id: user._id,
              name: user.name,
              email: user.email,
            };
            // Sign Token
            jwt.sign(
              payload,
              secretOrKey,
              {
                expiresIn: tokenExpireTime,
              },
              (err, token) => {
                token = `Bearer ${token}`;
                return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, 'Login Success', token);
              },
            );
          } else {
            errors.password = 'Password incorrect';
            return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, errors.password, null);
          }
        });
      });
    } catch (err) {
      next(err);
    }
  };

  userController.exchangeCryptoPoints = async(req,res,next) => {
    try{
      // const id = req.params.userid;
      const { fromCryptoId, toCryptoId, points } = req.body;
      const id = req.user.id;

      // Fetch the user
    const user = await userSch.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
     // Find the index of the fromCrypto in user's cryptoList
     const fromCryptoIndex = user.cryptoList.findIndex(
      (crypto) => crypto.crypto.toString() === fromCryptoId
    );
    if(user.cryptoList[fromCryptoIndex].point < points) {
      return res.status(400).json({ error: 'exchange coin greater than existing coin' });
    }
    
    if(user.cryptoList[fromCryptoIndex].point == points) {
      user.cryptoList = user.cryptoList.filter(item => item.crypto.toString() !== fromCryptoId);

    console.log('equal')
      // return res.status(400).json({ error: 'exchange coin greater than existing coin' });
    }else {
      user.cryptoList[fromCryptoIndex].point -= parseFloat(points);

    }
     // Find the index of the toCrypto in user's cryptoList
     const toCryptoIndex = user.cryptoList.findIndex(
      (crypto) => crypto.crypto.toString() === toCryptoId
    );

    if (toCryptoIndex === -1) {
      user.cryptoList.push({ crypto: toCryptoId, point: parseFloat(points) });
    } else {
      user.cryptoList[toCryptoIndex].point = user.cryptoList[toCryptoIndex].point + parseFloat(points);
      
    }
    // Save the updated user
    await user.save();

    res.json({ message: 'Crypto exchange successful', user });

    }catch(err){
      next(err)
    }
  } 
  module.exports = userController;