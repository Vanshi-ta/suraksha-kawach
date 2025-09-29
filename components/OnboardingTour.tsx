import React, { useState, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useOnboarding, useAuth } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from './Icons';
import { UserRole } from '../types';

// Define the structure for a single tour step
interface TourStep {
    targetId: string;
    titleKey: string;
    contentKey: string;
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
    roles?: UserRole[]; // ADDED: Specify which roles see this step
}

// Define the master list of all possible tour steps
const ALL_TOUR_STEPS: TourStep[] = [
    {
        targetId: 'welcome-step', // Virtual target for centered modal
        titleKey: 'onboarding.welcome.title',
        contentKey: 'onboarding.welcome.content',
        placement: 'center',
    },
    {
        targetId: 'sidebar-nav',
        titleKey: 'onboarding.sidebar.title',
        contentKey: 'onboarding.sidebar.content',
        placement: 'right',
    },
    {
        targetId: 'gyan-kendra-link',
        titleKey: 'onboarding.gyanKendra.title',
        contentKey: 'onboarding.gyanKendra.content',
        placement: 'right',
        roles: [UserRole.Student, UserRole.Teacher], // Visible only to Students and Teachers
    },
    {
        targetId: 'abhyas-arena-link',
        titleKey: 'onboarding.abhyasArena.title',
        contentKey: 'onboarding.abhyasArena.content',
        placement: 'right',
        roles: [UserRole.Student, UserRole.Teacher], // Visible only to Students and Teachers
    },
    {
        targetId: 'satark-hub-link',
        titleKey: 'onboarding.satarkHub.title',
        contentKey: 'onboarding.satarkHub.content',
        placement: 'right',
        // All roles see this, so no 'roles' property needed
    },
    {
        targetId: 'language-switcher',
        titleKey: 'onboarding.language.title',
        contentKey: 'onboarding.language.content',
        placement: 'bottom',
    },
    {
        targetId: 'profile-info',
        titleKey: 'onboarding.profile.title',
        contentKey: 'onboarding.profile.content',
        placement: 'right',
    },
    {
        targetId: 'end-step', // Virtual target for final message
        titleKey: 'onboarding.end.title',
        contentKey: 'onboarding.end.content',
        placement: 'center',
    },
];

const OnboardingTour: React.FC = () => {
    const { t } = useTranslation();
    const { stopTour } = useOnboarding();
    const { user } = useAuth(); // Get user to determine role

    // Filter tour steps based on the current user's role
    const tourSteps = useMemo(() => {
        if (!user) return [];
        return ALL_TOUR_STEPS.filter(step => 
            !step.roles || step.roles.includes(user.role)
        );
    }, [user]);
    
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const currentStep = tourSteps[currentStepIndex];

    const calculateRect = useCallback(() => {
        if (!currentStep) return; // Guard for when steps are not ready
        
        if (currentStep.placement === 'center') {
            setTargetRect(null);
            return;
        }

        const element = document.querySelector(`[data-tour-id="${currentStep.targetId}"]`);
        if (element) {
            setTargetRect(element.getBoundingClientRect());
            element.classList.add('tour-highlight');
        }
    }, [currentStep]);

    useLayoutEffect(() => {
        // Clear previous highlights
        document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
        
        calculateRect();
        
        window.addEventListener('resize', calculateRect);
        
        return () => {
            window.removeEventListener('resize', calculateRect);
            document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
        };
    }, [currentStepIndex, calculateRect]);


    const handleNext = () => {
        if (currentStepIndex < tourSteps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            stopTour();
        }
    };

    const handlePrev = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    const getTooltipPosition = () => {
        if (!targetRect) { // Center placement
            return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
        }
        
        const offset = 12; // Space between target and tooltip
        switch (currentStep.placement) {
            case 'right':
                return { top: targetRect.top, left: targetRect.right + offset };
            case 'left':
                return { top: targetRect.top, right: window.innerWidth - targetRect.left + offset };
            case 'bottom':
                return { top: targetRect.bottom + offset, left: targetRect.left };
            case 'top':
                 return { bottom: window.innerHeight - targetRect.top + offset, left: targetRect.left };
            default:
                return { top: targetRect.bottom + offset, left: targetRect.left };
        }
    };
    
    // Add a simple CSS class for highlighting
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .tour-highlight {
                position: relative;
                z-index: 10001;
                transition: box-shadow 0.3s ease-in-out;
                box-shadow: 0 0 0 4px rgba(0, 90, 156, 0.7);
                border-radius: 8px;
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // If there are no steps for this user, or the current step isn't ready, don't render.
    if (!currentStep) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[10000]" aria-live="polite">
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Tooltip */}
            <AnimatePresence>
                <motion.div
                    key={currentStepIndex}
                    className="absolute z-[10002] w-72 rounded-xl bg-white dark:bg-gray-800 shadow-2xl p-5 text-gray-800 dark:text-gray-100"
                    style={getTooltipPosition()}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    <button onClick={stopTour} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                        <X className="w-5 h-5"/>
                    </button>
                    <h3 className="text-lg font-bold text-primary-DEFAULT">{t(currentStep.titleKey)}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t(currentStep.contentKey)}</p>
                    
                    {/* Progress Dots */}
                    <div className="flex justify-center space-x-2 mt-4">
                        {tourSteps.map((_, index) => (
                            <div key={index} className={`w-2 h-2 rounded-full transition-colors ${currentStepIndex === index ? 'bg-primary-DEFAULT' : 'bg-gray-300 dark:bg-gray-600'}`} />
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="mt-5 flex justify-between items-center">
                        <button onClick={stopTour} className="text-sm font-medium text-gray-500 hover:text-primary-DEFAULT dark:hover:text-primary-hover">
                            {t('onboarding.buttons.skip')}
                        </button>
                        <div className="space-x-2">
                             {currentStepIndex > 0 && (
                                <button onClick={handlePrev} className="px-4 py-2 text-sm font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                                    {t('onboarding.buttons.prev')}
                                </button>
                            )}
                            <button onClick={handleNext} className="px-4 py-2 text-sm font-semibold bg-primary-DEFAULT text-white rounded-lg hover:bg-primary-hover">
                                {currentStepIndex === tourSteps.length - 1 ? t('onboarding.buttons.finish') : t('onboarding.buttons.next')}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default OnboardingTour;