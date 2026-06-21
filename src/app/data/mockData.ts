// Mock data for the LifeLink emergency dashboard (extracted from App.tsx)

// ── Mock Data ──────────────────────────────────────────────────────────
export const hospitalData = [
  { id: 1, name: "Metro General Hospital", address: "14 Central Ave", icu: 12, general: 48, oxygen: 120, ventilators: 8, doctors: 42, contact: "+1-555-0101", status: "available" },
  { id: 2, name: "St. Luke's Medical Center", address: "7 Harbor Blvd", icu: 3, general: 22, oxygen: 65, ventilators: 3, doctors: 28, contact: "+1-555-0102", status: "limited" },
  { id: 3, name: "Riverside Emergency Clinic", address: "88 River Rd", icu: 0, general: 5, oxygen: 30, ventilators: 1, doctors: 15, contact: "+1-555-0103", status: "critical" },
  { id: 4, name: "Northside Health Complex", address: "221 North Pkwy", icu: 18, general: 73, oxygen: 200, ventilators: 14, doctors: 60, contact: "+1-555-0104", status: "available" },
  { id: 5, name: "Downtown Trauma Center", address: "5 Plaza St", icu: 7, general: 31, oxygen: 88, ventilators: 6, doctors: 35, contact: "+1-555-0105", status: "available" },
];

export const bloodData = [
  { type: "O+", units: 124, hospital: "Metro General", updated: "2 min ago", status: "available" },
  { type: "O-", units: 18, hospital: "St. Luke's", updated: "8 min ago", status: "limited" },
  { type: "A+", units: 87, hospital: "Metro General", updated: "5 min ago", status: "available" },
  { type: "A-", units: 12, hospital: "Northside Health", updated: "15 min ago", status: "limited" },
  { type: "B+", units: 63, hospital: "Downtown Trauma", updated: "1 min ago", status: "available" },
  { type: "B-", units: 8, hospital: "Riverside Clinic", updated: "22 min ago", status: "critical" },
  { type: "AB+", units: 41, hospital: "Northside Health", updated: "4 min ago", status: "available" },
  { type: "AB-", units: 5, hospital: "Metro General", updated: "31 min ago", status: "critical" },
];

export const ambulanceData = [
  { id: "AMB-001", driver: "James Rivera", contact: "+1-555-2001", location: "Central District", status: "available", speed: 0, eta: "4 min", hospital: "Metro General" },
  { id: "AMB-002", driver: "Sarah Chen", contact: "+1-555-2002", location: "Harbor Area", status: "en-route", speed: 62, eta: "7 min", hospital: "St. Luke's" },
  { id: "AMB-003", driver: "Marcus Webb", contact: "+1-555-2003", location: "North Pkwy", status: "available", speed: 0, eta: "9 min", hospital: "Northside Health" },
  { id: "AMB-004", driver: "Priya Patel", contact: "+1-555-2004", location: "River Rd", status: "busy", speed: 78, eta: "12 min", hospital: "Riverside Clinic" },
  { id: "AMB-005", driver: "Carlos Nkosi", contact: "+1-555-2005", location: "Downtown", status: "available", speed: 0, eta: "3 min", hospital: "Downtown Trauma" },
];

export const emergencyRequests = [
  { id: "REQ-4821", patient: "John M.", type: "Cardiac Arrest", blood: "O+", bed: "ICU", ambulance: true, priority: "critical", status: "active", time: "2 min ago" },
  { id: "REQ-4820", patient: "Emma S.", type: "Trauma", blood: "A+", bed: "ICU", ambulance: true, priority: "high", status: "dispatched", time: "8 min ago" },
  { id: "REQ-4819", patient: "Robert K.", type: "Stroke", blood: null, bed: "ICU", ambulance: false, priority: "high", status: "active", time: "15 min ago" },
  { id: "REQ-4818", patient: "Maria L.", type: "Respiratory", blood: "B+", bed: "General", ambulance: true, priority: "medium", status: "resolved", time: "22 min ago" },
  { id: "REQ-4817", patient: "David W.", type: "Fracture", blood: null, bed: "General", ambulance: false, priority: "low", status: "resolved", time: "41 min ago" },
];

export const trendData = [
  { time: "00:00", requests: 12, beds: 85, blood: 91 },
  { time: "04:00", requests: 8, beds: 82, blood: 88 },
  { time: "08:00", requests: 24, beds: 78, blood: 85 },
  { time: "12:00", requests: 41, beds: 71, blood: 79 },
  { time: "16:00", requests: 38, beds: 68, blood: 74 },
  { time: "20:00", requests: 29, beds: 72, blood: 78 },
  { time: "Now", requests: 17, beds: 76, blood: 82 },
];

export const responseTimeData = [
  { day: "Mon", avg: 6.2, target: 8 },
  { day: "Tue", avg: 5.8, target: 8 },
  { day: "Wed", avg: 7.1, target: 8 },
  { day: "Thu", avg: 4.9, target: 8 },
  { day: "Fri", avg: 6.5, target: 8 },
  { day: "Sat", avg: 8.3, target: 8 },
  { day: "Sun", avg: 5.4, target: 8 },
];

export const bedPieData = [
  { name: "ICU Available", value: 40, color: "#10B981" },
  { name: "ICU Occupied", value: 60, color: "#EF4444" },
  { name: "Gen Available", value: 55, color: "#3B82F6" },
  { name: "Gen Occupied", value: 45, color: "#F59E0B" },
];

export const notifications = [
  { id: 1, type: "critical", message: "Critical blood shortage: O- at Riverside Clinic (8 units)", time: "1 min ago" },
  { id: 2, type: "warning", message: "ICU capacity at 94% — Downtown Trauma Center", time: "5 min ago" },
  { id: 3, type: "info", message: "AMB-002 dispatched to Harbor Area emergency", time: "8 min ago" },
  { id: 4, type: "success", message: "Resource resupply confirmed at Metro General", time: "12 min ago" },
  { id: 5, type: "critical", message: "Emergency request REQ-4821 requires immediate ICU bed", time: "14 min ago" },
];
