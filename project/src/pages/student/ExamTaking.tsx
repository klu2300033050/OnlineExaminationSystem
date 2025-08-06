import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LucideChevronLeft, LucideChevronRight, LucideX, LucideFlag, LucideCheck } from 'lucide-react';

// Mock exam data
const mockExam = {
  id: 'exam123',
  title: 'Algebra Midterm Exam',
  subject: 'Mathematics',
  description: 'Comprehensive midterm covering chapters 1-5',
  duration: 60, // in minutes
  totalPoints: 100,
  questions: [
    {
      id: '1',
      type: 'multiple-choice',
      text: 'What is the value of x in the equation 2x + 5 = 13?',
      options: [
        { id: 'a', text: '3' },
        { id: 'b', text: '4' },
        { id: 'c', text: '5' },
        { id: 'd', text: '6' },
      ],
      points: 5
    },
    {
      id: '2',
      type: 'multiple-choice',
      text: 'Which of the following is a prime number?',
      options: [
        { id: 'a', text: '1' },
        { id: 'b', text: '4' },
        { id: 'c', text: '9' },
        { id: 'd', text: '11' },
      ],
      points: 5
    },
    {
      id: '3',
      type: 'true-false',
      text: 'The square root of 16 is 4.',
      points: 2
    },
    {
      id: '4',
      type: 'true-false',
      text: 'The product of two negative numbers is always negative.',
      points: 2
    },
    {
      id: '5',
      type: 'essay',
      text: 'Explain the Pythagorean theorem and provide an example of its application.',
      points: 10
    }
  ]
};

interface Answer {
  questionId: string;
  answer: string | string[];
  flagged: boolean;
}

