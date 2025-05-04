const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token
 * @param {Object} user - User object containing id
 * @returns {String} JWT token
 */
exports.generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};
