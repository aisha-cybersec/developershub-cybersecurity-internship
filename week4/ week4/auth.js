const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const getIP = (req) => req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  const ip = getIP(req);

  if (!username || !password) {
    logger.warn(`Failed login attempt from IP: ${ip} - missing credentials`);
    return res.status(400).json({ error: 'Username and password required' });
  }

  if (username !== 'admin' || password !== 'SecurePassword123!') {
    logger.warn(`Failed login attempt from IP: ${ip} - invalid credentials for user ${username}`);
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  logger.info(`Successful login for ${username} from IP: ${ip}`);
  const token = jwt.sign({ username, ip }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token, expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = { validateLogin, verifyToken };

