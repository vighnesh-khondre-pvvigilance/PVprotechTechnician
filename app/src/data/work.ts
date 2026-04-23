// src/data/work.ts

const today =
  new Date()
    .toISOString()
    .split("T")[0];

export const workData = [
  // =====================================
  // COMPLETED TASKS
  // =====================================

  {
    id: "1",
    technicianId: "tech001",
    clientId: "c1",
    clientName: "Sharma Group",

    title: "Solar Panel Inspection",
    plantName: "Sharma Solar Plant",
    ownerName: "Mr. Sharma",

    location: "Pune Site A",
    capacity: "10kW",

    status: "Completed",
    adminApproval: "Approved",
    priority: "Medium",
    visitType: "Inspection",

    assignedDate: "2026-04-15",
    completedDate: today,

    issue:
      "Dust accumulation reducing efficiency",

    beforeImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276",

    afterImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276",
  },

  {
    id: "2",
    technicianId: "tech001",
    clientId: "c2",
    clientName: "Patil Industries",

    title: "Inverter Maintenance",
    plantName: "Patil Solar Plant",
    ownerName: "Mr. Patil",

    location: "Pune Site B",
    capacity: "15kW",

    status: "Completed",
    adminApproval: "Approved",
    priority: "High",
    visitType: "Maintenance",

    assignedDate: "2026-04-14",
    completedDate: today,

    issue:
      "Inverter fault E23 resolved",

    beforeImage:
      "https://via.placeholder.com/300",

    afterImage:
      "https://via.placeholder.com/300",
  },

  {
    id: "3",
    technicianId: "tech001",
    clientId: "c3",
    clientName: "Joshi Agro",

    title: "Battery Health Check",
    plantName: "Joshi Farm Solar",
    ownerName: "Mr. Joshi",

    location: "Nashik Site",
    capacity: "12kW",

    status: "Completed",
    adminApproval: "Approved",
    priority: "Low",
    visitType: "Battery Service",

    assignedDate: "2026-04-10",
    completedDate: "2026-04-11",

    issue:
      "Battery voltage imbalance fixed",

    beforeImage:
      "https://via.placeholder.com/300",

    afterImage:
      "https://via.placeholder.com/300",
  },

  // =====================================
  // PENDING TASKS - TECH001
  // =====================================

  {
    id: "4",
    technicianId: "tech001",
    clientId: "c4",
    clientName: "More Enterprises",

    title: "Inverter Installation",
    plantName: "More Solar Plant",
    ownerName: "Mr. More",

    location: "Pune Site D",
    capacity: "18kW",

    status: "Pending",
    adminApproval: "Pending",
    priority: "High",
    visitType: "Installation",

    assignedDate: today,

    issue:
      "New inverter setup required",

    beforeImage: "",
    afterImage: "",
  },

  {
    id: "5",
    technicianId: "tech001",
    clientId: "c5",
    clientName: "Jadhav Infra",

    title: "Cable Fault Check",
    plantName: "Jadhav Solar",
    ownerName: "Mr. Jadhav",

    location: "Satara Site",
    capacity: "9kW",

    status: "Pending",
    adminApproval: "Pending",
    priority: "High",
    visitType: "Repair",

    assignedDate: today,

    issue:
      "Cable overheating issue",

    beforeImage: "",
    afterImage: "",
  },

  {
    id: "6",
    technicianId: "tech001",
    clientId: "c6",
    clientName: "Pawar Industries",

    title: "System Audit",
    plantName: "Pawar Solar",
    ownerName: "Mr. Pawar",

    location: "Kolhapur Site",
    capacity: "25kW",

    status: "Pending",
    adminApproval: "Pending",
    priority: "Medium",
    visitType: "Audit",

    assignedDate: today,

    issue:
      "Low generation issue",

    beforeImage: "",
    afterImage: "",
  },

  // =====================================
  // TATA SOLAR (MULTIPLE PLANTS)
  // =====================================

  {
    id: "7",
    technicianId: "tech001",
    clientId: "c7",
    clientName: "Tata Solar",

    title: "Routine Cleaning",
    plantName: "Tata Plant Pune",
    ownerName: "Site Manager",

    location: "Chakan Pune",
    capacity: "250kW",

    status: "Pending",
    adminApproval: "Pending",
    priority: "Low",
    visitType: "Cleaning",

    assignedDate: today,

    issue:
      "Monthly scheduled cleaning",

    beforeImage: "",
    afterImage: "",
  },

  {
    id: "8",
    technicianId: "tech001",
    clientId: "c7",
    clientName: "Tata Solar",

    title: "Monthly Inspection",
    plantName: "Tata Chakan Plant",
    ownerName: "Operations Head",

    location: "Chakan MIDC",
    capacity: "500kW",

    status: "Pending",
    adminApproval: "Pending",
    priority: "High",
    visitType: "Inspection",

    assignedDate: today,

    issue:
      "Routine monthly inspection",

    beforeImage: "",
    afterImage: "",
  },

  {
    id: "9",
    technicianId: "tech001",
    clientId: "c7",
    clientName: "Tata Solar",

    title: "Panel Cleaning",
    plantName: "Tata Warehouse Plant",
    ownerName: "Warehouse Admin",

    location: "Bhosari Pune",
    capacity: "150kW",

    status: "Pending",
    adminApproval: "Pending",
    priority: "Medium",
    visitType: "Cleaning",

    assignedDate: today,

    issue:
      "Dust accumulation",

    beforeImage: "",
    afterImage: "",
  },

  {
    id: "10",
    technicianId: "tech001",
    clientId: "c7",
    clientName: "Tata Solar",

    title: "Inverter Check",
    plantName: "Tata MIDC Plant",
    ownerName: "Electrical Head",

    location: "Pimpri MIDC",
    capacity: "300kW",

    status: "Completed",
    adminApproval: "Pending",
    priority: "Low",
    visitType: "Maintenance",

    assignedDate: today,

    issue:
      "Periodic inverter service",

    beforeImage: "",
    afterImage: "",
  },

  // =====================================
  // RELIANCE (TECH002)
  // =====================================

  {
    id: "11",
    technicianId: "tech002",
    clientId: "c8",
    clientName: "Reliance Energy",

    title: "String Fault Inspection",
    plantName: "Reliance Rooftop",

    ownerName: "Plant Head",

    location: "Mumbai Warehouse",
    capacity: "100kW",

    status: "Completed",
    adminApproval: "Pending",
    priority: "High",
    visitType: "Inspection",

    assignedDate: today,

    issue:
      "String 2 not generating",

    beforeImage: "",
    afterImage: "",
  },
];