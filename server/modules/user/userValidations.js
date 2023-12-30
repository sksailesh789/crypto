const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const config = require('./userConfig.js');
const otherHelper = require('../../helper/others.helper');
const validations = {};

validations.sanitizeRegister = (req, res, next) => {
    const sanitizeArray = [
        {
            field: 'name',
            sanitize: {
              trim: true,
            },
        },
        {
            field: 'email',
            sanitize: {
            trim: true,
            },
        },
        {
            field: 'password',
            sanitize: {
            trim: true,
            },
        },
    ];
    otherHelper.sanitize(req, sanitizeArray);
    next();
  };
  validations.sanitizeLogin = (req, res, next) => {
    const sanitizeArray = [
      {
        field: 'email',
        sanitize: {
          trim: true,
        },
      },
      {
        field: 'password',
        sanitize: {
        trim: true,
        },
    },
    ];
    otherHelper.sanitize(req, sanitizeArray);
    next();
  };


validations.validateLoginInput = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsEmail',
          msg: config.validate.isEmail,
        },
      ],
    },
    {
      field: 'password',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.passLength,
          option: { min: 6, max: 30 },
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.invalidInput, null);
  } else {
    next();
  }
};

validations.validateRegisterInput = async (req, res, next) => {
    let data = req.body;
    const validateArray = [
      {
        field: 'name',
        validate: [
          {
            condition: 'IsEmpty',
            msg: config.validate.empty,
          },
          {
            condition: 'IsLength',
            msg: config.validate.nameLength,
            option: { min: 2, max: 30 },
          },
        ],
      },
      {
        field: 'email',
        validate: [
          {
            condition: 'IsEmpty',
            msg: config.validate.empty,
          },
          {
            condition: 'IsEmail',
            msg: config.validate.isEmail,
          },
        ],
      },
      {
        field: 'password',
        validate: [
          {
            condition: 'IsEmpty',
            msg: config.validate.empty,
          },
          {
            condition: 'IsLength',
            msg: config.validate.passLength,
            option: { min: 6, max: 30 },
          },
        ],
      },
    ];
  const errors = otherHelper.validation(data, validateArray);

    if (!isEmpty(errors)) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.invalidInput, null);
    } else {
      next();
    }
  };
module.exports = validations;
