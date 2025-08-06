import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LucideSchool, LucideUser, LucideBook, LucideClock } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const success = await login(credentials.email, credentials.password, activeTab);
      if (success) {
        navigate(activeTab === 'teacher' ? '/teacher' : '/student');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side - Welcome Banner */}
      <div className="bg-navy-700 text-white w-full md:w-1/2 flex flex-col justify-center px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <LucideSchool className="h-10 w-10 mr-3" />
            <h1 className="text-3xl font-bold">ExamPro</h1>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">Welcome to the Next Generation Examination Platform</h2>
          
          <p className="text-gray-300 mb-8">
            Our secure platform provides a seamless experience for both educators and students, 
            with advanced features for creating, taking, and analyzing examinations.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-emerald-600 p-2 rounded-full mr-4">
                <LucideBook className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Comprehensive Question Banks</h3>
                <p className="text-gray-300 text-sm">Create and manage diverse question types</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-emerald-600 p-2 rounded-full mr-4">
                <LucideClock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Timed Assessments</h3>
                <p className="text-gray-300 text-sm">Configure time limits and track progress</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-emerald-600 p-2 rounded-full mr-4">
                <LucideUser className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Instant Results & Feedback</h3>
                <p className="text-gray-300 text-sm">Automatic grading with detailed analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex mb-8">
              <button
                className={`flex-1 py-3 font-medium text-center rounded-l-lg transition-colors ${
                  activeTab === 'student' 
                    ? 'bg-navy-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('student')}
              >
                Student
              </button>
              <button
                className={`flex-1 py-3 font-medium text-center rounded-r-lg transition-colors ${
                  activeTab === 'teacher' 
                    ? 'bg-navy-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('teacher')}
              >
                Teacher
              </button>
            </div>
            
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {activeTab === 'student' ? 'Student Login' : 'Teacher Login'}
            </h2>
            
            <LoginForm onSubmit={handleLogin} userType={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;