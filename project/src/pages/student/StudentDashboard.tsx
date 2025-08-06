import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LucideLayoutDashboard,
  LucideBook,
  LucideClipboard,
  LucideBarChart2,
  LucideLogOut,
  LucideSearch,
  LucideCalendar,
  LucideClock,
  LucideAward,
} from 'lucide-react';
import { mockStudentExams } from '../../data/mockData';

const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  const upcomingExams = mockStudentExams.filter(exam => 
    exam.status === 'upcoming' && 
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const completedExams = mockStudentExams.filter(exam => 
    exam.status === 'completed' && 
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-navy-800 text-white">
        <div className="p-5 border-b border-navy-700">
          <h1 className="text-xl font-bold">ExamPro</h1>
          <p className="text-sm text-gray-400">Student Portal</p>
        </div>
        
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            <Link 
              to="/student" 
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg bg-navy-700"
            >
              <LucideLayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            
            <Link 
              to="/student/exams" 
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-navy-700 hover:text-white transition-colors"
            >
              <LucideBook className="mr-3 h-5 w-5" />
              Available Exams
            </Link>
            
            <Link 
              to="/student/results" 
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-navy-700 hover:text-white transition-colors"
            >
              <LucideClipboard className="mr-3 h-5 w-5" />
              My Results
            </Link>
            
            <Link 
              to="/student/progress" 
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-navy-700 hover:text-white transition-colors"
            >
              <LucideBarChart2 className="mr-3 h-5 w-5" />
              Performance
            </Link>
          </nav>
        </div>
        
        <div className="p-4 border-t border-navy-700">
          <button 
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-navy-700 hover:text-white transition-colors"
          >
            <LucideLogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  {user?.name.charAt(0)}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-navy-600 to-navy-800 rounded-xl shadow-lg mb-8 overflow-hidden">
            <div className="px-6 py-8 md:flex md:items-center md:justify-between">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
                <p className="text-navy-200">Your upcoming exams are listed below. Good luck with your studies!</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <LucideCalendar className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-100">Next Exam</p>
                      <p className="text-lg font-semibold">Algebra Midterm</p>
                      <p className="text-xs text-navy-200">Tomorrow, 10:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 flex items-center">
              <div className="rounded-full bg-indigo-100 p-3 mr-4">
                <LucideBook className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming Exams</p>
                <p className="text-2xl font-bold text-gray-800">4</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow p-6 flex items-center">
              <div className="rounded-full bg-emerald-100 p-3 mr-4">
                <LucideAward className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Score</p>
                <p className="text-2xl font-bold text-gray-800">78%</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow p-6 flex items-center">
              <div className="rounded-full bg-amber-100 p-3 mr-4">
                <LucideClock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Exams Taken</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
            </div>
          </div>
          
          {/* Upcoming Exams Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-0">Upcoming Exams</h2>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LucideSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search exams..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exam Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingExams.map(exam => (
                    <tr key={exam.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{exam.title}</div>
                        <div className="text-xs text-gray-500">by {exam.instructor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{exam.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{exam.date}</div>
                        <div className="text-xs text-gray-500">{exam.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{exam.duration} min</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {exam.isActive ? (
                          <Link
                            to={`/student/exam/${exam.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                          >
                            Start Exam
                          </Link>
                        ) : (
                          <span className="text-gray-500">Not yet available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {upcomingExams.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-gray-500">No upcoming exams found.</p>
              </div>
            )}
          </div>
          
          {/* Recent Results Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Recent Results</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exam Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Taken
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {completedExams.map(exam => (
                    <tr key={exam.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{exam.title}</div>
                        <div className="text-xs text-gray-500">{exam.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{exam.completedDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-semibold ${
                          exam.scorePercentage >= 70 ? 'text-emerald-600' : 
                          exam.scorePercentage >= 50 ? 'text-amber-600' : 
                          'text-red-600'
                        }`}>
                          {exam.score} / {exam.totalPoints} ({exam.scorePercentage}%)
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className={`h-1.5 rounded-full ${
                              exam.scorePercentage >= 70 ? 'bg-emerald-600' : 
                              exam.scorePercentage >= 50 ? 'bg-amber-600' : 
                              'bg-red-600'
                            }`}
                            style={{ width: `${exam.scorePercentage}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/student/results/${exam.id}`}
                          className="text-navy-600 hover:text-navy-800"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {completedExams.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-gray-500">No exam results yet.</p>
              </div>
            )}
            
            {completedExams.length > 0 && (
              <div className="p-4 text-center">
                <Link
                  to="/student/results"
                  className="text-sm font-medium text-navy-600 hover:text-navy-800"
                >
                  View All Results
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;