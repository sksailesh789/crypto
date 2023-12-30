const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const cryptoSch = require('./cryptoSchema.js');
const cryptoController = {};


cryptoController.getCrypto = async (req, res, next) => {
    try {
      let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 10);
      searchQuery = { ...searchQuery };
      selectQuery = 'name crypto_id image';
  
      populate = [
        {
          path: 'image.document',
          skip: 1,
          select: 'filename path destination',
        },
      ];
      let data = await otherHelper.getQuerySendResponse(cryptoSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
      // return res.status(httpStatus.OK).json(data);
      
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data, 'Crypto Get Success', page, size, data.totaldata,sortQuery);
    } catch (err) {
      next(err);
    }
  };
  
  cryptoController.addCrypto = async (req, res, next) => {
    try {
      const crypto = req.body;
  console.log(req.files,'rfff')
  // if (req.files && req.files.length > 0) {
  //   // Handle multiple files
  //   crypto.image = req.files.map((file) => ({
  //     destination: file.destination
  //       .split('\\')
  //       .join('/')
  //       .split('server/')[1] + '/',
  //     path: file.path.split('\\').join('/').split('server/')[1],
  //   }));
  // }
      if (req.files && req.files.length > 0) {
        const media = req.files;
        media.map((file) => {
          file.destination =
          file.destination
            .split('\\')
            .join('/')
            .split('server/')[1] + '/';
        file.path = file.path
          .split('\\')
          .join('/')
          .split('server/')[1];
  
        })
        
          crypto.image = media;
      }
  
      if (crypto._id) {
        
  
        const update = await cryptoSch.findByIdAndUpdate(
          crypto._id,
          {
            $set: crypto,
          },
          { new: true },
        );
        return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'Crypto update success', null);
      } else {
          const newcrypto = new cryptoSch(crypto);
          const cryptoSave = await newcrypto.save();
          return otherHelper.sendResponse(res, httpStatus.OK, true, cryptoSave, null, 'New Crypto Added', null);
      }
    } catch (err) {
      next(err);
    }
  };

  cryptoController.getCryptoDetail = async(req,res,next) => {
    const id = req.params.id;
  const cryptoDetail = await cryptoSch
    .findOne({ _id: id })

  if (!cryptoDetail) {
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'crypto Not Found!!!', null);
  }
  return otherHelper.sendResponse(res, httpStatus.OK, true, cryptoDetail, null, 'crypto Detail Success', null);

  }
  
  cryptoController.deleteCrypto = async(req,res,next) => {
    try{
      const id = req.params.id;
    const deletedata = await cryptoSch.findOneAndDelete({ _id: id });
    return otherHelper.sendResponse(res, httpStatus.OK, true, deletedata, null, 'Crypto Delete Success', null);
    
    }catch(err) {
      next(err)
    }
  }
  
  module.exports = cryptoController;