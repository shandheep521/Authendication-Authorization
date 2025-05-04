const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} = require('Controllers');
const { protect } = require('auth');
const {
  registerValidation,
  loginValidation,
  updateProfileValidation
} = require('middleware');

// Public routes
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateProfileValidation, updateUserProfile);

module.exports = router;
