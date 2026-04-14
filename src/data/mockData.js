export const mockDevices = [
  { id: 'DEV-001', name: 'Monitor Alpha', status: 'Active', babyId: 'B-101', babyName: 'Baby Smith' },
  { id: 'DEV-002', name: 'Monitor Beta', status: 'Active', babyId: 'B-102', babyName: 'Baby Johnson' },
  { id: 'DEV-003', name: 'Monitor Gamma', status: 'Offline', babyId: null, babyName: 'N/A' },
  { id: 'DEV-004', name: 'Monitor Delta', status: 'Active', babyId: 'B-103', babyName: 'Baby Davis' },
];

export const mockBabies = {
  'B-101': { id: 'B-101', name: 'Baby Smith', parent: 'Alice Smith', assignedStaff: 'Dr. Adams', vitals: { temp: 36.6, respRate: 42, heartRate: 140, spo2: 96 } },
  'B-102': { id: 'B-102', name: 'Baby Johnson', parent: 'Bob Johnson', assignedStaff: 'Nurse Betty', vitals: { temp: 37.8, respRate: 58, heartRate: 165, spo2: 94 } },
  'B-103': { id: 'B-103', name: 'Baby Davis', parent: 'Carol Davis', assignedStaff: 'Dr. Evans', vitals: { temp: 36.5, respRate: 40, heartRate: 135, spo2: 98 } }
};
