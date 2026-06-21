const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const logger = require('./config/logger');
const { validateLogin, verifyToken } = require('./middleware/auth');
const verifyApiKey = require('./middleware/apiKey');

dotenv.config();
const app = express();

// --- Security Headers: CSP + HSTS ---
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// --- CORS ---
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// --- Rate limiting: global ---
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// --- Rate limiting: login (strict, anti brute-force) ---
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, try again later.'
});

app.get('/health', (req, res) => res.json({ status: 'OK' }));

app.post('/api/auth/login', authLimiter, validateLogin);

app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected resource', user: req.user });
});

app.get('/api/data', verifyApiKey, (req, res) => {
  res.json({ message: 'Accessed with valid API key', data: [1, 2, 3] });
});

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

module.exports = app;
