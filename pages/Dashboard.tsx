import React, { useState, useEffect } from 'react';
import { useAuth, useTheme } from '../App';
import { UserRole, Assignment } from '../types';
import { BookOpen, Sword, Zap, Activity, Award, Users, Check, Lock, Star, BarChart as BarChartIcon, TrendingUp, Target, Bell, Flame, Droplet, Heart, LifeBuoy, Medal } from '../components/Icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine, LabelList, PieChart, Pie, LineChart, Line, AreaChart, Area } from 'recharts';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { GYAN_KENDRA_MODULES, AVAILABLE_QUIZZES, STUDENT_REPORTS } from '../constants';


// Reusable Card component for dashboard sections
const Card: React.FC<{ children: React.ReactNode, className?: string, title: string, icon: React.ReactNode }> = ({ children, className = '', title, icon }) => (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md ${className}`}>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
        </h3>
        {children}
    </div>
);


// Main Dashboard Page Component
const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    const renderDashboard = () => {
        switch (user?.role) {
            case UserRole.Student:
                return <StudentDashboard />;
            case UserRole.Teacher:
                return <TeacherDashboard />;
            case UserRole.Administrator:
                return <AdminDashboard />;
            default:
                return <div>Invalid user role.</div>;
        }
    };

    return <div className="space-y-8">{renderDashboard()}</div>;
};

// --- Student Dashboard ---
const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const [myAssignments, setMyAssignments] = useState<any[]>([]);
    
    // Robust XP and Level Calculation
    const currentXP = user?.xp || 0;
    const currentLevel = Math.floor(currentXP / 1000) + 1; 
    const xpOfCurrentLevelStart = (currentLevel - 1) * 1000;
    const xpInCurrentLevel = currentXP - xpOfCurrentLevelStart;
    const progressPercentage = Math.max(0, (xpInCurrentLevel / 1000) * 100);

     useEffect(() => {
        if (!user) return;
        const allAssignmentsRaw = localStorage.getItem('assignments');
        const allAssignments: Assignment[] = allAssignmentsRaw ? JSON.parse(allAssignmentsRaw) : [];
        
        const completionRaw = localStorage.getItem('assignment_completion');
        const completionData = completionRaw ? JSON.parse(completionRaw) : {};

        const enrichedAssignments = allAssignments.map(assignment => {
            const isCompleted = completionData[assignment.id] && completionData[assignment.id].includes(user.id);
            const link = assignment.type === 'module' ? `/course/${assignment.contentId}` : `/abhyas-arena`; // Simple link for now
            
            if (assignment.type === 'quiz') {
                switch(assignment.contentId) {
                    case 'safety-101':
                        return { ...assignment, status: isCompleted ? 'Completed' : 'Pending', link: '/safety-quiz' };
                    case 'hazard-hunt':
                         return { ...assignment, status: isCompleted ? 'Completed' : 'Pending', link: '/hazard-hunt' };
                    case 'scenarios-101':
                        return { ...assignment, status: isCompleted ? 'Completed' : 'Pending', link: '/scenario-mcqs' };
                    case 'first-aid-match':
                        return { ...assignment, status: isCompleted ? 'Completed' : 'Pending', link: '/first-aid-match' };
                }
            }

            return { ...assignment, status: isCompleted ? 'Completed' : 'Pending', link };
        });

        setMyAssignments(enrichedAssignments);
    }, [user]);

    const getGradientClass = (percentage: number) => {
        if (percentage <= 40) return 'from-green-500 to-green-400';
        if (percentage <= 70) return 'from-yellow-500 to-yellow-400';
        return 'from-orange-500 to-red-500';
    };

    const getGlowColor = (percentage: number) => {
        if (percentage <= 40) return 'rgba(74, 222, 128, 0.6)'; // green-400
        if (percentage <= 70) return 'rgba(234, 179, 8, 0.6)'; // yellow-500
        return 'rgba(249, 115, 22, 0.6)'; // orange-500
    };

    const detailedJourneySteps = [
        { name: 'Earthquake Basics', description: 'Understand the fundamentals of earthquake safety.', rewards: { xp: 100, badge: { name: 'Earthquake Expert', icon: 'Medal' } }, completedOn: '2024-07-15' },
        { name: 'Fire Safety', description: 'Learn P.A.S.S. and evacuation plans.', rewards: { xp: 100, badge: { name: 'Fire Marshal', icon: 'Flame' } }, completedOn: '2024-07-18' },
        { name: 'Flood Preparedness', description: 'Know the risks and how to prepare.', rewards: { xp: 150, badge: { name: 'Flood Fighter', icon: 'Droplet' } } },
        { name: 'First Aid', description: 'Master the basics of emergency medical care.', rewards: { xp: 150, badge: { name: 'First Responder', icon: 'Heart' } } },
        { name: 'Evacuation Drills', description: 'Practice makes perfect. Lead the way.', rewards: { xp: 200, badge: { name: 'Drill Sergeant', icon: 'LifeBuoy' } } },
    ];
    
    const journeyIconMap: { [key: string]: React.ElementType } = {
        Medal, Flame, Droplet, Heart, LifeBuoy
    };


    let currentFound = false;
    const journeyData = detailedJourneySteps.map((step, index) => {
        const completed = index < 2; 
        let status: 'completed' | 'current' | 'locked';

        if (completed) {
            status = 'completed';
        } else if (!currentFound) {
            status = 'current';
            currentFound = true;
        } else {
            status = 'locked';
        }
        return { ...step, status, id: index };
    });

    const badges = [
        { name: "Fire Marshal", icon: <Flame className="h-8 w-8 text-yellow-400"/> },
        { name: "Earthquake Expert", icon: <Activity className="h-8 w-8 text-green-500"/> },
    ];

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('dashboard.welcome', { name: user?.name })}</h1>
            
            {/* ENHANCED Profile & Progress Bar */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                <div className="flex items-center space-x-6">
                    <img className="h-20 w-20 rounded-full object-cover" src={user?.avatar} alt="Avatar" />
                    <div>
                        <h2 className="text-2xl font-bold text-primary-DEFAULT">{user?.name}</h2>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="px-3 py-1 text-sm font-bold text-white bg-gradient-to-r from-primary-DEFAULT to-blue-500 rounded-full shadow">
                            {t('dashboard.level', { level: currentLevel })}
                        </span>
                    </div>
                    <div
                        className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8 shadow-inner"
                        role="progressbar"
                        aria-label={t('dashboard.xp')}
                        aria-valuenow={xpInCurrentLevel}
                        aria-valuemin={0}
                        aria-valuemax={1000}
                    >
                        <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${getGradientClass(progressPercentage)}`}
                            initial={{ width: '0%' }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            style={{
                                filter: `drop-shadow(0 0 8px ${getGlowColor(progressPercentage)})`
                            }}
                        />
                         <div className="absolute inset-0 flex items-center justify-between px-4">
                            <span 
                                className="text-sm font-bold text-white" 
                                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}
                            >
                                {xpInCurrentLevel} / 1000 XP
                            </span>
                             <span 
                                className="text-sm font-bold text-white" 
                                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}
                            >
                                {progressPercentage.toFixed(0)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Student Assignments */}
            {myAssignments.length > 0 && (
                <Card title={t('dashboard.assignments.myAssignments')} icon={<BookOpen />}>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                        {myAssignments.map(a => (
                            <div key={a.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">{a.title}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.assignments.dueDate')}: {new Date(a.dueDate).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                                     <span className={`px-3 py-1 text-xs font-bold rounded-full ${a.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                                        {t(`dashboard.assignments.${a.status.toLowerCase()}`)}
                                    </span>
                                    {a.status === 'Pending' && (
                                        <Link to={a.link} className="bg-action-DEFAULT text-white text-sm font-bold py-1 px-3 rounded-lg hover:bg-action-hover">
                                            {t('dashboard.assignments.startAssignment')}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Redesigned My Journey */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">{t('dashboard.myJourney')}</h3>
                <div className="flow-root">
                    <ul className="-mb-8">
                        {journeyData.map((step, stepIdx) => {
                            const BadgeIcon = journeyIconMap[step.rewards.badge.icon];
                            return (
                                <li key={step.id}>
                                    <div className="relative pb-8">
                                        {stepIdx !== journeyData.length - 1 ? (
                                            <span className={`absolute left-5 top-5 -ml-px h-full w-1 ${step.status === 'completed' ? 'bg-success-DEFAULT' : 'bg-gray-200 dark:bg-gray-700'}`} aria-hidden="true" />
                                        ) : null}
                                        <div className="relative flex items-start space-x-4 group">
                                            <div className={`relative flex h-10 w-10 items-center justify-center rounded-full
                                                ${step.status === 'completed' ? 'bg-success-DEFAULT' : ''}
                                                ${step.status === 'current' ? 'bg-primary-DEFAULT ring-4 ring-primary-DEFAULT/30' : ''}
                                                ${step.status === 'locked' ? 'bg-gray-300 dark:bg-gray-600' : ''}
                                            `}>
                                                {step.status === 'completed' && <Check className="h-6 w-6 text-white" />}
                                                {step.status === 'current' && <Star className="h-6 w-6 text-white" />}
                                                {step.status === 'locked' && <Lock className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
                                            </div>

                                            <div className={`min-w-0 flex-1 rounded-lg p-4 border-2 transition-all duration-300
                                                ${step.status === 'completed' ? 'bg-green-50 dark:bg-green-900/40 border-green-200 dark:border-green-800' : ''}
                                                ${step.status === 'current' ? 'bg-blue-50 dark:bg-blue-900/40 border-primary-DEFAULT animate-border-pulse' : ''}
                                                ${step.status === 'locked' ? 'bg-gray-100 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700 opacity-70' : ''}
                                            `}>
                                                <p className={`text-sm font-semibold 
                                                    ${step.status === 'completed' ? 'text-green-800 dark:text-green-200' : ''}
                                                    ${step.status === 'current' ? 'text-primary-DEFAULT dark:text-blue-200' : ''}
                                                    ${step.status === 'locked' ? 'text-gray-600 dark:text-gray-400' : ''}
                                                `}>{step.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{step.description}</p>
                                                
                                                <div className="flex items-center space-x-4 mt-3 text-xs">
                                                    <span className={`font-bold py-1 px-2 rounded-md
                                                        ${step.status === 'completed' ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200' : ''}
                                                        ${step.status === 'current' ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200' : ''}
                                                        ${step.status === 'locked' ? 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300' : ''}
                                                    `}>+{step.rewards.xp} XP</span>
                                                    {step.rewards.badge && (
                                                        <span className={`font-semibold py-1 px-2 rounded-md inline-flex items-center gap-1
                                                            ${step.status === 'completed' ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200' : ''}
                                                            ${step.status === 'current' ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200' : ''}
                                                            ${step.status === 'locked' ? 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300' : ''}
                                                        `}>
                                                            {step.rewards.badge.name}
                                                            {BadgeIcon && <BadgeIcon className="w-4 h-4"/>}
                                                        </span>
                                                    )}
                                                </div>

                                                {step.status === 'current' && (
                                                    <button className="mt-4 w-full bg-primary-DEFAULT text-white font-bold py-2 rounded-lg hover:bg-primary-hover transition-colors">
                                                        {t('dashboard.startNow')}
                                                    </button>
                                                )}
                                            </div>
                                            
                                            <div className="absolute left-12 top-10 z-10 w-48 p-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                {step.status === 'completed' && `Completed on ${step.completedOn}`}
                                                {step.status === 'locked' && `Complete previous module to unlock`}
                                                {step.status === 'current' && `This is your next challenge!`}
                                                <div className="tooltip-arrow absolute left-0 -ml-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" data-popper-arrow></div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center"><Award className="mr-2"/> {t('dashboard.badgesShowcase')}</h3>
                    <div className="flex space-x-4">
                        {badges.map(badge => (
                             <div key={badge.name} className="flex flex-col items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                {badge.icon}
                                <span className="text-sm mt-1 font-medium text-gray-700 dark:text-gray-200">{badge.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                 <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('dashboard.classLeaderboard')}</h3>
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-dashed border-blue-200 dark:border-blue-700 p-4 rounded-lg text-center">
                        <p className="text-lg text-primary-DEFAULT dark:text-blue-300">{t('dashboard.currentRank')}</p>
                        <p className="text-5xl font-bold text-action-DEFAULT">#5</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('dashboard.keepLearning')}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

// --- Teacher Dashboard ---
const TeacherDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [completionData, setCompletionData] = useState<{ [key: string]: string[] }>({});
    const totalStudents = STUDENT_REPORTS.length;

     useEffect(() => {
        const storedAssignments = localStorage.getItem('assignments');
        if (storedAssignments) {
            setAssignments(JSON.parse(storedAssignments));
        }
        const storedCompletion = localStorage.getItem('assignment_completion');
        if (storedCompletion) {
            setCompletionData(JSON.parse(storedCompletion));
        }
    }, []);

    const handleCreateAssignment = (assignmentData: Omit<Assignment, 'id' | 'assignedBy'> & { title: string }) => {
        if (!user) return;
        const newAssignment: Assignment = {
            ...assignmentData,
            id: `asg-${Date.now()}`,
            assignedBy: user.id,
        };
        const updatedAssignments = [...assignments, newAssignment];
        setAssignments(updatedAssignments);
        localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
        setIsModalOpen(false);
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('dashboard.teacherDashboard')}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-2xl shadow">
                    <h3 className="font-bold text-lg">{t('dashboard.totalStudents')}</h3>
                    <p className="text-3xl font-extrabold">{totalStudents}</p>
                </div>
                <div className="p-5 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-2xl shadow">
                    <h3 className="font-bold text-lg">{t('dashboard.avgProgress')}</h3>
                    <p className="text-3xl font-extrabold">78%</p>
                </div>
                 <div className="p-5 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 rounded-2xl shadow">
                    <h3 className="font-bold text-lg">{t('dashboard.pendingDrills')}</h3>
                    <p className="text-3xl font-extrabold">2</p>
                </div>
            </div>
            
            <Card title={t('dashboard.assignments.manageAssignments')} icon={<BookOpen />}>
                <div className="space-y-4">
                    {assignments.map(assignment => {
                        const completedCount = completionData[assignment.id]?.length || 0;
                        const completionRate = (completedCount / totalStudents) * 100;
                        return (
                            <div key={assignment.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-gray-800 dark:text-gray-100">{assignment.title}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.assignments.dueDate')}: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-primary-DEFAULT">{completedCount} / {totalStudents}</p>
                                        <p className="text-xs text-gray-500">{t('dashboard.assignments.studentsCompleted')}</p>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-2">
                                    <div className="bg-success-DEFAULT h-2.5 rounded-full" style={{ width: `${completionRate}%` }}></div>
                                </div>
                            </div>
                        );
                    })}
                    <button onClick={() => setIsModalOpen(true)} className="w-full mt-4 bg-primary-DEFAULT text-white font-bold py-2 rounded-lg hover:bg-primary-hover transition-colors">
                        {t('dashboard.assignments.createAssignment')}
                    </button>
                </div>
            </Card>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center"><Users className="mr-2"/>{t('dashboard.studentProgress')}</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Student Name</th>
                                <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Progress</th>
                                <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Last Active</th>
                                <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {STUDENT_REPORTS.map(student => (
                                <tr key={student.name} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-3 flex items-center space-x-3">
                                        <img src={student.avatar} className="h-10 w-10 rounded-full" />
                                        <span>{student.name}</span>
                                    </td>
                                    <td className="p-3">
                                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                            <div className="bg-success-DEFAULT h-2.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                                        </div>
                                    </td>
                                    <td className="p-3 text-gray-500 dark:text-gray-400">{student.lastActive}</td>
                                    <td className="p-3">
                                        <Link to={`/report/${student.id}`} className="text-primary-DEFAULT hover:underline font-medium">
                                            {t('dashboard.viewReport')}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AnimatePresence>
                {isModalOpen && <CreateAssignmentModal onClose={() => setIsModalOpen(false)} onCreate={handleCreateAssignment} />}
            </AnimatePresence>
        </>
    );
};

// --- Create Assignment Modal for Teacher ---
interface CreateAssignmentModalProps {
    onClose: () => void;
    onCreate: (data: Omit<Assignment, 'id' | 'assignedBy'> & { title: string }) => void;
}
const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({ onClose, onCreate }) => {
    const { t } = useTranslation();
    const [type, setType] = useState<'module' | 'quiz'>('module');
    const [contentId, setContentId] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!contentId || !dueDate) return;
        const selectedContent = type === 'module'
            ? GYAN_KENDRA_MODULES.find(m => m.slug === contentId)
            : AVAILABLE_QUIZZES.find(q => q.id === contentId);

        onCreate({
            title: selectedContent?.title || 'New Assignment',
            type,
            contentId,
            dueDate
        });
    };
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-lg m-4"
                onClick={e => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('dashboard.assignments.createAssignmentTitle')}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('dashboard.assignments.assignmentType')}</label>
                        <select value={type} onChange={e => { setType(e.target.value as 'module' | 'quiz'); setContentId(''); }} className="mt-1 block w-full rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-DEFAULT focus:ring-primary-DEFAULT">
                            <option value="module">{t('dashboard.assignments.module')}</option>
                            <option value="quiz">{t('dashboard.assignments.quiz')}</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{type === 'module' ? t('dashboard.assignments.selectModule') : t('dashboard.assignments.selectQuiz')}</label>
                        <select value={contentId} onChange={e => setContentId(e.target.value)} required className="mt-1 block w-full rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-DEFAULT focus:ring-primary-DEFAULT">
                            <option value="" disabled>Select...</option>
                            {type === 'module'
                                ? GYAN_KENDRA_MODULES.map(m => <option key={m.slug} value={m.slug}>{t(`gyanKendra.modules.${m.slug}.title`)}</option>)
                                : AVAILABLE_QUIZZES.map(q => <option key={q.id} value={q.id}>{q.title}</option>)
                            }
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('dashboard.assignments.dueDate')}</label>
                        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required className="mt-1 block w-full rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                    </div>
                     <div className="mt-6 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">{t('logoutModal.cancel')}</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-success-DEFAULT rounded-lg hover:bg-success-hover">{t('dashboard.assignments.saveAssignment')}</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};


// --- Admin Dashboard ---
const AdminDashboard: React.FC = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();

    // --- MOCK DATA FOR CHARTS ---

    const schoolData = [
        { name: 'DPS Delhi', completion: 89, alerts: 2 },
        { name: 'KV Mumbai', completion: 76, alerts: 5 },
        { name: 'Modern School', completion: 92, alerts: 1 },
        { name: 'St. Xavier\'s', completion: 68, alerts: 8 },
        { name: 'Govt. School', completion: 45, alerts: 10 },
    ];
    const sortedSchoolData = [...schoolData].sort((a, b) => b.completion - a.completion);
    
    const engagementData = [
        { date: 'Day 1', activeUsers: 420 },
        { date: 'Day 2', activeUsers: 480 },
        { date: 'Day 3', activeUsers: 550 },
        { date: 'Day 4', activeUsers: 520 },
        { date: 'Day 5', activeUsers: 610 },
        { date: 'Day 6', activeUsers: 730 },
        { date: 'Day 7', activeUsers: 750 },
    ];

    const modulePopularityData = [
        { name: 'First Aid', value: 400 },
        { name: 'Earthquake', value: 300 },
        { name: 'Fire Safety', value: 250 },
        { name: 'Flood Safety', value: 200 },
    ];
    const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    
    const failurePointsData = [
        { topic: 'CPR Steps', failureRate: 45 },
        { topic: 'Extinguisher Use', failureRate: 35 },
        { topic: 'Floodwater Dangers', failureRate: 25 },
        { topic: 'Evacuation Routes', failureRate: 15 },
    ];
    
    const alertAckRate = 88;


    // --- UTILITY FUNCTIONS ---
    
    const getBarColor = (completion: number) => {
        if (completion > 90) return '#2ECC71'; 
        if (completion >= 75) return '#3498DB'; 
        if (completion >= 50) return '#F1C40F'; 
        return '#E74C3C';
    };
    
    const tickColor = theme === 'dark' ? '#cbd5e1' : '#475569';
    const targetLineColor = theme === 'dark' ? '#94a3b8' : '#64748b';
    const tooltipStyle = {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb',
        borderRadius: '0.75rem',
        color: tickColor
    };
    
    const circleRadius = 54;
    const circumference = 2 * Math.PI * circleRadius;
    const filledArc = circumference * (alertAckRate / 100);
    const emptyArc = circumference - filledArc;


    return (
        <>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('dashboard.adminDashboard')}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="p-5 bg-primary-DEFAULT text-white rounded-2xl shadow-lg">
                    <h3 className="font-bold">{t('dashboard.totalSchools')}</h3>
                    <p className="text-4xl font-extrabold">12</p>
                </div>
                 <div className="p-5 bg-success-DEFAULT text-white rounded-2xl shadow-lg">
                    <h3 className="font-bold">{t('dashboard.totalStudents')}</h3>
                    <p className="text-4xl font-extrabold">8,450</p>
                </div>
                 <div className="p-5 bg-action-DEFAULT text-white rounded-2xl shadow-lg">
                    <h3 className="font-bold">{t('dashboard.activeAlerts')}</h3>
                    <p className="text-4xl font-extrabold">3</p>
                </div>
                 <div className="p-5 bg-danger-DEFAULT text-white rounded-2xl shadow-lg">
                    <h3 className="font-bold">{t('dashboard.highRiskZones')}</h3>
                    <p className="text-4xl font-extrabold">4</p>
                </div>
            </div>

            <Card title={t('dashboard.schoolCompletionRate')} icon={<BarChartIcon />}>
                 <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sortedSchoolData} margin={{ top: 30, right: 20, left: 0, bottom: 50 }}>
                            <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 12 }} angle={-45} textAnchor="end" interval={0}/>
                            <YAxis unit="%" tick={{ fill: tickColor, fontSize: 12 }} />
                            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }} formatter={(value: number) => `${value}%`} />
                            <ReferenceLine y={85} stroke={targetLineColor} strokeDasharray="5 5" label={{ value: "Target: 85%", position: 'insideTopRight', fill: targetLineColor, fontSize: 12, dy: -10 }} />
                            <Bar dataKey="completion" name="Completion" radius={[4, 4, 0, 0]} animationDuration={800}>
                                <LabelList dataKey="completion" position="top" formatter={(value: number) => `${value}%`} fill={tickColor} fontSize={12} dy={-5} />
                                {sortedSchoolData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.completion)} className="cursor-pointer" />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
            
            <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">{t('dashboard.analytics.title')}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <Card title={t('dashboard.analytics.engagement')} icon={<TrendingUp />}>
                        <div className="h-[300px]">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={engagementData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" tick={{ fill: tickColor, fontSize: 12 }} />
                                    <YAxis tick={{ fill: tickColor, fontSize: 12 }}/>
                                    <Tooltip contentStyle={tooltipStyle} />
                                    <Area type="monotone" dataKey="activeUsers" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card title={t('dashboard.analytics.modulePopularity')} icon={<Star />}>
                        <div className="h-[300px]">
                             <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={modulePopularityData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${((Number(percent) || 0) * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                                        {modulePopularityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={tooltipStyle} />
                                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card title={t('dashboard.analytics.failurePoints')} icon={<Target />}>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={failurePointsData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                                    <XAxis type="number" unit="%" tick={{ fill: tickColor, fontSize: 12 }} />
                                    <YAxis type="category" dataKey="topic" tick={{ fill: tickColor, fontSize: 12, width: 100 }} width={120} />
                                    <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => `${value}%`} />
                                    <Bar dataKey="failureRate" name="Failure Rate" fill="#ff7300" radius={[0, 4, 4, 0]}>
                                        <LabelList dataKey="failureRate" position="right" formatter={(value: number) => `${value}%`} fill={tickColor} fontSize={12} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card title={t('dashboard.analytics.alertAckRate')} icon={<Bell />}>
                        <div className="h-[300px] flex flex-col items-center justify-center text-center">
                            <div className="relative">
                                <svg className="transform -rotate-90" width="160" height="160" viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r={circleRadius} fill="none" strokeWidth="12" className="stroke-gray-200 dark:stroke-gray-700"/>
                                    <circle cx="60" cy="60" r={circleRadius} fill="none" strokeWidth="12" className="stroke-current text-success-DEFAULT"
                                        strokeDasharray={`${filledArc} ${emptyArc}`}
                                        strokeDashoffset="0"
                                        style={{ transition: 'stroke-dasharray 0.7s ease-in-out' }}
                                    />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-success-DEFAULT">{alertAckRate}%</span>
                            </div>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">of all critical alerts were acknowledged by staff and students.</p>
                        </div>
                    </Card>
                </div>
            </div>

        </>
    );
};

export default DashboardPage;