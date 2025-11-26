// User types
export type UserRole = 'resident' | 'contractor' | 'technician';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
}

export interface ResidentUser extends User {
  role: 'resident';
  unitId: string;
  buildingId: string;
}

export interface ContractorUser extends User {
  role: 'contractor';
  companyId: string;
}

export interface TechnicianUser extends User {
  role: 'technician';
  companyId: string;
  specialization?: string[];
}

// Building & Unit types
export interface Building {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contractorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: string;
  buildingId: string;
  unitNumber: string;
  code: string; // Unique code for resident linkage
  resident?: ResidentUser;
  createdAt: string;
  updatedAt: string;
}

// Service Request types
export type ServiceRequestStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'closed' | 'cancelled';
export type ServiceRequestPriority = 'low' | 'normal' | 'high' | 'urgent';
export type ServiceRequestCategory =
  | 'electrical'
  | 'plumbing'
  | 'structural'
  | 'painting'
  | 'hvac'
  | 'appliances'
  | 'other';

export interface ServiceRequest {
  id: string;
  unitId: string;
  residentId: string;
  title: string;
  description: string;
  category: ServiceRequestCategory;
  priority: ServiceRequestPriority;
  status: ServiceRequestStatus;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

// Appointment types
export interface Appointment {
  id: string;
  serviceRequestId: string;
  technicianId: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in minutes
  notes?: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Rating types
export type RatingScore = 1 | 2 | 3 | 4 | 5;

export interface ServiceRating {
  id: string;
  serviceRequestId: string;
  residentId: string;
  technicianId: string;
  qualityScore: RatingScore;
  speedScore: RatingScore;
  workmanshipScore: RatingScore;
  comment?: string;
  suggestions?: string;
  createdAt: string;
}

// Analytics types
export interface BuildingAnalytics {
  buildingId: string;
  totalRequests: number;
  completedRequests: number;
  averageResponseTime: number; // in hours
  averageResolutionTime: number; // in hours
  avgQualityScore: number;
  avgSpeedScore: number;
  avgWorkmanshipScore: number;
  nps: number; // Net Promoter Score
  maintenanceCost: number;
  topDefects: { category: ServiceRequestCategory; count: number }[];
  updatedAt: string;
}

// Technician Schedule types
export interface TechnicianAvailability {
  id: string;
  technicianId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

export interface TechnicianSchedule {
  technicianId: string;
  availabilitySlots: TechnicianAvailability[];
  blockedDates?: string[]; // ISO date strings
}
