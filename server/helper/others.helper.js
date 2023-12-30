'use strict';
const crypto = require('crypto');
const Validator = require('validator');
const isEmpty = require('../validation/isEmpty');
const otherHelper = {};


otherHelper.generateRandomHexString = (len) => {
    return crypto
      .randomBytes(Math.ceil(len / 2))
      .toString('hex') // convert to hexadecimal format
      .slice(0, len)
      .toUpperCase(); // return required number of characters
  };


  otherHelper.getQuerySendResponse = async (model, page, size, sortQuery, findQuery, selectQuery, next, populate) => {
    let datas = {};
    try {
      datas.data = await model
        .find(findQuery)
        .select(selectQuery)
        .sort(sortQuery)
        .skip((page - 1) * size)
        .limit(size * 1)
        .populate(populate)
        .lean();
      datas.totaldata = await model.countDocuments(findQuery).lean();
      return datas;
    } catch (err) {
      next(err);
    }
  };

  otherHelper.sendResponse = (res, status, success, data, errors, msg, token) => {
    const response = {};
    if (success !== null) response.success = success;
    if (data !== null) response.data = data;
    if (errors !== null) response.errors = errors;
    if (msg !== null) response.msg = msg;
    if (token !== null) response.token = token;
    return res.status(status).json(response);
  };

  otherHelper.parseFilters = (req, defaults) => {
    const size_default = defaults ? defaults : 10;
    let page;
    let size;
    let sortQuery = { _id: -1 };
    let sort_key;
    let searchQuery = {};
    let populate = [];
    let selectQuery = { __v: 0 };
    
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }
    if (req.query.sort) {
      let sort = req.query.sort.split(':');
      sort_key = sort[0];
  
      let sort_order = sort[1] === 'desc' ? -1 : 1;
      sortQuery = { [sort_key]: sort_order };
    }
    return { page, size, sortQuery, searchQuery, selectQuery, populate };
  };

  otherHelper.paginationSendResponse = (res, status, success, data, msg, pageno, pagesize, totaldata, sort) => {
    const response = {};
    if (data) response.data = data;
    if (success !== null) response.success = success;
    if (msg) response.msg = msg;
    if (pageno) response.page = pageno;
    if (pagesize) response.size = pagesize;
    if (sort) response.sort = sort;
    if (typeof totaldata === 'number') response.totaldata = totaldata;
    return res.status(status).json(response);
  };

  otherHelper.sanitize = (req, sanitizeArray) => {
    sanitizeArray.forEach((sanitizeObj) => {
      let sanitizefield = req.body[sanitizeObj.field];
      sanitizefield = !isEmpty(sanitizefield) ? sanitizefield + '' : '';
      const sanitization = sanitizeObj.sanitize;
      if (sanitization.rtrim) {
        sanitizefield = Validator.rtrim(sanitizefield);
      }
      if (sanitization.ltrim) {
        sanitizefield = Validator.ltrim(sanitizefield);
      }
      if (sanitization.blacklist) {
        sanitizefield = Validator.blacklist(sanitizefield);
      }
      if (sanitization.whitelist) {
        sanitizefield = Validator.whitelist(sanitizefield);
      }
      if (sanitization.trim) {
        sanitizefield = Validator.trim(sanitizefield);
      }
      if (sanitization.escape) {
        sanitizefield = Validator.escape(sanitizefield);
      }
      if (sanitization.unescape) {
        sanitizefield = Validator.unescape(sanitizefield);
      }
      if (sanitization.toBoolean) {
        sanitizefield = Validator.toBoolean(sanitizefield);
      }
      if (sanitization.toInt) {
        sanitizefield = Validator.toInt(sanitizefield);
      }
      if (sanitization.toFloat) {
        sanitizefield = Validator.toFloat(sanitizefield);
      }
      if (sanitization.toDate) {
        sanitizefield = Validator.toDate(sanitizefield);
      }
      req.body[sanitizeObj.field] = sanitizefield;
    });
    return true;
  };
  otherHelper.validation = (data, validationArray) => {
    let errors = {};
    validationArray.forEach((validationObj) => {
      let value = data[validationObj.field];
      value = !isEmpty(value) ? value + '' : '';
      const validation = validationObj.validate;
      for (let i = 0; i < validation.length; i++) {
        const val = validation[i];
        switch (val.condition) {
          case 'IsEmpty':
            if (Validator.isEmpty(value)) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsLength':
            if (val.option) {
              if (!Validator.isLength(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
            break;
          case 'IsInt':
            if (val.option) {
              if (!Validator.isInt(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
            break;
          case 'IsEqual':
            if (val.option) {
              if (!Validator.equals(val.option.one, val.option.two)) {
                errors[validationObj.field] = val.msg;
              }
            }
            break;
          case 'IsMongoId':
            if (!Validator.isMongoId(value)) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsIn':
            if (val.option) {
              if (!Validator.isIn(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
            break;
          case 'IsNumeric':
            if (!Validator.isNumeric(value)) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsDate':
            if (!Validator.isISO8601(value)) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsEmail':
            if (!Validator.isEmail(value)) {
              errors[validationObj.field] = val.msg;
            }
            // else {
            //   const domain = value.split('@')[1];
            //   const d = otherHelper.CheckDisposable(domain);
            //   if (d) {
            //     errors[validationObj.field] = 'Oops!!! Disposable Mail Detected';
            //   }
            // }
            break;
          case 'IsBoolean':
            if (!Validator.isBoolean(value.toString())) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsAfter':
            if (val.option) {
              if (!Validator.isAfter(value, val.option.date)) {
                errors[validationObj.field] = val.msg;
              }
            }
            break;
          case 'IsURL':
            if (val.option) {
              if (!Validator.isURL(value, val.option.protocols)) {
                errors[validationObj.field] = val.msg;
              }
            }
            break;
          case 'IsUppercase':
            if (!Validator.isUppercase(value)) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsJson':
            if (!Validator.isJSON(value)) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsPhone':
            let pn = new PhoneNumber(value);
            if (pn.isValid()) {
              if (val.option) {
                if (val.option.isMobile) {
                  if (!pn.isMobile()) {
                    errors[validationObj.field] = 'Enter mobile number';
                  }
                } else {
                  if (!pn.isFixedLine()) {
                    errors[validationObj.field] = 'Enter landline number';
                  }
                }
              }
            } else {
              errors[validationObj.field] = val.msg;
            }
            break;
          default:
            break;
        }
        if (errors[validationObj.field]) {
          i = validation.length;
        }
      }
    });
    return errors;
  };
module.exports = otherHelper;
