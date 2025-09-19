
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../App';
import { HAZARD_HUNT_DATA } from '../constants';
import { Hazard, Assignment } from '../types';
import { Check, Zap } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';

type GameStatus = 'start' | 'playing' | 'results';
type ActiveTip = { id: string; tip: string; x: number; y: number } | null;

const HazardHuntPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { user, addXp } = useAuth();

    const [status, setStatus] = useState<GameStatus>('start');
    const [foundHazards, setFoundHazards] = useState<Set<string>>(new Set());
    const [score, setScore] = useState(0);
    const [activeTip, setActiveTip] = useState<ActiveTip>(null);
    
    const totalHazards = HAZARD_HUNT_DATA.length;

    useEffect(() => {
        if (foundHazards.size === totalHazards && status === 'playing') {
            const timer = setTimeout(() => {
                setStatus('results');
            }, 1500); // Delay to show the last tip
            return () => clearTimeout(timer);
        }
    }, [foundHazards.size, totalHazards, status]);
    
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
                a.contentId === 'hazard-hunt' &&
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


    const handleImageClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (activeTip || status !== 'playing') return;

        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        for (const hazard of HAZARD_HUNT_DATA) {
            if (foundHazards.has(hazard.id)) continue;

            const hazardX = (hazard.x / 100) * rect.width;
            const hazardY = (hazard.y / 100) * rect.height;
            const radiusInPixels = (hazard.radius / 100) * rect.width;

            const distance = Math.sqrt(Math.pow(clickX - hazardX, 2) + Math.pow(clickY - hazardY, 2));

            if (distance < radiusInPixels) {
                const newFoundHazards = new Set(foundHazards).add(hazard.id);
                setFoundHazards(newFoundHazards);
                setScore(prev => prev + 10);

                setActiveTip({ id: hazard.id, tip: t(hazard.tipKey), x: hazard.x, y: hazard.y });
                setTimeout(() => setActiveTip(null), 3500);
                
                break; 
            }
        }
    }, [activeTip, status, foundHazards, t]);
    
    const handleReplay = () => {
        setStatus('playing');
        setFoundHazards(new Set());
        setScore(0);
        setActiveTip(null);
    }

    const handleReplayTips = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Cancel any ongoing speech
            const allTips = HAZARD_HUNT_DATA.map(h => t(h.tipKey));
            const utterance = new SpeechSynthesisUtterance(allTips.join('. \n'));
            utterance.lang = i18n.language.startsWith('hi') ? 'hi-IN' : 'en-US';
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser doesn't support Text-to-Speech.");
        }
    };
    
    // --- RENDER METHODS ---

    if (status === 'start') {
        return (
            <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{t('games.hazardHunt.title')}</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    {t('games.hazardHunt.description')}
                </p>
                <button
                    onClick={() => setStatus('playing')}
                    className="mt-8 bg-action-DEFAULT text-white font-bold py-4 px-10 rounded-lg hover:bg-action-hover transition-transform transform hover:scale-105"
                >
                    {t('games.hazardHunt.start')}
                </button>
            </div>
        );
    }

    if (status === 'results') {
        return (
            <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{t('games.hazardHunt.complete')}</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                   {t('games.hazardHunt.scoreMessage')}
                </p>
                <div className="my-8">
                    <p className="text-xl text-gray-700 dark:text-gray-300">{t('games.hazardHunt.score')}</p>
                    <p className="text-6xl font-bold text-success-DEFAULT">{score}</p>
                    <p className="text-2xl font-bold text-yellow-500 mt-2 flex items-center justify-center gap-1">
                        <Zap className="h-6 w-6"/> +{score} XP
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <button 
                        onClick={handleReplay}
                        className="bg-action-DEFAULT text-white font-bold py-3 px-6 rounded-lg hover:bg-action-hover transition-colors"
                    >
                        {t('games.retakeTest')}
                    </button>
                    <button 
                        onClick={handleReplayTips}
                        className="bg-primary-DEFAULT text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors"
                    >
                        {t('games.hazardHunt.replayTips')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="w-full sm:w-auto flex-grow">
                     <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{t('games.hazardHunt.progress')} {foundHazards.size} / {totalHazards}</p>
                     <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <motion.div 
                            className="bg-success-DEFAULT h-4 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(foundHazards.size / totalHazards) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('games.hazardHunt.score')}</p>
                    <p className="text-2xl font-bold text-primary-DEFAULT">{score}</p>
                </div>
            </div>
            
            <div 
                className="relative w-full aspect-[1536/1024] max-w-5xl mx-auto bg-gray-200 dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden cursor-crosshair"
                onClick={handleImageClick}
            >
                <img src="https://videos.openai.com/vg-assets/assets%2Ftask_01k57r8mn9epjvbv29xmt29nwx%2F1757975791_img_1.webp?st=2025-09-19T18%3A45%3A21Z&se=2025-09-25T19%3A45%3A21Z&sks=b&skt=2025-09-19T18%3A45%3A21Z&ske=2025-09-25T19%3A45%3A21Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8b872fb2-b44b-4c1d-9ff6-1d4509d19e6e&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=9%2F5KN%2Foq5R5%2BZI3JUnYLLD5upU8duROJCXy8XiV9hfU%3D&az=oaivgprodscus" />
                
                {HAZARD_HUNT_DATA.map(hazard => {
                    const isFound = foundHazards.has(hazard.id);
                    return isFound ? (
                        <motion.div
                            key={hazard.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ left: `${hazard.x}%`, top: `${hazard.y}%` }}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            aria-label={`${hazard.label} found`}
                        >
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-green-500/50"
                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                                <Check className="h-10 w-10 text-white bg-green-500 p-1 rounded-full shadow-lg" />
                            </div>
                        </motion.div>
                    ) : (
                        // Render the faint, pulsing hint for unfound hazards
                        <motion.div
                            key={`${hazard.id}-hint`}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ left: `${hazard.x}%`, top: `${hazard.y}%` }}
                            aria-hidden="true"
                        >
                            <motion.div
                                className="w-20 h-20 bg-red-500 rounded-full"
                                style={{ filter: 'blur(12px)' }}
                                animate={{
                                    scale: [1, 1.25, 1],
                                    opacity: [0.2, 0.35, 0.2],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        </motion.div>
                    );
                })}


                <AnimatePresence>
                    {activeTip && (
                        <motion.div
                            className="absolute p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-2xl max-w-[200px] text-center border-2 border-primary-DEFAULT pointer-events-none"
                            style={{
                                left: `${activeTip.x}%`,
                                top: `${activeTip.y}%`,
                                x: activeTip.x > 50 ? '-110%' : '10%',
                                y: '-50%',
                            }}
                            initial={{ opacity: 0, scale: 0.8, y: '-40%' }}
                            animate={{ opacity: 1, scale: 1, y: '-50%' }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        >
                            <p className="font-bold text-primary-DEFAULT text-sm">{activeTip.tip}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HazardHuntPage;
