import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../App';
import { STUDENT_REPORTS } from '../constants';
import { BookOpen, Award, BarChart as BarChartIcon, Star } from '../components/Icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

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

const StudentReportPage: React.FC = () => {
    const { studentId } = useParams<{ studentId: string }>();
    const { t } = useTranslation();
    const { theme } = useTheme();

    const report = STUDENT_REPORTS.find(r => r.id === studentId);

    if (!report) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold">{t('studentReport.noData')}</h1>
                <Link to="/dashboard" className="text-primary-DEFAULT hover:underline mt-4 inline-block">
                    {t('studentReport.backToDashboard')}
                </Link>
            </div>
        );
    }

    const tickColor = theme === 'dark' ? '#cbd5e1' : '#475569';
    const tooltipStyle = {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb',
        borderRadius: '0.75rem',
        color: tickColor
    };
    
    const getBarColor = (score: number) => {
        if (score >= 85) return '#2E8540'; // Success Green
        if (score >= 60) return '#005A9C'; // Primary Blue
        return '#F37021'; // Action Orange
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div>
                <Link to="/dashboard" className="text-primary-DEFAULT hover:underline mb-4 inline-block">
                    &larr; {t('studentReport.backToDashboard')}
                </Link>
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{t('studentReport.title')}</h1>
            </div>

            {/* Student Info Card */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <img src={report.avatar} alt={report.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-primary-DEFAULT/50" />
                    <h2 className="text-2xl font-bold mt-4 text-primary-DEFAULT">{report.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('studentReport.lastActive')}: {report.lastActive}</p>
                </div>
                <div className="col-span-2 grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.level', { level: report.level })}</p>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{report.level}</p>
                    </div>
                     <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.xp')}</p>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{report.xp}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('studentReport.overallProgress')}</p>
                        <p className="text-3xl font-bold text-success-DEFAULT">{report.progress}%</p>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Completed Modules */}
                <Card title={t('studentReport.completedModules')} icon={<BookOpen />}>
                    <ul className="space-y-3">
                        {report.modulesCompleted.map(module => (
                            <li key={module} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
                                    <Star className="w-5 h-5 text-green-600 dark:text-green-300" />
                                </div>
                                <span className="font-medium text-gray-700 dark:text-gray-200">{module}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
                
                {/* Badges Showcase */}
                <Card title={t('studentReport.badgesShowcase')} icon={<Award />}>
                    <div className="flex flex-wrap gap-4">
                         {report.badges.map(badge => (
                             <div key={badge} className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg w-32 text-center">
                                <Award className="h-10 w-10 text-yellow-500"/>
                                <span className="text-sm mt-2 font-semibold text-gray-700 dark:text-gray-200">{badge}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Quiz Performance */}
            <Card title={t('studentReport.quizPerformance')} icon={<BarChartIcon />}>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={report.quizPerformance} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                            <XAxis dataKey="topic" tick={{ fill: tickColor, fontSize: 12 }} />
                            <YAxis unit="%" tick={{ fill: tickColor, fontSize: 12 }} />
                            <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => `${value}%`} />
                            <Bar dataKey="score" name="Score" radius={[4, 4, 0, 0]}>
                                <LabelList dataKey="score" position="top" formatter={(value: number) => `${value}%`} fill={tickColor} fontSize={12} dy={-5} />
                                {report.quizPerformance.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default StudentReportPage;