// API endpoints
export const API_ENDPOINTS = {
  AUTH: '/auth',
  USERS: '/users',
  BUILDINGS: '/buildings',
  UNITS: '/units',
  SERVICE_REQUESTS: '/service-requests',
  APPOINTMENTS: '/appointments',
  RATINGS: '/ratings',
  ANALYTICS: '/analytics',
};

// Service request categories
export const SERVICE_CATEGORIES = {
  ELECTRICAL: 'electrical',
  PLUMBING: 'plumbing',
  STRUCTURAL: 'structural',
  PAINTING: 'painting',
  HVAC: 'hvac',
  APPLIANCES: 'appliances',
  OTHER: 'other',
};

export const SERVICE_CATEGORIES_LABELS: { [key: string]: string } = {
  electrical: 'Elétrico',
  plumbing: 'Encanamento',
  structural: 'Estrutural',
  painting: 'Pintura',
  hvac: 'Ar Condicionado/Aquecimento',
  appliances: 'Eletrodomésticos',
  other: 'Outro',
};

// Service request status
export const SERVICE_STATUS = {
  OPEN: 'open',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CLOSED: 'closed',
  CANCELLED: 'cancelled',
};

export const SERVICE_STATUS_LABELS: { [key: string]: string } = {
  open: 'Aberta',
  assigned: 'Atribuída',
  in_progress: 'Em Progresso',
  completed: 'Concluída',
  closed: 'Fechada',
  cancelled: 'Cancelada',
};

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const PRIORITY_LABELS: { [key: string]: string } = {
  low: 'Baixa',
  normal: 'Normal',
  high: 'Alta',
  urgent: 'Urgente',
};

// User roles
export const USER_ROLES = {
  RESIDENT: 'resident',
  CONTRACTOR: 'contractor',
  TECHNICIAN: 'technician',
};

export const USER_ROLES_LABELS: { [key: string]: string } = {
  resident: 'Morador',
  contractor: 'Construtora',
  technician: 'Técnico',
};

// Appointment status
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const APPOINTMENT_STATUS_LABELS: { [key: string]: string } = {
  scheduled: 'Agendado',
  confirmed: 'Confirmado',
  completed: 'Concluído',
  cancelled: 'Cancelado',
};

// Validation rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  UNIT_CODE_LENGTH: 10,
  PHONE_LENGTH: 11,
};

// Timeouts and intervals (in milliseconds)
export const TIMING = {
  REQUEST_TIMEOUT: 10000,
  DEBOUNCE_DELAY: 300,
  REFRESH_INTERVAL: 30000,
};
