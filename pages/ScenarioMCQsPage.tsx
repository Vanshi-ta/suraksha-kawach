

import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../App';
import { SCENARIO_MCQS } from '../constants';
import { Check, X, Zap, MessageSquare } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Assignment } from '../types';

type GameStatus = 'start' | 'playing' | 'results';
type AnswerFeedback = {
    isCorrect: boolean;
    correctAnswer: string;
    explanation: string;
} | null;

const ScenarioMCQsPage: React.FC = () => {
    const { t } = useTranslation();
    const { user, addXp } = useAuth();
    const { disasterType } = useParams<{ disasterType: string }>();

    const quizData = disasterType ? SCENARIO_MCQS[disasterType] : null;

    const [status, setStatus] = useState<GameStatus>('start');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<AnswerFeedback>(null);

    if (!quizData) {
        return <Navigate to="/abhyas-arena" replace />;
    }

    const questions = quizData.questions;
    const totalQuestions = questions.length;
    const categoryName = t(`abhyasArena.categories.${disasterType}`);

    const handleStart = () => {
        setStatus('playing');
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setFeedback(null);
    };

    const handleAnswerSelect = (answer: string) => {
        if (selectedAnswer) return;

        setSelectedAnswer(answer);
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswer = t(currentQuestion.correctAnswer);
        const isCorrect = answer === correctAnswer;
        
        if (isCorrect) {
            setScore(prev => prev + 10);
        }

        setFeedback({
            isCorrect,
            correctAnswer,
            explanation: t(currentQuestion.explanation || ''),
        });
        
        setTimeout(() => {
            if (currentQuestionIndex < totalQuestions - 1) {
                setFeedback(null);
                setSelectedAnswer(null);
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                setStatus('results');
            }
        }, 4000); // Wait 4 seconds to read the explanation
    };

    useEffect(() => {
        if (status === 'results') {
            addXp(score);

            // Mark assignment as complete
            if (!user) return;
            const assignmentsRaw = localStorage.getItem('assignments');
            const assignments: Assignment[] = assignmentsRaw ? JSON.parse(assignmentsRaw) : [];
            const completionRaw = localStorage.getItem('assignment_completion');
            const completion = completionRaw ? JSON.parse(completionRaw) : {};

            const relevantAssignment = assignments.find(a => 
                a.type === 'quiz' &&
                a.contentId === 'scenario-mcqs' && // Generic ID for any scenario quiz
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


    // --- RENDER METHODS ---

    if (status === 'start') {
        return (
            <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{t(quizData.title)}</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    {t('games.scenarioMcqs.description', { category: categoryName })}
                </p>
                <button
                    onClick={handleStart}
                    className="mt-8 bg-action-DEFAULT text-white font-bold py-4 px-10 rounded-lg hover:bg-action-hover transition-transform transform hover:scale-105"
                >
                    {t('games.scenarioMcqs.start')}
                </button>
            </div>
        );
    }
    
    if (status === 'results') {
        return (
            <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{t('games.scenarioMcqs.complete')}</h1>
                 <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                   {t('games.scenarioMcqs.scoreMessage')}
                </p>
                <div className="my-8">
                     <p className="text-xl text-gray-700 dark:text-gray-300">{t('games.scenarioMcqs.score')}</p>
                    <p className="text-6xl font-bold text-success-DEFAULT">{score}</p>
                     <p className="text-2xl font-bold text-yellow-500 mt-2 flex items-center justify-center gap-1 animate-fade-in">
                        <Zap className="h-6 w-6"/> +{score} XP
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <button 
                        onClick={handleStart}
                        className="bg-action-DEFAULT text-white font-bold py-3 px-6 rounded-lg hover:bg-action-hover transition-colors"
                    >
                        {t('games.retakeTest')}
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const questionText = t(currentQuestion.question);
    const options = currentQuestion.options.map(opt => t(opt));

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            {/* Header: Progress & Score */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Scenario {currentQuestionIndex + 1} of {totalQuestions}</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <motion.div 
                            className="bg-primary-DEFAULT h-2.5 rounded-full"
                            initial={{ width: `${(currentQuestionIndex / totalQuestions) * 100}%` }}
                            animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
                <div className="ml-8 text-right">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Score</p>
                    <p className="text-3xl font-bold text-primary-DEFAULT">{score}</p>
                </div>
            </div>

            {/* Question Card */}
             <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100 leading-relaxed">{questionText}</p>
                </motion.div>
            </AnimatePresence>

            {/* Options */}
            <div className="mt-8 space-y-4">
                {options.map((option, index) => {
                    let buttonClass = 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600';
                    let icon = null;

                    if (selectedAnswer) {
                        const isCorrectAnswer = option === t(currentQuestion.correctAnswer);
                        const isSelectedAnswer = option === selectedAnswer;

                        if (isCorrectAnswer) {
                            buttonClass = 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200';
                            icon = <Check className="h-5 w-5" />;
                        } else if (isSelectedAnswer) {
                            buttonClass = 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200';
                            icon = <X className="h-5 w-5" />;
                        } else {
                            buttonClass = 'bg-gray-100 dark:bg-gray-700 opacity-50';
                        }
                    }
                    
                    return (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={!!selectedAnswer}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 flex justify-between items-center ${buttonClass} ${!selectedAnswer ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        >
                            <span className="font-medium">{option}</span>
                            {icon}
                        </button>
                    );
                })}
            </div>
            
             {/* Explanation */}
            <AnimatePresence>
                {feedback && (
                    <motion.div
                        className={`mt-6 p-4 rounded-lg flex items-start space-x-4 ${feedback.isCorrect ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <MessageSquare className={`h-8 w-8 mt-1 shrink-0 ${feedback.isCorrect ? 'text-success-DEFAULT' : 'text-danger-DEFAULT'}`} />
                        <div>
                            <h3 className={`text-lg font-bold ${feedback.isCorrect ? 'text-success-DEFAULT' : 'text-danger-DEFAULT'}`}>
                                {feedback.isCorrect ? "Correct!" : "Not Quite"}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">{feedback.explanation}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default ScenarioMCQsPage;