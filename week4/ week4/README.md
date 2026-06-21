# Cybersecurity Internship – Week 4: Advanced Threat Detection & Web Security

## Overview

This project implements advanced security measures for a Node.js/Express API, covering real-time intrusion detection, API security hardening, and HTTP security headers — as required for Week 4 of the Cybersecurity Internship (deadline: June 30, 2026).

## Goal

Implement advanced security measures, detect threats in real-time, and secure API endpoints.

---

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

## Project Structure

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

---

## Screenshots

| # | Description | File |
|---|---|---|
| 1 | Security headers (CSP + HSTS) | `screenshots/01-headers.png` |
| 2 | Successful login with JWT token | `screenshots/02-login-success.png` |
| 3 | Failed login rejected | `screenshots/03-login-failed.png` |
| 4 | Rate limiting blocking brute-force | `screenshots/04-rate-limit.png` |
| 5 | API key protection | `screenshots/05-api-key.png` |
| 6 | Fail2Ban banning IP | `screenshots/06-fail2ban-ban.png` |
| 7 | Server running | `screenshots/07-server-running.png` |
| 8 | Project structure | `screenshots/08-project-structure.png` |

---

## Notes

- `.env` and `node_modules/` excluded from version control.
- Rate-limit counters are in-memory and reset on server restart.
- Fail2Ban requires `backend = polling` and `ignoreself = false` inside WSL2.

## Author

Week 4 – Cybersecurity Internship Project
