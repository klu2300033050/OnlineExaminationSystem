import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import ExamCreation from './pages/teacher/ExamCreation';
import ExamTaking from './pages/student/ExamTaking';
import ResultsPage from './pages/student/ResultsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Teacher Routes */}
          <Route 
            path="/teacher/*" 
            element={
              <ProtectedRoute role="teacher">
                <Routes>
                  <Route path="/" element={<TeacherDashboard />} />
                  <Route path="/create-exam" element={<ExamCreation />} />
                  <Route path="/exams/:examId" element={<ExamCreation />} />
                </Routes>
              </ProtectedRoute>
            } 
          />
          
          {/* Student Routes */}
          <Route 
            path="/student/*" 
            element={
              <ProtectedRoute role="student">
                <Routes>
                  <Route path="/" element={<StudentDashboard />} />
                  <Route path="/exam/:examId" element={<ExamTaking />} />
                  <Route path="/results/:examId" element={<ResultsPage />} />
                </Routes>
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;