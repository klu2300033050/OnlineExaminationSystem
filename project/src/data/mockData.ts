// Mock data for teacher exams
export const mockExams = [
  {
    id: 'exam1',
    title: 'Algebra Midterm Exam',
    subject: 'Mathematics',
    createdAt: 'May 10, 2025',
    duration: 60,
    status: 'active',
    submissions: 15,
    totalStudents: 25
  },
  {
    id: 'exam2',
    title: 'Introduction to Literature',
    subject: 'English',
    createdAt: 'May 5, 2025',
    duration: 45,
    status: 'completed',
    submissions: 22,
    totalStudents: 22
  },
  {
    id: 'exam3',
    title: 'Cell Biology Quiz',
    subject: 'Biology',
    createdAt: 'May 8, 2025',
    duration: 30,
    status: 'draft',
    submissions: 0,
    totalStudents: 18
  },
  {
    id: 'exam4',
    title: 'World History Final',
    subject: 'History',
    createdAt: 'May 1, 2025',
    duration: 90,
    status: 'active',
    submissions: 8,
    totalStudents: 20
  },
  {
    id: 'exam5',
    title: 'Chemistry Lab Assessment',
    subject: 'Chemistry',
    createdAt: 'April 28, 2025',
    duration: 120,
    status: 'active',
    submissions: 12,
    totalStudents: 15
  }
];

// Mock data for student exams
export const mockStudentExams = [
  {
    id: 'exam1',
    title: 'Algebra Midterm Exam',
    subject: 'Mathematics',
    instructor: 'Dr. John Smith',
    date: 'May 20, 2025',
    time: '10:00 AM',
    duration: 60,
    status: 'upcoming',
    isActive: true
  },
  {
    id: 'exam2',
    title: 'Introduction to Literature',
    subject: 'English',
    instructor: 'Prof. Sarah Johnson',
    date: 'May 22, 2025',
    time: '2:00 PM',
    duration: 45,
    status: 'upcoming',
    isActive: false
  },
  {
    id: 'exam3',
    title: 'Cell Biology Quiz',
    subject: 'Biology',
    instructor: 'Dr. Michael Chen',
    date: 'May 25, 2025',
    time: '9:00 AM',
    duration: 30,
    status: 'upcoming',
    isActive: false
  },
  {
    id: 'exam4',
    title: 'Physics Principles',
    subject: 'Physics',
    completedDate: 'May 5, 2025',
    score: 78,
    totalPoints: 100,
    scorePercentage: 78,
    status: 'completed'
  },
  {
    id: 'exam5',
    title: 'Computer Science Fundamentals',
    subject: 'Computer Science',
    completedDate: 'April 28, 2025',
    score: 95,
    totalPoints: 100,
    scorePercentage: 95,
    status: 'completed'
  },
  {
    id: 'exam6',
    title: 'Chemistry Basics',
    subject: 'Chemistry',
    completedDate: 'April 15, 2025',
    score: 45,
    totalPoints: 100,
    scorePercentage: 45,
    status: 'completed'
  }
];