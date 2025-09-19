

import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../App';
import { SAFETY_QUIZZES } from '../constants';
import { useTranslation } from 'react-i18next';
import { Assignment } from '../types';

type QuizStatus = 'start' | 'playing' | 'results';
type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';

// Circular Progress Bar Component for Results Screen
const CircularProgress: React.FC<{ percentage: number }> = ({ percentage }) => {
    const radius = 50;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                <circle
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={stroke}
                    className="text-gray-200 dark:text-gray-700"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    className="text-success-DEFAULT transition-all duration-1000 ease-out"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <span className="absolute text-2xl font-bold text-success-DEFAULT">{`${Math.round(percentage)}%`}</span>
        </div>
    );
};


const SafetyQuizPage: React.FC = () => {
    const { user, addXp } = useAuth();
    const { t } = useTranslation();
    const { disasterType } = useParams<{ disasterType: string }>();

    const quizData = disasterType ? SAFETY_QUIZZES[disasterType] : null;

    const [status, setStatus] = useState<QuizStatus>('start');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('unanswered');
    const [showNextQuestion, setShowNextQuestion] = useState(true);

    if (!quizData) {
        return <Navigate to="/abhyas-arena" replace />;
    }

    const totalQuestions = quizData.questions.length;
    const categoryName = t(`abhyasArena.categories.${disasterType}`);

    const startQuiz = () => {
        setStatus('playing');
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setAnswerStatus('unanswered');
        setShowNextQuestion(true);
    };

    const handleAnswer = (answerKey: string) => {
        if (selectedAnswer) return; // Prevent changing answer

        setSelectedAnswer(answerKey);
        const isCorrect = answerKey === quizData.questions[currentQuestionIndex].correctAnswer;
        
        if (isCorrect) {
            setScore(prev => prev + 1);
            setAnswerStatus('correct');
        } else {
            setAnswerStatus('incorrect');
        }

        setTimeout(() => {
            setShowNextQuestion(false); // Trigger slide-out animation
            setTimeout(() => {
                if (currentQuestionIndex < totalQuestions - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                    setSelectedAnswer(null);
                    setAnswerStatus('unanswered');
                    setShowNextQuestion(true); // Trigger slide-in animation
                } else {
                    setStatus('results');
                }
            }, 400); // Wait for slide-out to finish
        }, 1500); // Pause to show feedback
    };

    useEffect(() => {
        if (status === 'results') {
            addXp(score * 10);
            
            // Mark assignment as complete
            if (!user) return;
            const assignmentsRaw = localStorage.getItem('assignments');
            const assignments: Assignment[] = assignmentsRaw ? JSON.parse(assignmentsRaw) : [];
            const completionRaw = localStorage.getItem('assignment_completion');
            const completion = completionRaw ? JSON.parse(completionRaw) : {};

            const relevantAssignment = assignments.find(a => 
                a.type === 'quiz' &&
                a.contentId === 'safety-quiz' && // Generic ID for any safety quiz
                !(completion[a.id] && completion[a.id].includes(user.id))
            );

            if (relevantAssignment) {
                if (!completion[relevantAssignment.id]) {
                    completion[relevantAssignment.id] = [];
                }
                completion[relevantAssignment.id].push(user.id);
                localStorage.setItem('assignment_completion', JSON.stringify(completion));
            }
        }
    }, [status, score, addXp, user]);
    
    const [displayScore, setDisplayScore] = useState(0);
    useEffect(() => {
        if (status === 'results') {
            if (displayScore < score) {
                const timer = setTimeout(() => setDisplayScore(displayScore + 1), 100);
                return () => clearTimeout(timer);
            }
        }
    }, [status, displayScore, score]);

    // Render Start Screen
    if (status === 'start') {
        return (
            <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{t(quizData.title)}</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    {t('games.safetyQuiz.description', { count: totalQuestions, category: categoryName })}
                </p>
                <button
                    onClick={startQuiz}
                    className="mt-8 bg-action-DEFAULT text-white font-bold py-4 px-10 rounded-lg hover:bg-action-hover transition-transform transform hover:scale-105 animate-pulse"
                >
                    {t('games.safetyQuiz.start')}
                </button>
            </div>
        );
    }
    
    // Render Results Screen
    if (status === 'results') {
        const percentage = (score / totalQuestions) * 100;
        return (
             <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{t('games.safetyQuiz.complete')}</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                   {score > (totalQuestions * 0.7) ? t('games.safetyQuiz.greatJob') : t('games.safetyQuiz.keepPracticing')}
                </p>
                <div className="my-8">
                   <CircularProgress percentage={percentage} />
                </div>
                 <p className="text-xl text-gray-700 dark:text-gray-300">{t('games.safetyQuiz.youGot')}</p>
                 <p className="text-6xl font-bold text-primary-DEFAULT">{displayScore} <span className="text-4xl text-gray-500 dark:text-gray-400">/ {totalQuestions}</span></p>
                 <p className="text-2xl font-bold text-yellow-500 mt-2 animate-fade-in [animation-delay:1s]">+{score * 10} XP</p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <button 
                        onClick={startQuiz}
                        className="bg-action-DEFAULT text-white font-bold py-3 px-6 rounded-lg hover:bg-action-hover transition-colors"
                    >
                        {t('games.retakeTest')}
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];
    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg overflow-hidden">
            {/* Progress Bar */}
            <div>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('games.safetyQuiz.questionProgress', { current: currentQuestionIndex + 1, total: totalQuestions })}</p>
                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-success-DEFAULT h-2.5 rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
            </div>
            
            {/* Question */}
            <div className={`mt-8 ${showNextQuestion ? 'animate-slide-in-right' : 'animate-slide-out-left'}`}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t(currentQuestion.question)}</h2>
            </div>
            
            {/* Options */}
            <div className="mt-6 space-y-4">
                {currentQuestion.options.map((optionKey, index) => {
                    let buttonClass = 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600';
                    let animationClass = '';

                    if (selectedAnswer) {
                        const isCorrectAnswer = optionKey === currentQuestion.correctAnswer;
                        const isSelectedAnswer = optionKey === selectedAnswer;

                        if (isCorrectAnswer) {
                            buttonClass = 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200';
                            animationClass = 'animate-pop';
                        } else if (isSelectedAnswer) {
                            buttonClass = 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200';
                            animationClass = 'animate-shake';
                        } else {
                            buttonClass = 'bg-gray-100 dark:bg-gray-700 opacity-60';
                        }
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleAnswer(optionKey)}
                            disabled={!!selectedAnswer}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${buttonClass} ${animationClass} ${!!selectedAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <span className="font-semibold">{t(optionKey)}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SafetyQuizPage;