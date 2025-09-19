

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X, RefreshCw, Zap } from '../components/Icons'; 
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../App';

type DrillStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; // 0: idle, 1-6: steps, 7: error
type ActiveTooltip = { text: string; x: number; y: number } | null;

// --- SVG ASSETS FOR AR OVERLAY ---

const DeskSVG: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 200 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs><filter id="glow"><feGaussianBlur stdDeviation="3.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <path d="M10 90 V 30 H 190 V 90" stroke="rgba(236, 240, 241, 0.8)" strokeWidth="4" fill="transparent" />
        <rect x="20" y="90" width="10" height="10" fill="rgba(236, 240, 241, 0.8)" /><rect x="170" y="90" width="10" height="10" fill="rgba(236, 240, 241, 0.8)" />
    </svg>
);

const CharacterSVG: React.FC<{ pose: 'crouched' | 'standing', className?: string }> = ({ pose, className }) => (
    <motion.svg viewBox="0 0 50 100" className={className}
        initial={false}
        animate={pose}
        variants={{
            standing: { y: 0 },
            crouched: { y: 30 }
        }}
    >
        <circle cx="25" cy="15" r="10" fill="#fff" />
        <line x1="25" y1="25" x2="25" y2="60" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
        {pose === 'crouched' ? (
             <>
                <line x1="25" y1="35" x2="10" y2="50" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
                <line x1="25" y1="60" x2="10" y2="75" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
                <line x1="25" y1="60" x2="40" y2="75" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
            </>
        ) : (
            <>
                <line x1="25" y1="35" x2="10" y2="50" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
                <line x1="25" y1="35" x2="40" y2="50" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
                <line x1="25" y1="60" x2="10" y2="90" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
                <line x1="25" y1="60" x2="40" y2="90" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
            </>
        )}
    </motion.svg>
);

const WindowHazardSVG: React.FC = () => (
    <motion.div className="w-full h-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
    >
        <motion.div className="w-full h-full relative border-8 border-red-500 rounded-lg"
            style={{boxShadow: '0 0 20px 10px rgba(239, 68, 68, 0.7)'}}
            animate={{ scale: [1, 1.05, 1], opacity: [0.7, 0.9, 0.7]}}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
            <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500/50 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 h-full w-1 bg-red-500/50 -translate-x-1/2" />
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                <motion.path d="M 20 20 L 50 50 L 80 30" stroke="white" strokeWidth="2" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
                <motion.path d="M 30 70 L 50 50 L 70 80" stroke="white" strokeWidth="2" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.8 }}/>
            </svg>
        </motion.div>
    </motion.div>
);

