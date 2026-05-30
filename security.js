// Week 2 - Security Implementation
// DevelopersHub Cybersecurity Internship

const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');

// 1. Input Validation using validator
function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return false;
  }
  return true;
}

// 2. Password Hashing using bcrypt
async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// 3. JWT Token Generation
function generateToken(userId) {
  const token = jwt.sign(
    { id: userId },
    'secret-key-developershub',
    { expiresIn: '24h' }
  );
  return token;
}

// 4. Helmet.js for HTTP Security Headers
function applyHelmet(app) {
  app.use(helmet());
}

module.exports = {
  validateEmail,
  hashPassword,
  generateToken,
  applyHelmet
};