const ExamTaking: React.FC = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [remainingTime, setRemainingTime] = useState(mockExam.duration * 60); // in seconds
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  
  // Initialize answers
  useEffect(() => {
    const initialAnswers = mockExam.questions.map(q => ({
      questionId: q.id,
      answer: q.type === 'essay' ? '' : q.type === 'multiple-choice' ? [] : '',
      flagged: false
    }));
    setAnswers(initialAnswers);
  }, []);
  
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours > 0 ? hours : null,
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].filter(Boolean).join(':');
  };
  
  const activeQuestion = mockExam.questions[activeQuestionIndex];
  
  const updateAnswer = (value: string | string[]) => {
    setAnswers(prev => 
      prev.map(a => 
        a.questionId === activeQuestion.id ? { ...a, answer: value } : a
      )
    );
  };
  
  const toggleFlagged = () => {
    setAnswers(prev => 
      prev.map(a => 
        a.questionId === activeQuestion.id ? { ...a, flagged: !a.flagged } : a
      )
    );
  };
  
  const handleSubmit = () => {
    // In a real app, you would submit the answers to your backend
    console.log('Submitting answers:', answers);
    navigate(`/student/results/${examId}`);
  };
  
  const activeAnswer = answers.find(a => a.questionId === activeQuestion?.id);
  
  const isLastQuestion = activeQuestionIndex === mockExam.questions.length - 1;
  const navigateNext = () => {
    if (activeQuestionIndex < mockExam.questions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };
  
  const navigatePrev = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };
  
  const unansweredCount = answers.filter(a => {
    if (Array.isArray(a.answer)) return a.answer.length === 0;
    return a.answer === '';
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">
            {mockExam.title}
          </h1>
          
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              remainingTime < 300 ? 'bg-red-100 text-red-800' : 
              remainingTime < 600 ? 'bg-amber-100 text-amber-800' : 
              'bg-blue-100 text-blue-800'
            }`}>
              Time Remaining: {formatTime(remainingTime)}
            </div>
            
            <button
              onClick={() => setConfirmSubmit(true)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 transition-colors"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Question Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 md:flex md:flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-sm font-medium text-gray-500">Question Navigator</h2>
            <p className="text-xs text-gray-500 mt-1">
              {mockExam.questions.length} questions • {unansweredCount} unanswered
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-5 gap-2">
              {mockExam.questions.map((question, index) => {
                const questionAnswer = answers.find(a => a.questionId === question.id);
                const isAnswered = Array.isArray(questionAnswer?.answer) 
                  ? questionAnswer?.answer.length > 0 
                  : questionAnswer?.answer !== '';
                
                return (
                  <button
                    key={question.id}
                    onClick={() => setActiveQuestionIndex(index)}
                    className={`h-8 w-full text-sm font-medium rounded ${
                      activeQuestionIndex === index 
                        ? 'bg-navy-600 text-white' 
                        : questionAnswer?.flagged
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : isAnswered
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'  
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 text-xs">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-emerald-100 border border-emerald-200 mr-2"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-amber-100 border border-amber-200 mr-2"></div>
                <span>Flagged for review</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-100 border border-gray-200 mr-2"></div>
                <span>Unanswered</span>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main Question Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-8">
            {activeQuestion && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="text-sm font-medium text-gray-500">Question {activeQuestionIndex + 1} of {mockExam.questions.length}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm font-medium text-gray-500">{activeQuestion.points} points</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">{activeQuestion.text}</h2>
                  </div>
                  
                  <button
                    onClick={toggleFlagged}
                    className={`p-1.5 rounded-full ${
                      activeAnswer?.flagged 
                        ? 'bg-amber-100 text-amber-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } transition-colors`}
                    title={activeAnswer?.flagged ? 'Remove flag' : 'Flag for review'}
                  >
                    <LucideFlag className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  {/* Multiple Choice Question */}
                  {activeQuestion.type === 'multiple-choice' && (
                    <div className="space-y-3">
                      {activeQuestion.options?.map((option) => (
                        <div 
                          key={option.id}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                            Array.isArray(activeAnswer?.answer) && activeAnswer?.answer.includes(option.id)
                              ? 'border-navy-500 bg-navy-50'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => updateAnswer([option.id])}
                        >
                          <div className="mr-3">
                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                              Array.isArray(activeAnswer?.answer) && activeAnswer?.answer.includes(option.id)
                                ? 'border-navy-500 bg-navy-500 text-white'
                                : 'border-gray-300'
                            }`}>
                              {Array.isArray(activeAnswer?.answer) && activeAnswer?.answer.includes(option.id) && (
                                <LucideCheck className="h-3 w-3" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-700">{option.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* True/False Question */}
                  {activeQuestion.type === 'true-false' && (
                    <div className="space-y-3">
                      <div 
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          activeAnswer?.answer === 'true'
                            ? 'border-navy-500 bg-navy-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => updateAnswer('true')}
                      >
                        <div className="mr-3">
                          <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            activeAnswer?.answer === 'true'
                              ? 'border-navy-500 bg-navy-500 text-white'
                              : 'border-gray-300'
                          }`}>
                            {activeAnswer?.answer === 'true' && (
                              <LucideCheck className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700">True</p>
                        </div>
                      </div>
                      
                      <div 
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          activeAnswer?.answer === 'false'
                            ? 'border-navy-500 bg-navy-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => updateAnswer('false')}
                      >
                        <div className="mr-3">
                          <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            activeAnswer?.answer === 'false'
                              ? 'border-navy-500 bg-navy-500 text-white'
                              : 'border-gray-300'
                          }`}>
                            {activeAnswer?.answer === 'false' && (
                              <LucideCheck className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700">False</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Essay Question */}
                  {activeQuestion.type === 'essay' && (
                    <div>
                      <textarea
                        value={activeAnswer?.answer as string || ''}
                        onChange={(e) => updateAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500"
                        rows={8}
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={navigatePrev}
                    disabled={activeQuestionIndex === 0}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <LucideChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </button>
                  
                  {isLastQuestion ? (
                    <button
                      onClick={() => setConfirmSubmit(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 transition-colors"
                    >
                      Submit Exam
                    </button>
                  ) : (
                    <button
                      onClick={navigateNext}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 transition-colors"
                    >
                      Next
                      <LucideChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Confirmation Modal */}
      {confirmSubmit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Submit Exam</h3>
              <button 
                onClick={() => setConfirmSubmit(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <LucideX className="h-5 w-5" />
              </button>
            </div>
            
            <div className="px-6 py-4">
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to submit your exam? You have {unansweredCount} unanswered questions.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
                <p className="text-sm text-amber-800">
                  Once submitted, you cannot return to this exam or change your answers.
                </p>
              </div>
              
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setConfirmSubmit(false)}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 transition-colors"
                >
                  Continue Exam
                </button>
                
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 transition-colors"
                >
                  Submit Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamTaking;