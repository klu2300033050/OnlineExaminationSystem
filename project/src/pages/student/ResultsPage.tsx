import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LucideArrowLeft, LucideCheck, LucideX, LucideInfo, LucideHome } from 'lucide-react';

// Mock result data
const mockResults = {
  id: 'exam123',
  title: 'Algebra Midterm Exam',
  subject: 'Mathematics',
  instructor: 'Dr. John Smith',
  dateCompleted: 'May 15, 2025',
  duration: '45 minutes',
  score: 85,
  totalPoints: 100,
  passingScore: 60,
  questions: [
    {
      id: '1',
      number: 1,
      type: 'multiple-choice',
      text: 'What is the value of x in the equation 2x + 5 = 13?',
      options: [
        { id: 'a', text: '3' },
        { id: 'b', text: '4' },
        { id: 'c', text: '5' },
        { id: 'd', text: '6' },
      ],
      correctAnswer: 'b',
      userAnswer: 'b',
      points: 5,
      earnedPoints: 5,
      explanation: 'To solve for x, subtract 5 from both sides: 2x = 8. Then divide both sides by 2: x = 4.'
    },
    {
      id: '2',
      number: 2,
      type: 'multiple-choice',
      text: 'Which of the following is a prime number?',
      options: [
        { id: 'a', text: '1' },
        { id: 'b', text: '4' },
        { id: 'c', text: '9' },
        { id: 'd', text: '11' },
      ],
      correctAnswer: 'd',
      userAnswer: 'a',
      points: 5,
      earnedPoints: 0,
      explanation: 'A prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers. 11 is only divisible by 1 and itself, making it a prime number. 1 is not considered a prime number by definition.'
    },
    {
      id: '3',
      number: 3,
      type: 'true-false',
      text: 'The square root of 16 is 4.',
      correctAnswer: 'true',
      userAnswer: 'true',
      points: 2,
      earnedPoints: 2,
      explanation: 'The square root of 16 is indeed 4, since 4 × 4 = 16.'
    },
    {
      id: '4',
      number: 4,
      type: 'true-false',
      text: 'The product of two negative numbers is always negative.',
      correctAnswer: 'false',
      userAnswer: 'false',
      points: 2,
      earnedPoints: 2,
      explanation: 'The product of two negative numbers is always positive. For example, -2 × -3 = 6.'
    },
    {
      id: '5',
      number: 5,
      type: 'essay',
      text: 'Explain the Pythagorean theorem and provide an example of its application.',
      userAnswer: 'The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides. If a and b are the lengths of the legs and c is the length of the hypotenuse, then a² + b² = c². An example application would be finding the distance between two points in a coordinate system.',
      points: 10,
      earnedPoints: 8,
      feedback: 'Good explanation of the theorem and its formula. Your example is correct but could be more detailed with a specific calculation. Overall, well done.'
    }
  ]
};

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  
  // Calculate total earned points
  const totalEarnedPoints = mockResults.questions.reduce((sum, q) => sum + q.earnedPoints, 0);
  
  // Calculate score percentage
  const scorePercentage = Math.round((totalEarnedPoints / mockResults.totalPoints) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/student')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <LucideArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Exam Results
            </h1>
          </div>
          
          <button
            onClick={() => navigate('/student')}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 transition-colors"
          >
            <LucideHome className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Summary Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">{mockResults.title}</h2>
            <p className="text-sm text-gray-500">{mockResults.subject} • {mockResults.instructor}</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Score Display */}
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Your Score</h3>
                <div className="relative inline-block">
                  <svg className="w-32 h-32" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={scorePercentage >= 70 ? '#10B981' : scorePercentage >= 60 ? '#F59E0B' : '#EF4444'}
                      strokeWidth="3"
                      strokeDasharray={`${scorePercentage}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <p className="text-3xl font-bold">{scorePercentage}%</p>
                      <p className="text-sm text-gray-500">{totalEarnedPoints}/{mockResults.totalPoints}</p>
                    </div>
                  </div>
                </div>
                
                <div className={`mt-3 text-sm font-medium ${
                  scorePercentage >= mockResults.passingScore 
                    ? 'text-emerald-600' 
                    : 'text-red-600'
                }`}>
                  {scorePercentage >= mockResults.passingScore ? 'Passed' : 'Failed'}
                </div>
              </div>
              
              {/* Details */}
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Completed On</h4>
                    <p className="text-base font-medium text-gray-900">{mockResults.dateCompleted}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Duration</h4>
                    <p className="text-base font-medium text-gray-900">{mockResults.duration}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Total Questions</h4>
                    <p className="text-base font-medium text-gray-900">{mockResults.questions.length}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Correct Answers</h4>
                    <p className="text-base font-medium text-gray-900">
                      {mockResults.questions.filter(q => q.earnedPoints === q.points).length}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Partially Correct</h4>
                    <p className="text-base font-medium text-gray-900">
                      {mockResults.questions.filter(q => q.earnedPoints > 0 && q.earnedPoints < q.points).length}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Incorrect Answers</h4>
                    <p className="text-base font-medium text-gray-900">
                      {mockResults.questions.filter(q => q.earnedPoints === 0).length}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex">
                  <button className="text-sm font-medium text-navy-600 hover:text-navy-800 flex items-center">
                    <LucideInfo className="h-4 w-4 mr-1" />
                    View Detailed Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Question Review */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Question Review</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {mockResults.questions.map((question) => (
              <div key={question.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start">
                    <div className={`mr-3 h-6 w-6 rounded-full flex items-center justify-center ${
                      question.earnedPoints === question.points 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : question.earnedPoints > 0 
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-red-100 text-red-600'
                    }`}>
                      {question.earnedPoints === question.points 
                        ? <LucideCheck className="h-4 w-4" />
                        : question.earnedPoints > 0 
                          ? <span className="text-xs font-medium">!</span>
                          : <LucideX className="h-4 w-4" />
                      }
                    </div>
                    
                    <div>
                      <h3 className="text-base font-medium text-gray-800">
                        Question {question.number}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {question.type === 'multiple-choice' 
                          ? 'Multiple Choice' 
                          : question.type === 'true-false' 
                            ? 'True/False' 
                            : 'Essay'
                        } • {question.earnedPoints}/{question.points} points
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-base text-gray-800 mb-4">{question.text}</p>
                
                {/* Multiple Choice Options */}
                {question.type === 'multiple-choice' && question.options && (
                  <div className="space-y-2 mb-4">
                    {question.options.map((option) => (
                      <div 
                        key={option.id}
                        className={`flex items-center p-3 border rounded-lg ${
                          option.id === question.correctAnswer && option.id === question.userAnswer
                            ? 'border-emerald-500 bg-emerald-50'
                            : option.id === question.correctAnswer
                              ? 'border-emerald-500 bg-emerald-50'
                              : option.id === question.userAnswer
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200'
                        }`}
                      >
                        <div className="mr-3">
                          {option.id === question.correctAnswer && option.id === question.userAnswer ? (
                            <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                              <LucideCheck className="h-3 w-3" />
                            </div>
                          ) : option.id === question.correctAnswer ? (
                            <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                              <LucideCheck className="h-3 w-3" />
                            </div>
                          ) : option.id === question.userAnswer ? (
                            <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white">
                              <LucideX className="h-3 w-3" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-gray-300"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`${
                            option.id === question.correctAnswer
                              ? 'font-medium text-gray-800'
                              : 'text-gray-700'
                          }`}>{option.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* True/False */}
                {question.type === 'true-false' && (
                  <div className="space-y-2 mb-4">
                    <div 
                      className={`flex items-center p-3 border rounded-lg ${
                        question.correctAnswer === 'true' && question.userAnswer === 'true'
                          ? 'border-emerald-500 bg-emerald-50'
                          : question.correctAnswer === 'true'
                            ? 'border-emerald-500 bg-emerald-50'
                            : question.userAnswer === 'true'
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200'
                      }`}
                    >
                      <div className="mr-3">
                        {question.correctAnswer === 'true' && question.userAnswer === 'true' ? (
                          <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                            <LucideCheck className="h-3 w-3" />
                          </div>
                        ) : question.correctAnswer === 'true' ? (
                          <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                            <LucideCheck className="h-3 w-3" />
                          </div>
                        ) : question.userAnswer === 'true' ? (
                          <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white">
                            <LucideX className="h-3 w-3" />
                          </div>
                        ) : (
                          <div className="h-5 w-5 rounded-full border border-gray-300"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`${
                          question.correctAnswer === 'true'
                            ? 'font-medium text-gray-800'
                            : 'text-gray-700'
                        }`}>True</p>
                      </div>
                    </div>
                    
                    <div 
                      className={`flex items-center p-3 border rounded-lg ${
                        question.correctAnswer === 'false' && question.userAnswer === 'false'
                          ? 'border-emerald-500 bg-emerald-50'
                          : question.correctAnswer === 'false'
                            ? 'border-emerald-500 bg-emerald-50'
                            : question.userAnswer === 'false'
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200'
                      }`}
                    >
                      <div className="mr-3">
                        {question.correctAnswer === 'false' && question.userAnswer === 'false' ? (
                          <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                            <LucideCheck className="h-3 w-3" />
                          </div>
                        ) : question.correctAnswer === 'false' ? (
                          <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                            <LucideCheck className="h-3 w-3" />
                          </div>
                        ) : question.userAnswer === 'false' ? (
                          <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white">
                            <LucideX className="h-3 w-3" />
                          </div>
                        ) : (
                          <div className="h-5 w-5 rounded-full border border-gray-300"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`${
                          question.correctAnswer === 'false'
                            ? 'font-medium text-gray-800'
                            : 'text-gray-700'
                        }`}>False</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Essay */}
                {question.type === 'essay' && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Your Answer:</h4>
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                      <p className="text-sm text-gray-800">{question.userAnswer}</p>
                    </div>
                    
                    {question.feedback && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Instructor Feedback:</h4>
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                          <p className="text-sm text-blue-800">{question.feedback}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Explanation */}
                {question.explanation && (
                  <div className="mt-3 bg-gray-50 border border-gray-200 rounded-md p-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Explanation:</h4>
                    <p className="text-sm text-gray-800">{question.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;