const ShelfHazardSVG: React.FC = () => (
     <motion.div className="w-full h-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
    >
        <motion.div className="w-full h-full relative border-8 border-red-500 rounded-lg flex flex-col justify-around p-2"
            style={{boxShadow: '0 0 20px 10px rgba(239, 68, 68, 0.7)'}}
            animate={{ rotate: [0, -1, 1, -1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
            <div className="w-full h-1/4 bg-red-500/30 rounded" />
            <div className="w-full h-1/4 bg-red-500/30 rounded" />
            <div className="w-full h-1/4 bg-red-500/30 rounded" />
        </motion.div>
    </motion.div>
);

const ExitDoorSVG: React.FC = () => (
     <motion.div className="w-full h-full border-8 border-green-500 rounded-lg"
        style={{boxShadow: '0 0 25px 12px rgba(34, 197, 94, 0.7)'}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [1, 1.02, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
);

const ArrowSVG: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs><filter id="arrow-glow"><feGaussianBlur stdDeviation="2.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <path d="M50 10 L90 50 L50 90 L50 70 L10 70 L10 30 L50 30 Z" fill="rgba(46, 213, 115, 0.8)" filter="url(#arrow-glow)" />
    </svg>
);


// --- MAIN COMPONENT ---

const EarthquakeARPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { addXp } = useAuth();
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    
    // Drill State
    const [drillStep, setDrillStep] = useState<DrillStep>(0);
    const [countdown, setCountdown] = useState(10);
    const [activeTooltip, setActiveTooltip] = useState<ActiveTooltip>(null);
    
    // Interactivity & Scoring State
    const [isUnderCover, setIsUnderCover] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [reactionTime, setReactionTime] = useState(0);
    const [evacuationTime, setEvacuationTime] = useState(0);
    const [totalXp, setTotalXp] = useState(0);
    const startTimeRef = useRef<number>(0);
    
    const safeZoneHoldTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null);

    // Camera Access & Cleanup
    useEffect(() => {
        const startCamera = async () => {
            if (!navigator.mediaDevices?.getUserMedia) { setDrillStep(7); return; }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                streamRef.current = stream;
                if (videoRef.current) videoRef.current.srcObject = stream;
            } catch (err) {
                setDrillStep(7);
            }
        };
        startCamera();
        return () => {
            streamRef.current?.getTracks().forEach(track => track.stop());
            window.speechSynthesis?.cancel();
        };
    }, []);

    const speak = (textKey: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(t(textKey));
            utterance.lang = i18n.language.startsWith('hi') ? 'hi-IN' : 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    };

    const resetDrill = () => {
        setDrillStep(0);
        setCountdown(10);
        setActiveTooltip(null);
        setIsUnderCover(false);
        setFeedbackMessage(null);
        setReactionTime(0);
        setEvacuationTime(0);
        setTotalXp(0);
        startTimeRef.current = 0;
        if (safeZoneHoldTimer.current) clearTimeout(safeZoneHoldTimer.current);
        if (countdownInterval.current) clearInterval(countdownInterval.current);
        safeZoneHoldTimer.current = null;
        countdownInterval.current = null;
    };

    const startDrill = () => {
        resetDrill();
        setDrillStep(1);
    };

    const showTooltip = (textKey: string, x: number, y: number) => {
        setActiveTooltip({ text: t(textKey), x, y });
        setTimeout(() => setActiveTooltip(null), 3000);
    };
    
    const handleHazardTap = (tooltipKey: string, x: number, y: number) => {
        if (drillStep === 3) {
            showTooltip(tooltipKey, x, y);
            if (safeZoneHoldTimer.current) {
                clearTimeout(safeZoneHoldTimer.current);
                safeZoneHoldTimer.current = null;
            }
            setFeedbackMessage(t('arDrill.feedback.hazardTapped'));
        }
    };

    const handleEvacuate = () => {
        if (drillStep === 5) {
            const evacTime = (performance.now() - startTimeRef.current) / 1000;
            setEvacuationTime(evacTime);
            
            // Calculate XP
            const reactionXp = Math.max(10, 50 - Math.floor(reactionTime * 10));
            const coverXp = 50; // Fixed points for successful cover
            const evacuationXp = Math.max(10, 50 - Math.floor(evacTime * 5));
            const finalXp = Math.floor(reactionXp + coverXp + evacuationXp);

            setTotalXp(finalXp);
            addXp(finalXp);
            
            setDrillStep(6);
        }
    };

    const handleCoverPress = () => setIsUnderCover(true);
    const handleCoverRelease = () => setIsUnderCover(false);

    // Main Drill Logic
    useEffect(() => {
        if (safeZoneHoldTimer.current) clearTimeout(safeZoneHoldTimer.current);
        if (countdownInterval.current) clearInterval(countdownInterval.current);
        setFeedbackMessage(null);
        
        let stepTimer: ReturnType<typeof setTimeout>;
        switch (drillStep) {
            case 1: // Shake animation
                navigator.vibrate?.([200, 100, 200]);
                speak('arDrill.voiceDrop');
                startTimeRef.current = performance.now(); // Start reaction timer
                stepTimer = setTimeout(() => setDrillStep(2), 2000);
                break;
            case 5: // Evacuate
                speak('arDrill.voiceEvacuate');
                startTimeRef.current = performance.now(); // Start evacuation timer
                break;
        }
        return () => clearTimeout(stepTimer);
    }, [drillStep, i18n.language]);

    // Interaction-based step transitions
    useEffect(() => {
        if (drillStep === 2 && isUnderCover) {
             const reactTime = (performance.now() - startTimeRef.current) / 1000;
             setReactionTime(reactTime);
             setDrillStep(3);
        }
        
        if (drillStep === 3) {
            if (isUnderCover) {
                setFeedbackMessage(null);
                speak('arDrill.voiceDanger');
                if (!safeZoneHoldTimer.current) {
                    safeZoneHoldTimer.current = setTimeout(() => setDrillStep(4), 3000);
                }
            } else {
                if (safeZoneHoldTimer.current) {
                    clearTimeout(safeZoneHoldTimer.current);
                    safeZoneHoldTimer.current = null;
                }
            }
        }
        
        if (drillStep === 4) {
            if (isUnderCover) {
                setFeedbackMessage(null);
                if (!countdownInterval.current) {
                    countdownInterval.current = setInterval(() => {
                        setCountdown(c => {
                            if (c > 1) return c - 1;
                            if (countdownInterval.current) clearInterval(countdownInterval.current);
                            setDrillStep(5);
                            return 0;
                        });
                    }, 1000);
                }
            } else {
                if (countdownInterval.current) {
                    clearInterval(countdownInterval.current);
                    countdownInterval.current = null;
                }
                setCountdown(10);
                setFeedbackMessage(t('arDrill.feedback.getBackUnderCover'));
            }
        }
    }, [drillStep, isUnderCover, t]);

    const getQualitativeFeedback = (time: number, type: 'reaction' | 'evacuation') => {
        const thresholds = type === 'reaction' ? { excel: 2.5, good: 4 } : { excel: 5, good: 8 };
        if (time <= thresholds.excel) return t('arDrill.qualitative.excellent');
        if (time <= thresholds.good) return t('arDrill.qualitative.good');
        return t('arDrill.qualitative.slow');
    };

    const getOverallFeedback = () => {
        const reactionScore = reactionTime <= 2.5 ? 2 : reactionTime <= 4 ? 1 : 0;
        const evacScore = evacuationTime <= 5 ? 2 : evacuationTime <= 8 ? 1 : 0;
        const totalScore = reactionScore + evacScore;
        if (totalScore >= 3) return t('arDrill.feedbackExcellent');
        if (totalScore >= 2) return t('arDrill.feedbackGood');
        return t('arDrill.feedbackImprove');
    };


    const isShaking = drillStep === 1 || drillStep === 4;

    const instructionMap: { [key in DrillStep]?: string } = {
        1: t('arDrill.step1'), 2: t('arDrill.step2_interactive'), 3: t('arDrill.step3_interactive'),
        4: t('arDrill.step4_interactive'), 5: t('arDrill.step5_interactive'),
    };

    return (
        <div className={`fixed inset-0 bg-black overflow-hidden ${isShaking ? 'animate-shake' : ''}`}>
            <video ref={videoRef} className="absolute w-full h-full object-cover" autoPlay playsInline muted />
            <div className="absolute inset-0 bg-black/20 z-10" />

            <div className="absolute inset-0 z-20 text-white text-center">
                {drillStep > 0 && drillStep < 6 && (
                    <>
                        <Link to="/abhyas-arena" className="absolute top-4 right-4 bg-black/50 py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors z-30">
                            <X className="w-5 h-5" /> {t('arDrill.exitDrill')}
                        </Link>
                        <div className="absolute top-4 left-4 bg-black/50 p-2 rounded-lg">
                            <p className="font-bold text-lg">{t('arDrill.progress', { current: drillStep })}</p>
                        </div>
                         <AnimatePresence mode="wait">
                            <motion.h2 key={drillStep} className="absolute top-16 left-1/2 -translate-x-1/2 text-xl font-bold bg-black/60 px-4 py-2 rounded-lg"
                                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                                {instructionMap[drillStep]}
                            </motion.h2>
                        </AnimatePresence>
                    </>
                )}

                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                    <AnimatePresence>
                        {drillStep === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={startDrill} className="cursor-pointer">
                                <h1 className="text-4xl font-extrabold" style={{ textShadow: '2px 2px 4px #000' }}>{t('arDrill.title')}</h1>
                                <p className="mt-4 text-xl animate-pulse" style={{ textShadow: '1px 1px 3px #000' }}>{t('arDrill.tapToStart')}</p>
                            </motion.div>
                        )}
                        
                        {(drillStep >= 2 && drillStep <= 4) && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-0 w-full h-1/2 flex justify-center items-end pointer-events-none">
                                <DeskSVG className="w-2/3 max-w-sm" />
                                <div className="absolute bottom-0 w-2/3 max-w-sm h-20 flex items-center justify-center pointer-events-auto">
                                    <div
                                        onMouseDown={handleCoverPress} onMouseUp={handleCoverRelease}
                                        onTouchStart={handleCoverPress} onTouchEnd={handleCoverRelease}
                                        className="w-24 h-24 bg-blue-500/50 rounded-full border-4 border-blue-300 animate-pulse cursor-pointer"
                                    />
                                </div>
                                <CharacterSVG pose={isUnderCover ? "crouched" : "standing"} className="absolute w-20 h-40 bottom-0" />
                            </motion.div>
                        )}

                        {drillStep === 3 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                                <button onClick={() => handleHazardTap('arDrill.tooltipWindow', 25, 30)} className="absolute top-[20%] left-[10%] w-[30%] h-[30%]"><WindowHazardSVG /></button>
                                <button onClick={() => handleHazardTap('arDrill.tooltipShelf', 75, 50)} className="absolute top-[40%] right-[5%] w-[20%] h-[40%]"><ShelfHazardSVG /></button>
                            </motion.div>
                        )}
                        
                        {drillStep === 4 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-8xl font-mono font-bold" style={{ textShadow: '2px 2px 8px #000' }}>
                                {countdown}
                            </motion.div>
                        )}
                        
                        {drillStep === 5 && (
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                                <div className="absolute left-[80%] top-[10%] w-[15%] h-[80%] pointer-events-none"><ExitDoorSVG /></div>
                                <button onClick={handleEvacuate} className="absolute left-[80%] top-[10%] w-[15%] h-[80%] flex items-center justify-center bg-transparent z-30">
                                    <span className="bg-green-600/80 text-white font-bold py-3 px-6 rounded-lg animate-pulse">{t('arDrill.evacuateButton')}</span>
                                </button>
                                <motion.div animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute bottom-[10%] left-[10%] pointer-events-none">
                                  <ArrowSVG className="w-24 h-24" />
                               </motion.div>
                                <motion.div animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="absolute bottom-[15%] left-[40%] pointer-events-none">
                                  <ArrowSVG className="w-24 h-24" />
                               </motion.div>
                            </motion.div>
                        )}

                        {drillStep === 6 && (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl max-w-lg w-full text-white text-center border-2 border-green-500 shadow-lg shadow-green-500/30">
                                <h2 className="text-3xl sm:text-4xl font-bold text-green-400">{t('arDrill.drillComplete')}</h2>
                                <p className="mt-2 text-md text-gray-300">{getOverallFeedback()}</p>

                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                                    <div className="bg-white/10 p-4 rounded-lg">
                                        <p className="text-sm text-gray-400">{t('arDrill.reactionTime')}</p>
                                        <p className="text-2xl font-bold">{reactionTime.toFixed(1)}s</p>
                                        <p className="font-semibold text-green-400">{getQualitativeFeedback(reactionTime, 'reaction')}</p>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-lg">
                                        <p className="text-sm text-gray-400">{t('arDrill.evacuationTime')}</p>
                                        <p className="text-2xl font-bold">{evacuationTime.toFixed(1)}s</p>
                                        <p className="font-semibold text-green-400">{getQualitativeFeedback(evacuationTime, 'evacuation')}</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="text-4xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                                        <Zap className="w-8 h-8" /> +{totalXp} XP
                                    </p>
                                </div>
                                
                                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                    <button onClick={startDrill} className="bg-action-DEFAULT text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-action-hover transition-colors">
                                        <RefreshCw className="w-5 h-5"/> {t('arDrill.replayDrill')}
                                    </button>
                                     <Link to="/abhyas-arena" className="bg-gray-200/20 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200/30 transition-colors">
                                        <X className="w-5 h-5" /> {t('arDrill.exitDrill')}
                                    </Link>
                                </div>
                            </motion.div>
                        )}

                        {drillStep === 7 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-800/80 p-8 rounded-2xl max-w-sm">
                                <h2 className="text-2xl font-bold">Camera Error</h2>
                                <p className="mt-2">{t('arDrill.cameraError')}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                <AnimatePresence>
                    {activeTooltip && (
                         <motion.div
                            className="absolute p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-2xl max-w-[200px] text-center border-2 border-red-500 pointer-events-none text-red-700 dark:text-red-300"
                            style={{ left: `${activeTooltip.x}%`, top: `${activeTooltip.y}%` }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <p className="font-bold text-sm">{activeTooltip.text}</p>
                        </motion.div>
                    )}
                    {feedbackMessage && (
                        <motion.div
                            className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        >
                            {feedbackMessage}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default EarthquakeARPage;