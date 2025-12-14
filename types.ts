export interface Report {
  id: string;
  title: string;
  category: 'Hostel' | 'Academic' | 'Infrastructure' | 'Other';
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  date: string;
}

export interface Event {
  id: string;
  title: string;
  type: 'Exam' | 'Class' | 'Holiday' | 'Deadline' | 'Campus Event';
  date: Date;
  time?: string;
  location?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  type: 'Hackathon' | 'Internship' | 'Workshop';
  companyOrOrg: string;
  date: string;
  tags: string[];
  link: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface MenuItem {
  meal: 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner';
  items: string;
  time: string;
  icon?: any;
}

export interface DailyMenu {
  day: string;
  meals: MenuItem[];
}

export interface CampusEvent {
  id: string;
  title: string;
  category: 'Cultural' | 'Sports' | 'Academic' | 'Club';
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  // Student specific
  rollNumber?: string;
  branch?: string;
  semester?: string;
  section?: string;
  cgpa?: string;
  // Faculty specific
  employeeId?: string;
  department?: string;
  designation?: string;
}

export type UserRole = 'student' | 'faculty';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface OutpassRequest {
  id: string;
  studentName: string;
  studentId: string;
  type: 'Home' | 'City' | 'Emergency';
  reason: string;
  fromDate: string;
  toDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestDate: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Academic' | 'Event' | 'Campus Life' | 'Other';
  date: string; // Display string like "2 hours ago" or "May 20"
  description?: string;
}