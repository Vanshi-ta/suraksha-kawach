import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, HelpCircle } from '../components/Icons';

interface FAQItem {
    q: string;
    a: string;
}

interface FAQSection {
    title: string;
    items: FAQItem[];
}

const AccordionItem: React.FC<{
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
    id: string;
}> = ({ question, answer, isOpen, onClick, id }) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <h2>
                <button
                    type="button"
                    className="flex justify-between items-center w-full py-5 text-left font-semibold text-lg text-gray-800 dark:text-gray-200"
                    onClick={onClick}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${id}`}
                >
                    <span>{question}</span>
                    <ChevronDown
                        className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>
            </h2>
            <div
                id={`faq-answer-${id}`}
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="pb-5 pr-4 text-gray-600 dark:text-gray-400">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const HelpPage: React.FC = () => {
    const { t } = useTranslation();
    const [openId, setOpenId] = useState<string | null>(null);
    
    const faqSections = t('helpPage.sections', { returnObjects: true }) as FAQSection[];

    const handleToggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <HelpCircle className="mx-auto h-16 w-16 text-primary-DEFAULT" />
                <h1 className="mt-4 text-4xl font-extrabold text-gray-800 dark:text-gray-100">{t('helpPage.title')}</h1>
                <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                    {t('helpPage.subtitle')}
                </p>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                {faqSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-10 last:mb-0">
                        <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4 border-b-2 border-primary-DEFAULT/30 pb-2">{section.title}</h2>
                        {section.items.map((item, itemIndex) => {
                            const id = `${sectionIndex}-${itemIndex}`;
                            return (
                                <AccordionItem
                                    key={id}
                                    id={id}
                                    question={item.q}
                                    answer={item.a}
                                    isOpen={openId === id}
                                    onClick={() => handleToggle(id)}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpPage;
