const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_123';

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- AUTH ROUTES ---
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, role: user.role, email: user.email });
  });
});

app.post('/api/auth/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const userRole = role === 'admin' ? 'admin' : 'user';

  db.run('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, userRole], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    
    const token = jwt.sign({ id: this.lastID, email, role: userRole }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, role: userRole, email });
  });
});

// --- HOSPITALS ROUTES ---
app.get('/api/hospitals', authenticateToken, (req, res) => {
  db.all('SELECT * FROM hospitals', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/hospitals', authenticateToken, (req, res) => {
  const { name, address, icu, general, oxygen, ventilators, doctors, contact, status } = req.body;
  db.run('INSERT INTO hospitals (name, address, icu, general, oxygen, ventilators, doctors, contact, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, address, icu, general, oxygen, ventilators, doctors, contact, status], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, address, icu, general, oxygen, ventilators, doctors, contact, status });
  });
});

// --- BLOOD INVENTORY ROUTES ---
app.get('/api/blood', authenticateToken, (req, res) => {
  db.all('SELECT * FROM blood_inventory', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/blood', authenticateToken, (req, res) => {
  const { type, units, hospital, status } = req.body;
  const updated = "Just now";
  db.run('INSERT INTO blood_inventory (type, units, hospital, updated, status) VALUES (?, ?, ?, ?, ?)',
    [type, units, hospital, updated, status], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, type, units, hospital, updated, status });
  });
});

// --- AMBULANCES ROUTES ---
app.get('/api/ambulances', authenticateToken, (req, res) => {
  db.all('SELECT * FROM ambulances', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/ambulances', authenticateToken, (req, res) => {
  const { id, driver, contact, location, status, speed, eta, hospital } = req.body;
  db.run('INSERT INTO ambulances (id, driver, contact, location, status, speed, eta, hospital) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, driver, contact, location, status, speed, eta, hospital], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, driver, contact, location, status, speed, eta, hospital });
  });
});

// --- EMERGENCY REQUESTS ROUTES ---
app.get('/api/emergencies', authenticateToken, (req, res) => {
  db.all('SELECT * FROM emergency_requests', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/emergencies', authenticateToken, (req, res) => {
  const { id, patient, type, blood, bed, ambulance, priority, status } = req.body;
  const time = "Just now";
  db.run('INSERT INTO emergency_requests (id, patient, type, blood, bed, ambulance, priority, status, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [id, patient, type, blood, bed, ambulance, priority, status, time], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, patient, type, blood, bed, ambulance, priority, status, time });
  });
});

// --- SETTINGS ROUTES ---
app.get('/api/settings', authenticateToken, (req, res) => {
  db.get('SELECT * FROM user_settings WHERE user_id = ?', [req.user.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) {
      // Return defaults if no settings row exists
      return res.json({
        "Real-time Updates": true,
        "Emergency Alerts": true,
        "GPS Tracking": true,
        "AI Auto-Recommend": true,
      });
    }
    // Map DB columns to frontend-friendly keys
    res.json({
      "Real-time Updates": !!row.realtime_updates,
      "Emergency Alerts": !!row.emergency_alerts,
      "GPS Tracking": !!row.gps_tracking,
      "AI Auto-Recommend": !!row.ai_auto_recommend,
    });
  });
});

app.put('/api/settings', authenticateToken, (req, res) => {
  const settings = req.body;
  const realtime = settings["Real-time Updates"] ? 1 : 0;
  const alerts = settings["Emergency Alerts"] ? 1 : 0;
  const gps = settings["GPS Tracking"] ? 1 : 0;
  const ai = settings["AI Auto-Recommend"] ? 1 : 0;

  // Upsert: insert or replace the settings for this user
  db.run(
    `INSERT INTO user_settings (user_id, realtime_updates, emergency_alerts, gps_tracking, ai_auto_recommend)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(user_id) DO UPDATE SET
       realtime_updates = excluded.realtime_updates,
       emergency_alerts = excluded.emergency_alerts,
       gps_tracking = excluded.gps_tracking,
       ai_auto_recommend = excluded.ai_auto_recommend`,
    [req.user.id, realtime, alerts, gps, ai],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        "Real-time Updates": !!realtime,
        "Emergency Alerts": !!alerts,
        "GPS Tracking": !!gps,
        "AI Auto-Recommend": !!ai,
      });
    }
  );
});

// --- NOTIFICATIONS ROUTES ---
app.get('/api/notifications', authenticateToken, (req, res) => {
  db.all('SELECT * FROM notifications ORDER BY id DESC LIMIT 20', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
