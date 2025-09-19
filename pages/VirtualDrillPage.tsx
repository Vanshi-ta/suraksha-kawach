
import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../App';
import { VIRTUAL_DRILLS } from '../constants';
import { DrillStep, DrillStepOption } from '../types';
import { Check, X, Zap } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';

type GameStatus = 'start' | 'playing' | 'results';
type Feedback = {
    isCorrect: boolean;
    text: string;
} | null;

const VirtualDrillPage: React.FC = () => {
    const { t } = useTranslation();
    const { addXp } = useAuth();
    const { drillId } = useParams<{ drillId: string }>();

    const drillData = VIRTUAL_DRILLS.find(d => d.id === drillId);

    const [status, setStatus] = useState<GameStatus>('start');
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<DrillStepOption | null>(null);
    const [feedback, setFeedback] = useState<Feedback>(null);

    if (!drillData) {
        return <Navigate to="/abhyas-arena" replace />;
    }

    const scenario = drillData.scenario;
    const totalSteps = scenario.length;
    const currentStep: DrillStep = scenario[currentStepIndex];

    const handleStart = () => {
        setStatus('playing');
        setCurrentStepIndex(0);
        setScore(0);
        setSelectedOption(null);
        setFeedback(null);
    };

    const handleOptionSelect = (option: DrillStepOption) => {
        if (selectedOption) return;

        setSelectedOption(option);
        setFeedback({ isCorrect: option.isCorrect, text: t(option.feedbackKey) });

        if (option.isCorrect) {
            setScore(prev => prev + 25);
        }

        setTimeout(() => {
            if (currentStepIndex < totalSteps - 1) {
                setCurrentStepIndex(prev => prev + 1);
                setSelectedOption(null);
                setFeedback(null);
            } else {
                 // Use a temporary variable for the score since state updates are async
                const finalScore = score + (option.isCorrect ? 25 : 0);
                addXp(finalScore);
                setStatus('results');
            }
        }, 4000); // 4 seconds to read feedback
    };


    // --- RENDER METHODS ---

    if (status === 'start') {
        return (
            <div className="max-w-3xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{t(drillData.titleKey)}</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    {t(drillData.titleKey.replace('title', 'description'))}
                </p>
                <button
                    onClick={handleStart}
                    className="mt-8 bg-action-DEFAULT text-white font-bold py-4 px-10 rounded-lg hover:bg-action-hover transition-transform transform hover:scale-105"
                >
                    {t('games.virtualDrill.start')}
                </button>
            </div>
        );
    }
    
    if (status === 'results') {
        return (
            <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{t('games.virtualDrill.complete')}</h1>
                 <p className="mt-2 text-xl font-semibold text-primary-DEFAULT">{t(drillData.titleKey)}</p>
                <div className="my-8">
                     <p className="text-xl text-gray-700 dark:text-gray-300">{t('games.virtualDrill.yourScore')}</p>
                    <p className="text-6xl font-bold text-success-DEFAULT">{score}</p>
                     <p className="text-2xl font-bold text-yellow-500 mt-2 flex items-center justify-center gap-1 animate-fade-in">
                        <Zap className="h-6 w-6"/> {t('games.virtualDrill.xpEarned', { xp: score })}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <button 
                        onClick={handleStart}
                        className="bg-action-DEFAULT text-white font-bold py-3 px-6 rounded-lg hover:bg-action-hover transition-colors"
                    >
                        {t('games.retakeTest')}
                    </button>
                    <Link
                        to="/abhyas-arena"
                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        {t('games.backToArena')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg">
            {/* Progress and Score */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Step {currentStepIndex + 1} of {totalSteps}</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <motion.div 
                            className="bg-primary-DEFAULT h-2.5 rounded-full"
                            animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
                <div className="ml-8 text-right">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Score</p>
                    <p className="text-3xl font-bold text-primary-DEFAULT">{score}</p>
                </div>
            </div>

            {/* Scene and Situation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStepIndex}
                    className="relative w-full aspect-video rounded-lg overflow-hidden mt-4 bg-gray-900"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                >
                    <img src={currentStep.image} alt="Drill scenario" className={`w-full h-full object-cover transition-all duration-500 ${currentStep.situationKey.includes('shake') ? 'animate-shake' : ''}`} />
                    <div className="absolute inset-0 bg-black/50 p-6 flex items-end">
                        <p className="text-white text-lg sm:text-2xl font-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                            {t(currentStep.situationKey)}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Options */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentStep.options.map((option, index) => {
                    let buttonClass = 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600';
                    let icon = null;
                    const isSelected = selectedOption?.textKey === option.textKey;

                    if (selectedOption) {
                        if (option.isCorrect) {
                            buttonClass = 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200';
                            icon = <Check className="h-6 w-6" />;
                        } else if (isSelected) {
                            buttonClass = 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200';
                            icon = <X className="h-6 w-6" />;
                        } else {
                             buttonClass = 'bg-gray-100 dark:bg-gray-700 opacity-50';
                        }
                    }
                    
                    return (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            disabled={!!selectedOption}
                            className={`p-4 h-full rounded-lg border-2 transition-all duration-300 flex flex-col justify-between items-center text-center ${buttonClass} ${!selectedOption ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        >
                            <span className="font-semibold text-base flex-grow flex items-center">{t(option.textKey)}</span>
                            {icon && <div className="mt-2 self-end">{icon}</div>}
                        </button>
                    );
                })}
            </div>

            {/* Feedback Panel */}
            <AnimatePresence>
                {feedback && (
                    <motion.div
                        className={`mt-6 p-4 rounded-lg flex items-start space-x-4 ${feedback.isCorrect ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${feedback.isCorrect ? 'bg-success-DEFAULT' : 'bg-danger-DEFAULT'}`}>
                            {feedback.isCorrect ? <Check className="h-5 w-5 text-white" /> : <X className="h-5 w-5 text-white" />}
                        </div>
                        <div>
                            <h3 className={`text-lg font-bold ${feedback.isCorrect ? 'text-success-DEFAULT' : 'text-danger-DEFAULT'}`}>
                                {feedback.isCorrect ? "Correct!" : "Incorrect"}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">{feedback.text}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VirtualDrillPage;
