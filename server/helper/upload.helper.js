const fileUploadHelper = (filePath) => {
    const multer = require('multer');
    const path = require('path');
    const hashHelper = require('./others.helper');
    const fs = require('fs');

const ensureFolderExists = async (path) => {
  try {
    await fs.promises.mkdir(path, { recursive: true });
  } catch (err) {
    throw err;
  }
};

  
    const storage = multer.diskStorage({
      destination: async (req, file, cb) => {
        const uploadPath = filePath;
        

        try {
          const folderStat = await ensureFolderExists(uploadPath);
          cb(null, path.resolve(filePath));

        } catch (err) {
          cb(err);
        }
      },
      filename: async (req, file, cb) => {
        const randomString = await hashHelper.generateRandomHexString(15);
        cb(null, randomString + '-' + file.originalname);
      },
      onFileUploadStart: (file) => {
        recentFile = file;
        recentFile.finished = false;
      },
      onFileUploadComplete: (file) => {
        recentFile.finished = true;
      },
    });
   
    return {
      uploader: multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
          if (!file.mimetype.includes('jpeg') && !file.mimetype.includes('jpg') && !file.mimetype.includes('png') && !file.mimetype.includes('gif') && !file.mimetype.includes('pdf')) {
            return cb(null, false, new Error('Only images are allowed'));
          }
          cb(null, true);
        },
      }),
    };
  };
  
  module.exports = fileUploadHelper;




  