import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { GYAN_KENDRA_MODULES } from '../constants';
import { ChevronDown, Zap, BookOpen, Heart, Globe, Droplet, Flame, Wind, LifeBuoy } from '../components/Icons';
import { CourseModule } from '../types';
import { useTranslation } from 'react-i18next';
import VideoPlayer from '../components/VideoPlayer';

const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const iconMap: { [key: string]: React.ElementType } = {
  Heart,
  Globe,
  Droplet,
  Flame,
  Wind,
  LifeBuoy
};

// Individual Module Card Component
const ModuleCard: React.FC<{
  module: CourseModule;
  isExpanded: boolean;
  onToggle: () => void;
  onStartCourse: () => void;
}> = ({ module, isExpanded, onToggle, onStartCourse }) => {
  const { t } = useTranslation();
  const title = t(`gyanKendra.modules.${module.slug}.title`);
  const shortDescription = t(`gyanKendra.modules.${module.slug}.shortDescription`);
  const longDescription = t(`gyanKendra.modules.${module.slug}.longDescription`);
  const keyTopics = t(`gyanKendra.modules.${module.slug}.keyTopics`, { returnObjects: true }) as string[];
  const videoId = module.youtubeUrl ? getYouTubeId(module.youtubeUrl) : null;
  const Icon = iconMap[module.icon];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <div className="p-6">
        <div className="flex items-center space-x-4">
           {Icon && <Icon className="h-10 w-10 text-primary-DEFAULT" />}
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{shortDescription}</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="mt-6 w-full flex justify-between items-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <span>{t('gyanKendra.learnMore')}</span>
          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expandable Section */}
      <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="p-6 pt-0 space-y-4">
            <p className="text-gray-600 dark:text-gray-400">{longDescription}</p>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">{t('gyanKendra.keyTopics')}</h4>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                {Array.isArray(keyTopics) && keyTopics.map(topic => <li key={topic}>{topic}</li>)}
              </ul>
            </div>

            {module.videoUrl && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('gyanKendra.videoTutorial')}</h4>
                <VideoPlayer src={module.videoUrl} />
              </div>
            )}

            {videoId && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('gyanKendra.youtubeTutorial')}</h4>
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
            
            <Link to={`/course/${module.slug}`} onClick={onStartCourse} className="block w-full text-center bg-primary-DEFAULT text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors">
              {t('gyanKendra.startCourse')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
const GyanKendraPage: React.FC = () => {
    const { user, addXp } = useAuth();
    const { t } = useTranslation();
    const [xpGained, setXpGained] = useState(0);
    const [learnedModules, setLearnedModules] = useState<Set<string>>(new Set());
    const [expandedModule, setExpandedModule] = useState<string | null>(null);

    const handleStartCourse = (moduleSlug: string) => {
        if (!learnedModules.has(moduleSlug)) {
            addXp(10);
            setLearnedModules(prev => new Set(prev).add(moduleSlug));
            setXpGained(prev => prev + 10);
        }
    };
    
    const handleToggleExpand = (moduleSlug: string) => {
        setExpandedModule(prev => (prev === moduleSlug ? null : moduleSlug));
    };

    const xpForNextLevel = ((user?.level || 0) * 1000) + 1000;
    const currentLevelXp = (user?.level || 1) * 1000 - 1000;
    const xpInCurrentLevel = (user?.xp || 0) - currentLevelXp;
    const nextLevelXpThreshold = 1000;
    const progressPercentage = (xpInCurrentLevel / nextLevelXpThreshold) * 100;

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
                    <BookOpen className="w-10 h-10" />
                    {t('gyanKendra.title')}
                </h1>
                <h2 className="text-2xl font-semibold text-primary-DEFAULT">{t('gyanKendra.subtitle')}</h2>
                <p className="mt-2 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                    {t('gyanKendra.description')}
                </p>
            </div>

            {/* XP Progress Bar for Students */}
            {user?.role === UserRole.Student && (
                <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                     <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg text-primary-DEFAULT">{t('dashboard.level', {level: user.level})}</span>
                        {xpGained > 0 && (
                            <div className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 text-sm font-bold px-3 py-1 rounded-full flex items-center">
                                <Zap className="h-4 w-4 mr-1" />
                                <span>{t('gyanKendra.xpEarned', {xp: xpGained})}</span>
                            </div>
                        )}
                        <span className="font-semibold text-gray-600 dark:text-gray-300">{user.xp} / {xpForNextLevel} XP</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div 
                            className="bg-success-DEFAULT h-4 rounded-full transition-all duration-500 ease-out" 
                            style={{ width: `${progressPercentage}%` }}>
                        </div>
                    </div>
                </div>
            )}


            {/* Interactive Learning Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {GYAN_KENDRA_MODULES.map((module) => (
                    <ModuleCard
                        key={module.slug}
                        module={module}
                        isExpanded={expandedModule === module.slug}
                        onToggle={() => handleToggleExpand(module.slug)}
                        onStartCourse={() => handleStartCourse(module.slug)}
                    />
                ))}
            </div>
            
            {/* Footer */}
            <footer className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
                <p>For more information, visit: 
                    <a href="#" className="text-primary-DEFAULT hover:underline mx-1">NDMA</a>|
                    <a href="#" className="text-primary-DEFAULT hover:underline mx-1">FEMA</a>|
                    <a href="#" className="text-primary-DEFAULT hover:underline mx-1">UNDRR</a>
                </p>
                <p className="mt-2">&copy; {new Date().getFullYear()} {t('appName')}. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default GyanKendraPage;