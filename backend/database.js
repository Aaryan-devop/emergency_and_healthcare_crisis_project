const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database connected');
    initDb();
  }
});

function initDb() {
  db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT
    )`);

    // Hospitals table
    db.run(`CREATE TABLE IF NOT EXISTS hospitals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      address TEXT,
      icu INTEGER,
      general INTEGER,
      oxygen INTEGER,
      ventilators INTEGER,
      doctors INTEGER,
      contact TEXT,
      status TEXT
    )`);

    // Blood table
    db.run(`CREATE TABLE IF NOT EXISTS blood_inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      units INTEGER,
      hospital TEXT,
      updated TEXT,
      status TEXT
    )`);

    // Ambulances table
    db.run(`CREATE TABLE IF NOT EXISTS ambulances (
      id TEXT PRIMARY KEY,
      driver TEXT,
      contact TEXT,
      location TEXT,
      status TEXT,
      speed INTEGER,
      eta TEXT,
      hospital TEXT
    )`);

    // Emergency Requests table
    db.run(`CREATE TABLE IF NOT EXISTS emergency_requests (
      id TEXT PRIMARY KEY,
      patient TEXT,
      type TEXT,
      blood TEXT,
      bed TEXT,
      ambulance BOOLEAN,
      priority TEXT,
      status TEXT,
      time TEXT
    )`);

    // Notifications table
    db.run(`CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      message TEXT,
      time TEXT
    )`);

    // Seed data if empty
    db.get('SELECT COUNT(*) as count FROM hospitals', (err, row) => {
      if (row.count === 0) {
        seedData();
      }
    });
  });
}

async function seedData() {
  console.log('Seeding initial data...');
  
  // Seed admin user
  const adminHash = await bcrypt.hash('admin123', 10);
  db.run('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', ['admin@lifelink.health', adminHash, 'admin']);
  
  const staffHash = await bcrypt.hash('staff123', 10);
  db.run('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', ['staff@hospital.org', staffHash, 'user']);

  const hospitals = [
    { name: "Metro General Hospital", address: "14 Central Ave", icu: 12, general: 48, oxygen: 120, ventilators: 8, doctors: 42, contact: "+1-555-0101", status: "available" },
    { name: "St. Luke's Medical Center", address: "7 Harbor Blvd", icu: 3, general: 22, oxygen: 65, ventilators: 3, doctors: 28, contact: "+1-555-0102", status: "limited" },
    { name: "Riverside Emergency Clinic", address: "88 River Rd", icu: 0, general: 5, oxygen: 30, ventilators: 1, doctors: 15, contact: "+1-555-0103", status: "critical" },
    { name: "Northside Health Complex", address: "221 North Pkwy", icu: 18, general: 73, oxygen: 200, ventilators: 14, doctors: 60, contact: "+1-555-0104", status: "available" },
    { name: "Downtown Trauma Center", address: "5 Plaza St", icu: 7, general: 31, oxygen: 88, ventilators: 6, doctors: 35, contact: "+1-555-0105", status: "available" },
  ];
  
  const insertHospital = db.prepare('INSERT INTO hospitals (name, address, icu, general, oxygen, ventilators, doctors, contact, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  hospitals.forEach(h => insertHospital.run(h.name, h.address, h.icu, h.general, h.oxygen, h.ventilators, h.doctors, h.contact, h.status));
  insertHospital.finalize();

  const blood = [
    { type: "O+", units: 124, hospital: "Metro General", updated: "2 min ago", status: "available" },
    { type: "O-", units: 18, hospital: "St. Luke's", updated: "8 min ago", status: "limited" },
    { type: "A+", units: 87, hospital: "Metro General", updated: "5 min ago", status: "available" },
    { type: "A-", units: 12, hospital: "Northside Health", updated: "15 min ago", status: "limited" },
    { type: "B+", units: 63, hospital: "Downtown Trauma", updated: "1 min ago", status: "available" },
    { type: "B-", units: 8, hospital: "Riverside Clinic", updated: "22 min ago", status: "critical" },
    { type: "AB+", units: 41, hospital: "Northside Health", updated: "4 min ago", status: "available" },
    { type: "AB-", units: 5, hospital: "Metro General", updated: "31 min ago", status: "critical" },
  ];
  
  const insertBlood = db.prepare('INSERT INTO blood_inventory (type, units, hospital, updated, status) VALUES (?, ?, ?, ?, ?)');
  blood.forEach(b => insertBlood.run(b.type, b.units, b.hospital, b.updated, b.status));
  insertBlood.finalize();

  const ambulances = [
    { id: "AMB-001", driver: "James Rivera", contact: "+1-555-2001", location: "Central District", status: "available", speed: 0, eta: "4 min", hospital: "Metro General" },
    { id: "AMB-002", driver: "Sarah Chen", contact: "+1-555-2002", location: "Harbor Area", status: "en-route", speed: 62, eta: "7 min", hospital: "St. Luke's" },
    { id: "AMB-003", driver: "Marcus Webb", contact: "+1-555-2003", location: "North Pkwy", status: "available", speed: 0, eta: "9 min", hospital: "Northside Health" },
    { id: "AMB-004", driver: "Priya Patel", contact: "+1-555-2004", location: "River Rd", status: "busy", speed: 78, eta: "12 min", hospital: "Riverside Clinic" },
    { id: "AMB-005", driver: "Carlos Nkosi", contact: "+1-555-2005", location: "Downtown", status: "available", speed: 0, eta: "3 min", hospital: "Downtown Trauma" },
  ];

  const insertAmb = db.prepare('INSERT INTO ambulances (id, driver, contact, location, status, speed, eta, hospital) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  ambulances.forEach(a => insertAmb.run(a.id, a.driver, a.contact, a.location, a.status, a.speed, a.eta, a.hospital));
  insertAmb.finalize();

  const emergencies = [
    { id: "REQ-4821", patient: "John M.", type: "Cardiac Arrest", blood: "O+", bed: "ICU", ambulance: true, priority: "critical", status: "active", time: "2 min ago" },
    { id: "REQ-4820", patient: "Emma S.", type: "Trauma", blood: "A+", bed: "ICU", ambulance: true, priority: "high", status: "dispatched", time: "8 min ago" },
    { id: "REQ-4819", patient: "Robert K.", type: "Stroke", blood: null, bed: "ICU", ambulance: false, priority: "high", status: "active", time: "15 min ago" },
    { id: "REQ-4818", patient: "Maria L.", type: "Respiratory", blood: "B+", bed: "General", ambulance: true, priority: "medium", status: "resolved", time: "22 min ago" },
    { id: "REQ-4817", patient: "David W.", type: "Fracture", blood: null, bed: "General", ambulance: false, priority: "low", status: "resolved", time: "41 min ago" },
  ];

  const insertEmerg = db.prepare('INSERT INTO emergency_requests (id, patient, type, blood, bed, ambulance, priority, status, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  emergencies.forEach(e => insertEmerg.run(e.id, e.patient, e.type, e.blood, e.bed, e.ambulance, e.priority, e.status, e.time));
  insertEmerg.finalize();
  
  const notifications = [
    { type: "critical", message: "Critical blood shortage: O- at Riverside Clinic (8 units)", time: "1 min ago" },
    { type: "warning", message: "ICU capacity at 94% — Downtown Trauma Center", time: "5 min ago" },
    { type: "info", message: "AMB-002 dispatched to Harbor Area emergency", time: "8 min ago" },
    { type: "success", message: "Resource resupply confirmed at Metro General", time: "12 min ago" },
    { type: "critical", message: "Emergency request REQ-4821 requires immediate ICU bed", time: "14 min ago" },
  ];
  
  const insertNotif = db.prepare('INSERT INTO notifications (type, message, time) VALUES (?, ?, ?)');
  notifications.forEach(n => insertNotif.run(n.type, n.message, n.time));
  insertNotif.finalize();
}

module.exports = db;
