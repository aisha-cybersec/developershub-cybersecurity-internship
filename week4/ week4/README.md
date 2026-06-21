# Cybersecurity Internship – Week 4: Advanced Threat Detection & Web Security

## Features Implemented

### 1. Intrusion Detection & Monitoring (Fail2Ban)

- Real-time monitoring of failed login attempts using **Fail2Ban**.
- Custom Fail2Ban filter (`/etc/fail2ban/filter.d/nodejs-auth.conf`) parses the app's security log for failed login patterns.
- Custom jail (`nodejs-auth`) automatically bans an IP after **3 failed login attempts within 10 minutes**, for **1 hour**.
- All failed login attempts are logged via **Winston** to `logs/security.log`.

**Configuration:**

### 2. API Security Hardening

- **Rate limiting** (`express-rate-limit`):
  - Global limit: 100 requests / 15 minutes per IP.
  - Strict login limit: 5 attempts / 15 minutes per IP, to prevent brute-force attacks.
- **CORS**: Configured via the `cors` package to restrict allowed origins, methods, and credentials.
- **Authentication**:
  - JWT-based authentication for protected routes (`/api/protected`).
  - API key authentication for data routes (`/api/data`), validated via `x-api-key` header.

### 3. Security Headers & CSP Implementation

Implemented using **Helmet**:
- **Content-Security-Policy (CSP)**: restricts script/style/object sources to `'self'`, blocks inline scripts, upgrades insecure requests.
- **Strict-Transport-Security (HSTS)**: enforces HTTPS for 1 year, including subdomains, with preload.
- Additional headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `X-XSS-Protection`, and more.

---

## Tech Stack

- Node.js v20 / Express.js
- Helmet (security headers)
- express-rate-limit (rate limiting)
- cors (CORS policy)
- jsonwebtoken (JWT auth)
- Winston (structured logging)
- Fail2Ban (intrusion detection & IP banning)
- Environment: WSL2 (Ubuntu) on Windows

---

## Week 4 tasks wise  Structure 

---

## Setup & Installation

```bash
npm install
node app.js
sudo apt-get install -y fail2ban
sudo service fail2ban start
```

---

## Testing the Implementation

**Health check:**
```bash
curl http://localhost:3000/health
```

**Security headers:**
```bash
curl -I http://localhost:3000/health
```

**Successful login:**
```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"SecurePassword123!"}'
```

**Rate limiting:** Run the failed-login command 6 times in a row.

**API key protection:**
```bash
curl http://localhost:3000/api/data
curl http://localhost:3000/api/data -H "x-api-key: <your-api-key>"
```

**Fail2Ban ban verification:**
```bash
sudo fail2ban-client status nodejs-auth
```

## Notes

- `.env` and `node_modules/` excluded from version control.
- Rate-limit counters are in-memory and reset on server restart.
- Fail2Ban requires `backend = polling` and `ignoreself = false` inside WSL2.

nternship Project
