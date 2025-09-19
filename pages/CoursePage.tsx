import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { COURSE_CONTENT } from '../constants';
import { BookOpen, ExternalLink } from '../components/Icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../App';
import { Assignment } from '../types';

const CoursePage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const { t } = useTranslation();
    const { user } = useAuth();
    const courseData = COURSE_CONTENT.find(course => course.id === courseId);

    useEffect(() => {
        if (!user || !courseId) return;

        const assignmentsRaw = localStorage.getItem('assignments');
        const assignments: Assignment[] = assignmentsRaw ? JSON.parse(assignmentsRaw) : [];

        const completionRaw = localStorage.getItem('assignment_completion');
        const completion = completionRaw ? JSON.parse(completionRaw) : {};

        const relevantAssignment = assignments.find(a => 
            a.type === 'module' &&
            a.contentId === courseId &&
            !(completion[a.id] && completion[a.id].includes(user.id))
        );

        if (relevantAssignment) {
            if (!completion[relevantAssignment.id]) {
                completion[relevantAssignment.id] = [];
            }
            completion[relevantAssignment.id].push(user.id);
            localStorage.setItem('assignment_completion', JSON.stringify(completion));
        }
    }, [user, courseId]);


    if (!courseData) {
        // Or render a "Course not found" component
        return <Navigate to="/gyan-kendra" replace />;
    }

    const courseTitle = t(`gyanKendra.modules.${courseData.id}.title`);
    const courseDescription = t(`gyanKendra.modules.${courseData.id}.longDescription`);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Course Header */}
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center">
                <h1 className="text-4xl font-extrabold text-primary-DEFAULT">{courseTitle}</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                    A comprehensive guide to enhance your preparedness.
                </p>
            </div>

            {/* Course Content Sections */}
            <div className="space-y-6">
                {courseData.sections.map((section, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                                <BookOpen className="h-6 w-6 mr-3 text-action-DEFAULT"/>
                                {section.title}
                            </h2>
                            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                        {section.image && (
                            <img src={section.image} alt={section.title} className="w-full h-64 object-cover" />
                        )}
                    </div>
                ))}
            </div>

            {/* Call to Action: Take Test & Read More */}
            <div className="text-center py-6">
                <p className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    {t('coursePage.ctaText')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/abhyas-arena"
                        className="inline-flex items-center justify-center bg-action-DEFAULT text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg hover:bg-action-hover transform hover:scale-105 transition-all duration-300"
                    >
                        {t('coursePage.ctaButton')}
                    </Link>
                    {courseData.readMoreUrl && (
                        <a
                            href={courseData.readMoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-lg py-3 px-8 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
                        >
                            {t('coursePage.readMore')}
                            <ExternalLink className="h-5 w-5 ml-2" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoursePage;