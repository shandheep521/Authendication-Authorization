const { body } = require('express-validator');

/**
 * Validation rules for user registration
 */
exports.registerValidation = [
  body('username')
    .not().isEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  
  body('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),
  
  body('password')
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

/**
 * Validation rules for user login
 */
exports.loginValidation = [
  body('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),
  
  body('password')
    .not().isEmpty().withMessage('Password is required')
];

/**
 * Validation rules for profile update
 */
exports.updateProfileValidation = [
  body('username')
    .optional()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  
  body('email')
    .optional()
    .isEmail().withMessage('Please enter a valid email address'),
  
  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];
