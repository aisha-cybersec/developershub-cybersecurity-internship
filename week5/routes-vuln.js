cat > routes-vuln.js << 'EOF'
const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/api/products/search', (req, res) => {
  const term = req.query.name || '';
  const query = `SELECT * FROM products WHERE name LIKE '%${term}%'`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results: rows });
  });
});

module.exports = router;
EOF