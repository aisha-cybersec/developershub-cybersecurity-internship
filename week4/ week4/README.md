# Cybersecurity Internship – Week 4
## Advanced Threat Detection & Web Security

A Node.js/Express API implementing real-time intrusion detection, API hardening, and security headers.

---

## Features

### 1. Intrusion Detection (Fail2Ban)
- Real-time monitoring of failed login attempts via Fail2Ban.
- Custom filter (`/etc/fail2ban/filter.d/nodejs-auth.conf`) detects failed-login patterns in the app log.
- Custom jail (`nodejs-auth`) bans an IP after **3 failed attempts in 10 minutes**, for **1 hour**.
- Failed attempts logged via Winston to `logs/security.log`.
- 
### 2. API Security Hardening
- **Rate limiting**: 100 req/15min globally; 5 req/15min on login (brute-force protection).
- **CORS**: restricted origins, methods, and credentials.
- **Authentication**: JWT for protected routes, API key (`x-api-key` header) for data routes.

### 3. Security Headers & CSP
Implemented via Helmet:
- **CSP**: restricts scripts/styles/objects to `'self'`, blocks inline scripts.
- **HSTS**: enforces HTTPS for 1 year, includes subdomains, preload-ready.
- Plus `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and more.

---

## Tech Stack

Node.js · Express · Helmet · express-rate-limit · cors · jsonwebtoken · Winston · Fail2Ban · WSL2 (Ubuntu)

---

## Setup

```bash
npm install
node app.js
sudo apt-get install -y fail2ban
sudo service fail2ban start
```

---

## Testing

```bash
# Health check
curl http://localhost:3000/health

# Security headers
curl -I http://localhost:3000/health

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"SecurePassword123!"}'

# Rate limiting — run 6x to trigger the block
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"wrong"}'

# API key
curl http://localhost:3000/api/data
curl http://localhost:3000/api/data -H "x-api-key: <your-api-key>"

# Fail2Ban status
sudo fail2ban-client status nodejs-auth
```

---

## Notes

- `.env` and `node_modules/` excluded from version control.
- Rate-limit counters are in-memory; reset on server restart.
- Fail2Ban requires `backend = polling` and `ignoreself = false` under WSL2.

---

**Week 4 Tasks  in Cybersecurity Internship  is Completed**
