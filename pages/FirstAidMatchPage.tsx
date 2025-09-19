
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../App';
import { FIRST_AID_PAIRS } from '../constants';
import { Check, Zap } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Assignment } from '../types';

// --- TYPES & UTILS ---
type GameStatus = 'start' | 'playing' | 'results';

interface CardItem {
    id: string;
    type: 'situation' | 'response';
    textKey: string;
    originalId: string; // Used to check for matches
}

// Fisher-Yates Shuffle Algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};


const FirstAidMatchPage: React.FC = () => {
    const { t } = useTranslation();
    const { user, addXp } = useAuth();

    const [status, setStatus] = useState<GameStatus>('start');
    const [score, setScore] = useState(0);

    // Game state
    const [situations, setSituations] = useState<CardItem[]>([]);
    const [responses, setResponses] = useState<CardItem[]>([]);
    const [selectedSituation, setSelectedSituation] = useState<CardItem | null>(null);
    const [selectedResponse, setSelectedResponse] = useState<CardItem | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
    const [incorrectPair, setIncorrectPair] = useState<Set<string>>(new Set());

    const totalPairs = FIRST_AID_PAIRS.length;

    // --- GAME LOGIC ---

    const initializeGame = () => {
        // FIX: Explicitly typed the `situationCards` and `responseCards` arrays as `CardItem[]` to resolve a TypeScript error where the `type` property was being inferred as a generic `string` instead of the required `'situation' | 'response'` literal types.
        const situationCards: CardItem[] = FIRST_AID_PAIRS.map(p => ({
            id: `sit-${p.id}`, type: 'situation', textKey: p.situation, originalId: p.id
        }));
        const responseCards: CardItem[] = FIRST_AID_PAIRS.map(p => ({
            id: `res-${p.id}`, type: 'response', textKey: p.response, originalId: p.id
        }));

        setSituations(situationCards);
        setResponses(shuffleArray(responseCards));
        setSelectedSituation(null);
        setSelectedResponse(null);
        setMatchedPairs(new Set());
        setIncorrectPair(new Set());
        setScore(0);
        setStatus('playing');
    };

    const handleSelectCard = (card: CardItem) => {
        if (matchedPairs.has(card.originalId)) return; // Already matched
        if (incorrectPair.size > 0) return; // Wait for incorrect animation to finish

        if (card.type === 'situation') {
            setSelectedSituation(card);
        } else {
            setSelectedResponse(card);
        }
    };

    // Effect to check for a match when both a situation and response are selected
    useEffect(() => {
        if (selectedSituation && selectedResponse) {
            if (selectedSituation.originalId === selectedResponse.originalId) {
                // Correct Match
                setMatchedPairs(prev => new Set(prev).add(selectedSituation.originalId));
                setScore(prev => prev + 10);
                setSelectedSituation(null);
                setSelectedResponse(null);
            } else {
                // Incorrect Match
                setIncorrectPair(new Set([selectedSituation.id, selectedResponse.id]));
                setTimeout(() => {
                    setIncorrectPair(new Set());
                    setSelectedSituation(null);
                    setSelectedResponse(null);
                }, 800); // Shake duration
            }
        }
    }, [selectedSituation, selectedResponse]);
    
    // Effect to end game when all pairs are matched
    useEffect(() => {
        if (matchedPairs.size === totalPairs && status === 'playing') {
            const finalScore = score + 10; // score updates are batched, ensure final score is correct
            addXp(finalScore);
             // Mark assignment as complete
            if (!user) return;
            const assignmentsRaw = localStorage.getItem('assignments');
            const assignments: Assignment[] = assignmentsRaw ? JSON.parse(assignmentsRaw) : [];
            const completionRaw = localStorage.getItem('assignment_completion');
            const completion = completionRaw ? JSON.parse(completionRaw) : {};

            const relevantAssignment = assignments.find(a => 
                a.type === 'quiz' &&
                a.contentId === 'first-aid-match' &&
                !(completion[a.id] && completion[a.id].includes(user.id))
            );

            if (relevantAssignment) {
                if (!completion[relevantAssignment.id]) {
                    completion[relevantAssignment.id] = [];
                }
                completion[relevantAssignment.id].push(user.id);
                localStorage.setItem('assignment_completion', JSON.stringify(completion));
            }

            setTimeout(() => {
                setStatus('results');
            }, 500);
        }
    }, [matchedPairs, totalPairs, status, score, addXp, user]);


    // --- RENDER METHODS ---

    if (status === 'start') {
        return (
            <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{t('games.firstAidMatch.title')}</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    {t('games.firstAidMatch.description')}
                </p>
                <button
                    onClick={initializeGame}
                    className="mt-8 bg-action-DEFAULT text-white font-bold py-4 px-10 rounded-lg hover:bg-action-hover transition-transform transform hover:scale-105"
                >
                    {t('games.firstAidMatch.start')}
                </button>
            </div>
        );
    }
    
    if (status === 'results') {
        return (
            <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{t('games.firstAidMatch.complete')}</h1>
                <div className="my-8">
                     <p className="text-xl text-gray-700 dark:text-gray-300">{t('games.firstAidMatch.finalScore')}</p>
                    <p className="text-6xl font-bold text-success-DEFAULT">{score}</p>
                     <p className="text-2xl font-bold text-yellow-500 mt-2 flex items-center justify-center gap-1 animate-fade-in">
                        <Zap className="h-6 w-6"/> +{score} XP
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <button 
                        onClick={initializeGame}
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
        <div className="max-w-5xl mx-auto">
            {/* Header: Progress & Score */}
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex justify-between items-center">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{t('games.firstAidMatch.progress', { matched: matchedPairs.size, total: totalPairs })}</p>
                    <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <motion.div 
                            className="bg-success-DEFAULT h-2.5 rounded-full"
                            animate={{ width: `${(matchedPairs.size / totalPairs) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('games.firstAidMatch.score')}</p>
                    <p className="text-3xl font-bold text-primary-DEFAULT">{score}</p>
                </div>
            </div>
            
            {/* Game Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Situations Column */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">{t('games.firstAidMatch.situations')}</h2>
                    {situations.map(card => (
                        <MatchCard 
                            key={card.id} 
                            card={card} 
                            isSelected={selectedSituation?.id === card.id} 
                            isMatched={matchedPairs.has(card.originalId)}
                            isIncorrect={incorrectPair.has(card.id)}
                            onSelect={handleSelectCard} 
                        />
                    ))}
                </div>
                {/* Responses Column */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">{t('games.firstAidMatch.responses')}</h2>
                    {responses.map(card => (
                         <MatchCard 
                            key={card.id} 
                            card={card} 
                            isSelected={selectedResponse?.id === card.id} 
                            isMatched={matchedPairs.has(card.originalId)}
                            isIncorrect={incorrectPair.has(card.id)}
                            onSelect={handleSelectCard} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- Reusable Card Component ---
interface MatchCardProps {
    card: CardItem;
    isSelected: boolean;
    isMatched: boolean;
    isIncorrect: boolean;
    onSelect: (card: CardItem) => void;
}
const MatchCard: React.FC<MatchCardProps> = ({ card, isSelected, isMatched, isIncorrect, onSelect }) => {
    const { t } = useTranslation();
    
    const getCardClasses = () => {
        if (isMatched) return 'bg-green-100 dark:bg-green-900/50 border-green-500 opacity-60 cursor-default';
        if (isSelected) return 'bg-blue-100 dark:bg-blue-900/50 border-primary-DEFAULT ring-2 ring-primary-DEFAULT';
        return 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-primary-DEFAULT hover:bg-gray-50 dark:hover:bg-gray-700';
    };

    return (
        <motion.button
            onClick={() => onSelect(card)}
            disabled={isMatched}
            className={`w-full p-4 h-24 text-left rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-center font-medium text-gray-800 dark:text-gray-200 ${getCardClasses()}`}
            animate={isIncorrect ? 'shake' : ''}
            variants={{ shake: { x: [0, -8, 8, -8, 8, 0], transition: { duration: 0.5 } } }}
        >
            {isMatched ? <Check className="h-8 w-8 text-green-600" /> : t(card.textKey)}
        </motion.button>
    );
}

export default FirstAidMatchPage;
