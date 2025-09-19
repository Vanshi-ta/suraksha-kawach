export enum UserRole {
  Student = 'Student',
  Teacher = 'Teacher',
  Administrator = 'Administrator'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  xp?: number;
  level?: number;
  email?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (identifier: string, role: UserRole, password: string) => boolean;
  logout: () => void;
  addXp: (amount: number) => void;
  updateUser: (updatedData: Partial<User>) => void;
  register: (details: { name: string; email: string; password: string; role: UserRole; schoolId?: string }) => Promise<{ success: boolean; message: string; }>;
  deleteAccount: () => void;
}

export interface OnboardingContextType {
  isTourOpen: boolean;
  startTour: () => void;
  stopTour: () => void;
}

// Course Module structure for Gyan Kendra cards
export interface CourseModule {
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  keyTopics: string[];
  videoUrl?: string; // Field for tutorial video
  youtubeUrl?: string; // Field for YouTube video link
}

// Detailed course content structure for individual course pages
export interface CourseContentSection {
  title: string;
  content: string;
  image?: string;
}

export interface CourseContent {
  id: string; // matches slug from CourseModule
  title: string;
  sections: CourseContentSection[];
  readMoreUrl?: string;
}

// Quiz structure for Abhyas Arena
export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string; // Added for scenario feedback
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

// Game: Hazard Hunt
export interface Hazard {
  id: string;
  label: string; // for accessibility
  x: number; // Percentage
  y: number; // Percentage
  radius: number; // Clickable radius as a percentage of the container's width
  tipKey: string;
}

// Student Report Structure
export interface QuizPerformance {
    topic: string;
    score: number;
}

export interface StudentReport {
    id: string;
    name: string;
    avatar: string;
    progress: number;
    lastActive: string;
    xp: number;
    level: number;
    modulesCompleted: string[];
    badges: string[];
    quizPerformance: QuizPerformance[];
}

// Teacher Assignments
export interface Assignment {
  id: string;
  title: string;
  type: 'module' | 'quiz';
  contentId: string; // slug for module, id for quiz
  dueDate: string; // ISO string date
  assignedBy: string; // Teacher's ID
}

// Virtual Drill for Abhyas Arena
export interface DrillStepOption {
  textKey: string;
  isCorrect: boolean;
  feedbackKey: string;
}

export interface DrillStep {
  step: number;
  situationKey: string;
  image: string;
  options: DrillStepOption[];
}

export interface DrillScenario {
  id: string;
  titleKey: string;
  scenario: DrillStep[];
}