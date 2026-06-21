const logger = require('../config/logger');

const verifyApiKey = (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (!key || key !== process.env.API_KEY) {
    logger.warn(`Blocked request - invalid API key from IP: ${req.ip}`);
    return res.status(401).json({ error: 'Invalid or missing API key' });
  }
  next();
};

module.exports = verifyApiKey;
