

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VIRTUAL_DRILLS } from '../constants';
import { DrillScenario } from '../types';
import { Gamepad2, Award, Medal, Star, HelpCircle, Search, FileText, Heart, Globe, Flame, Droplet, X, Camera } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';

// --- MODAL & CARD COMPONENTS ---

interface ModalContent {
    type: 'quiz' | 'mcq';
    titleKey: string;
}

// Category Selection Modal Component
const CategorySelectionModal: React.FC<{
    content: ModalContent;
    onClose: () => void;
}> = ({ content, onClose }) => {
    const { t } = useTranslation();
    const categories = [
        { key: 'earthquake', icon: <Globe className="w-12 h-12" /> },
        { key: 'flood', icon: <Droplet className="w-12 h-12" /> },
        { key: 'fire', icon: <Flame className="w-12 h-12" /> }
    ];
    const baseUrl = content.type === 'quiz' ? '/safety-quiz' : '/scenario-mcqs';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md m-4"
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="category-modal-title"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 id="category-modal-title" className="text-xl font-bold text-gray-900 dark:text-white">{t('abhyasArena.selectCategory')}</h3>
                    <button onClick={onClose} aria-label="Close modal">
                        <X className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200" />
                    </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{t(content.titleKey)}</p>
                <div className="grid grid-cols-3 gap-4">
                    {categories.map(cat => (
                        <Link
                            key={cat.key}
                            to={`${baseUrl}/${cat.key}`}
                            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center text-gray-800 dark:text-gray-200 hover:bg-primary-DEFAULT/10 dark:hover:bg-primary-DEFAULT/20 hover:text-primary-DEFAULT dark:hover:text-white transition-colors"
                        >
                            <div className="mx-auto text-primary-DEFAULT">{cat.icon}</div>
                            <p className="font-semibold mt-2">{t(`abhyasArena.categories.${cat.key}`)}</p>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};


// Tier Card Component
interface TierCardProps {
    tier: number;
    title: string;
    description: string;
    bgColor: string;
    children: React.ReactNode;
}
const TierCard: React.FC<TierCardProps> = ({ tier, title, description, bgColor, children }) => (
    <div className={`p-6 rounded-2xl shadow-lg ${bgColor} text-white space-y-4`}>
        <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">{title}</h3>
            <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">TIER {tier}</span>
        </div>
        <p className="text-white/80">{description}</p>
        <div className="pt-2">
            {children}
        </div>
    </div>
);

// Game Card Component (for Tier 1)
interface GameCardProps {
    titleKey: string;
    icon: React.ReactNode;
    onClick?: () => void;
}
const GameCard: React.FC<GameCardProps> = ({ titleKey, icon, onClick }) => {
    const { t } = useTranslation();
    const content = (
        <>
            <div className="text-4xl">{icon}</div>
            <p className="font-semibold mt-2">{t(titleKey)}</p>
        </>
    );

    const className = "bg-white/20 p-4 rounded-xl text-center hover:bg-white/30 transition-colors w-full h-full flex flex-col justify-center items-center";
    
    return onClick ? (
        <button onClick={onClick} className={className}>{content}</button>
    ) : (
        <div className={`${className} cursor-pointer`}>{content}</div>
    );
};


// Simulation Card Component (for Tier 2)
interface SimulationCardProps {
    drill: DrillScenario;
    icon: React.ReactNode;
}
const SimulationCard: React.FC<SimulationCardProps> = ({ drill, icon }) => {
    const { t } = useTranslation();
    return (
        <Link to={`/virtual-drill/${drill.id}`} className="block bg-white/20 p-4 rounded-xl hover:bg-white/30 transition-colors">
            <div className="flex items-center gap-4">
                <span className="text-4xl">{icon}</span>
                <div>
                    <h4 className="font-bold text-lg">{t(drill.titleKey)}</h4>
                    <div className="mt-1 text-sm bg-action-DEFAULT text-white font-bold py-1 px-3 rounded-lg inline-block">{t('abhyasArena.startSim')}</div>
                </div>
            </div>
        </Link>
    );
};


const AbhyasArenaPage: React.FC = () => {
    const { t } = useTranslation();
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);

    const drillIcons: { [key: string]: React.ReactNode } = {
        'earthquake-library-drill': <Globe className="w-10 h-10" />,
        'fire-cafeteria-drill': <Flame className="w-10 h-10" />,
        'flood-school-drill': <Droplet className="w-10 h-10" />,
    };
    return (
        <>
            <AnimatePresence>
                {modalContent && <CategorySelectionModal content={modalContent} onClose={() => setModalContent(null)} />}
            </AnimatePresence>
            <div className="space-y-8">
                {/* 1. Header Section */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
                        <Gamepad2 className="w-10 h-10"/>
                        {t('abhyasArena.title')}
                    </h1>
                    <h2 className="text-2xl font-semibold text-primary-DEFAULT">{t('abhyasArena.subtitle')}</h2>
                    <p className="mt-2 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                    {t('abhyasArena.description')}
                    </p>
                </div>
                
                {/* Gamification Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md text-center">
                        <h4 className="font-bold text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2"><Award className="w-5 h-5"/>{t('abhyasArena.leaderboard')}</h4>
                        <p className="text-2xl font-bold text-action-DEFAULT">Top 5%</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md text-center">
                        <h4 className="font-bold text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2"><Medal className="w-5 h-5"/>{t('abhyasArena.badges')}</h4>
                        <p className="text-2xl font-bold text-success-DEFAULT">3 / 10</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md text-center">
                        <h4 className="font-bold text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2"><Star className="w-5 h-5"/>{t('abhyasArena.xpLevel')}</h4>
                        <p className="text-2xl font-bold text-primary-DEFAULT">Level 7</p>
                    </div>
                </div>

                {/* 2. Tiered Gamification Layout */}
                <div className="space-y-8">
                    {/* Tier 1 */}
                    <TierCard 
                        tier={1}
                        title={t('abhyasArena.tier1Title')}
                        description={t('abhyasArena.tier1Desc')}
                        bgColor="bg-gradient-to-br from-success-DEFAULT to-green-700"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <GameCard titleKey="games.safetyQuiz.title" icon={<HelpCircle className="w-10 h-10"/>} onClick={() => setModalContent({ type: 'quiz', titleKey: 'games.safetyQuiz.title'})} />
                            <Link to="/hazard-hunt"><GameCard titleKey="games.hazardHunt.title" icon={<Search className="w-10 h-10"/>} /></Link>
                            <GameCard titleKey="games.scenarioMcqs.title" icon={<FileText className="w-10 h-10"/>} onClick={() => setModalContent({ type: 'mcq', titleKey: 'games.scenarioMcqs.title'})} />
                            <Link to="/first-aid-match"><GameCard titleKey="games.firstAidMatch.title" icon={<Heart className="w-10 h-10"/>} /></Link>
                        </div>
                    </TierCard>

                    {/* Tier 2 */}
                    <TierCard 
                        tier={2}
                        title={t('abhyasArena.tier2Title')}
                        description={t('abhyasArena.tier2Desc')}
                        bgColor="bg-gradient-to-br from-primary-DEFAULT to-blue-800"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {VIRTUAL_DRILLS.map(drill => (
                                <SimulationCard key={drill.id} drill={drill} icon={drillIcons[drill.id] || <HelpCircle className="w-10 h-10"/>} />
                            ))}
                        </div>
                    </TierCard>

                    {/* Tier 3 */}
                    <TierCard 
                        tier={3}
                        title={t('abhyasArena.tier3Title')}
                        description={t('abhyasArena.tier3Desc')}
                        bgColor="bg-gradient-to-br from-action-DEFAULT to-orange-700"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link to="/earthquake-ar" className="block bg-white/20 p-4 rounded-xl hover:bg-white/30 transition-colors">
                                <div className="flex flex-col items-center justify-center text-center gap-2 h-full">
                                    <Camera className="w-16 h-16 text-white"/>
                                    <h4 className="font-bold text-lg mt-2">{t('arDrill.title')}</h4>
                                    <div className="mt-1 text-sm bg-primary-DEFAULT text-white font-bold py-1 px-3 rounded-lg inline-block">{t('abhyasArena.startSim')}</div>
                                </div>
                            </Link>
                        </div>
                    </TierCard>
                </div>
            </div>
        </>
    );
};

export default AbhyasArenaPage;