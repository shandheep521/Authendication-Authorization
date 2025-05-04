const jwt = require('jsonwebtoken');
const User = require('.Users');

/**
 * Authentication middleware to protect routes
 * Verifies JWT token from request headers
 */
exports.protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password');

    // Check if user exists
    if (!req.user) {
      return res.status(404).json({ 
        success: false,
        message: 'No user found with this ID'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      message: 'Not authorized to access this route',
      error: error.message
    });
  }
};

/**
 * Role-based authorization middleware
 * @param {String} role - Role to check against
 */
exports.authorize = (role) => {
  return (req, res, next) => {
    if (!req.user.role || req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};
