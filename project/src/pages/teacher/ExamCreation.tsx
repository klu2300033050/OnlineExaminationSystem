import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  LucideArrowLeft, 
  LucideSave, 
  LucidePlus, 
  LucideTrash2, 
  LucideGripVertical,
  LucideSettings,
  LucideEye
} from 'lucide-react';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'essay';
  text: string;
  options?: { id: string; text: string; isCorrect: boolean }[];
  correctAnswer?: string;
  points: number;
}

const ExamCreation: React.FC = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const isEditing = !!examId;
  
  const [examTitle, setExamTitle] = useState(isEditing ? 'Algebra Midterm Exam' : '');
  const [examSubject, setExamSubject] = useState(isEditing ? 'Mathematics' : '');
  const [examDescription, setExamDescription] = useState(isEditing ? 'Comprehensive midterm covering chapters 1-5' : '');
  const [duration, setDuration] = useState(isEditing ? 60 : 30);
  const [questions, setQuestions] = useState<Question[]>(isEditing ? [
    {
      id: '1',
      type: 'multiple-choice',
      text: 'What is the value of x in the equation 2x + 5 = 13?',
      options: [
        { id: 'a', text: '3', isCorrect: false },
        { id: 'b', text: '4', isCorrect: true },
        { id: 'c', text: '5', isCorrect: false },
        { id: 'd', text: '6', isCorrect: false },
      ],
      points: 5
    },
    {
      id: '2',
      type: 'true-false',
      text: 'The square root of 16 is 4.',
      correctAnswer: 'true',
      points: 2
    },
    {
      id: '3',
      type: 'essay',
      text: 'Explain the Pythagorean theorem and provide an example of its application.',
      points: 10
    }
  ] : []);
  
  // Add new question
  const addQuestion = (type: 'multiple-choice' | 'true-false' | 'essay') => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      text: '',
      points: type === 'essay' ? 10 : type === 'multiple-choice' ? 5 : 2
    };
    
    if (type === 'multiple-choice') {
      newQuestion.options = [
        { id: 'a', text: '', isCorrect: false },
        { id: 'b', text: '', isCorrect: false },
        { id: 'c', text: '', isCorrect: false },
        { id: 'd', text: '', isCorrect: false },
      ];
    } else if (type === 'true-false') {
      newQuestion.correctAnswer = '';
    }
    
    setQuestions([...questions, newQuestion]);
  };
  
  // Update question text
  const updateQuestionText = (id: string, text: string) => {
    setQuestions(
      questions.map(q => (q.id === id ? { ...q, text } : q))
    );
  };
  
  // Update question points
  const updateQuestionPoints = (id: string, points: number) => {
    setQuestions(
      questions.map(q => (q.id === id ? { ...q, points } : q))
    );
  };
  
  // Update option for multiple choice
  const updateOption = (questionId: string, optionId: string, text: string) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId && q.options) {
          return {
            ...q,
            options: q.options.map(opt => 
              opt.id === optionId ? { ...opt, text } : opt
            )
          };
        }
        return q;
      })
    );
  };
  
  // Set correct answer for multiple choice
  const setCorrectOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId && q.options) {
          return {
            ...q,
            options: q.options.map(opt => 
              ({ ...opt, isCorrect: opt.id === optionId })
            )
          };
        }
        return q;
      })
    );
  };
  
  // Set correct answer for true/false
  const setTrueFalseAnswer = (questionId: string, answer: string) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId) {
          return { ...q, correctAnswer: answer };
        }
        return q;
      })
    );
  };
  
  // Delete a question
  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };
  
  // Handle save
  const handleSave = () => {
    console.log('Saving exam:', { examTitle, examSubject, examDescription, duration, questions });
    // In a real app, you would save this to your backend
    alert('Exam saved successfully!');
    navigate('/teacher');
  };
  
  // Calculate total points
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/teacher')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <LucideArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              {isEditing ? 'Edit Exam' : 'Create New Exam'}
            </h1>
          </div>
          
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 transition-colors">
              <LucideEye className="h-4 w-4 mr-2" />
              Preview
            </button>
            
            <button 
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 transition-colors"
            >
              <LucideSave className="h-4 w-4 mr-2" />
              Save Exam
            </button>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Exam Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="exam-title" className="block text-sm font-medium text-gray-700 mb-1">
                      Exam Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="exam-title"
                      type="text"
                      value={examTitle}
                      onChange={(e) => setExamTitle(e.target.value)}
                      placeholder="Enter exam title"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="exam-subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="exam-subject"
                      type="text"
                      value={examSubject}
                      onChange={(e) => setExamSubject(e.target.value)}
                      placeholder="Enter subject"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="exam-description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="exam-description"
                      rows={3}
                      value={examDescription}
                      onChange={(e) => setExamDescription(e.target.value)}
                      placeholder="Enter a description for this exam"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Questions Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Questions</h2>
                <span className="text-sm text-gray-500">Total Points: {totalPoints}</span>
              </div>
              
              {questions.length === 0 ? (
                <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                  <p className="text-gray-500 mb-4">No questions added yet.</p>
                  <p className="text-sm text-gray-500 mb-6">Get started by adding your first question.</p>
                  <div className="flex justify-center">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                      <button
                        onClick={() => addQuestion('multiple-choice')}
                        className="py-2 px-4 text-sm font-medium text-gray-700 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-navy-500 focus:text-navy-700"
                      >
                        Multiple Choice
                      </button>
                      <button
                        onClick={() => addQuestion('true-false')}
                        className="py-2 px-4 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300 hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-navy-500 focus:text-navy-700"
                      >
                        True/False
                      </button>
                      <button
                        onClick={() => addQuestion('essay')}
                        className="py-2 px-4 text-sm font-medium text-gray-700 bg-white rounded-r-md border border-gray-300 hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-navy-500 focus:text-navy-700"
                      >
                        Essay
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={question.id} className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="mr-3 cursor-move">
                            <LucideGripVertical className="h-5 w-5 text-gray-400" />
                          </div>
                          <h3 className="text-md font-medium text-gray-900">Question {index + 1}</h3>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <label htmlFor={`points-${question.id}`} className="text-sm text-gray-500 mr-2">
                              Points:
                            </label>
                            <input
                              id={`points-${question.id}`}
                              type="number"
                              min="1"
                              max="100"
                              value={question.points}
                              onChange={(e) => updateQuestionPoints(question.id, parseInt(e.target.value))}
                              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md"
                            />
                          </div>
                          
                          <button
                            onClick={() => deleteQuestion(question.id)}
                            className="p-1 rounded-full hover:bg-red-50 text-red-500 transition-colors"
                          >
                            <LucideTrash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <textarea
                          value={question.text}
                          onChange={(e) => updateQuestionText(question.id, e.target.value)}
                          placeholder="Enter your question here"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500"
                          rows={2}
                        />
                      </div>
                      
                      {question.type === 'multiple-choice' && question.options && (
                        <div className="space-y-3">
                          {question.options.map((option) => (
                            <div key={option.id} className="flex items-center">
                              <div className="mr-2">
                                <input
                                  type="radio"
                                  id={`${question.id}-${option.id}`}
                                  name={`question-${question.id}`}
                                  checked={option.isCorrect}
                                  onChange={() => setCorrectOption(question.id, option.id)}
                                  className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300"
                                />
                              </div>
                              <input
                                type="text"
                                value={option.text}
                                onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                                placeholder={`Option ${option.id.toUpperCase()}`}
                                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {question.type === 'true-false' && (
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id={`${question.id}-true`}
                              name={`question-${question.id}`}
                              checked={question.correctAnswer === 'true'}
                              onChange={() => setTrueFalseAnswer(question.id, 'true')}
                              className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300"
                            />
                            <label htmlFor={`${question.id}-true`} className="ml-2 block text-sm text-gray-700">
                              True
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id={`${question.id}-false`}
                              name={`question-${question.id}`}
                              checked={question.correctAnswer === 'false'}
                              onChange={() => setTrueFalseAnswer(question.id, 'false')}
                              className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300"
                            />
                            <label htmlFor={`${question.id}-false`} className="ml-2 block text-sm text-gray-700">
                              False
                            </label>
                          </div>
                        </div>
                      )}
                      
                      {question.type === 'essay' && (
                        <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
                          <p className="text-sm text-gray-500 italic">Students will provide a written response to this question.</p>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                      <button
                        onClick={() => addQuestion('multiple-choice')}
                        className="py-2 px-4 text-sm font-medium text-gray-700 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-navy-500 focus:text-navy-700"
                      >
                        <LucidePlus className="inline-block h-4 w-4 mr-1" />
                        Multiple Choice
                      </button>
                      <button
                        onClick={() => addQuestion('true-false')}
                        className="py-2 px-4 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300 hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-navy-500 focus:text-navy-700"
                      >
                        <LucidePlus className="inline-block h-4 w-4 mr-1" />
                        True/False
                      </button>
                      <button
                        onClick={() => addQuestion('essay')}
                        className="py-2 px-4 text-sm font-medium text-gray-700 bg-white rounded-r-md border border-gray-300 hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-navy-500 focus:text-navy-700"
                      >
                        <LucidePlus className="inline-block h-4 w-4 mr-1" />
                        Essay
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <div className="flex items-center mb-6">
                <LucideSettings className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="text-md font-medium text-gray-900">Exam Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    id="duration"
                    type="number"
                    min="1"
                    max="240"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="passing-score" className="block text-sm font-medium text-gray-700 mb-1">
                    Passing Score (%)
                  </label>
                  <input
                    id="passing-score"
                    type="number"
                    min="0"
                    max="100"
                    defaultValue="60"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500"
                  />
                </div>
                
                <div className="pt-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="shuffle-questions"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="shuffle-questions" className="font-medium text-gray-700">
                        Shuffle Questions
                      </label>
                      <p className="text-gray-500">Questions will appear in random order for each student</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-1">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="shuffle-options"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="shuffle-options" className="font-medium text-gray-700">
                        Shuffle Options
                      </label>
                      <p className="text-gray-500">Options in multiple-choice questions will be randomized</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-1">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="prevent-backtracking"
                        type="checkbox"
                        className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="prevent-backtracking" className="font-medium text-gray-700">
                        Prevent Backtracking
                      </label>
                      <p className="text-gray-500">Students cannot return to previous questions</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-1">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="show-results"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="show-results" className="font-medium text-gray-700">
                        Show Results Immediately
                      </label>
                      <p className="text-gray-500">Students see their score after completion</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Scheduling
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="start-date" className="block text-xs text-gray-500 mb-1">
                        Start Date
                      </label>
                      <input
                        id="start-date"
                        type="date"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="end-date" className="block text-xs text-gray-500 mb-1">
                        End Date
                      </label>
                      <input
                        id="end-date"
                        type="date"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCreation;