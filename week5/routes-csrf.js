const express = require('express');
const csrf = require('csurf');
const router = express.Router();

const csrfProtection = csrf({ cookie: false });

let profile = { email: 'admin@example.com' };

// Provides a CSRF token the legitimate frontend must include in requests
router.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

router.get('/api/profile', (req, res) => {
  res.json({ profile });
});

// Now protected: requires a valid CSRF token, rejects forged cross-site requests
router.post('/api/profile/update-email', csrfProtection, (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  profile.email = email;
  res.json({ message: 'Email updated', profile });
});

module.exports = router;