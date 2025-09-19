import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from './Icons';

const LanguageSwitcher: React.FC = () => {
    const { i18n, t } = useTranslation();
    
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const currentLang = i18n.language.startsWith('hi') ? 'hi' : 'en';

    return (
        <div className="flex items-center space-x-1">
            <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <select
                value={currentLang}
                onChange={(e) => changeLanguage(e.target.value)}
                aria-label={t('header.selectLanguage')}
                className="appearance-none bg-transparent cursor-pointer text-gray-800 dark:text-gray-300 font-medium py-2 pl-2 pr-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-DEFAULT"
            >
                <option value="en">{t('header.english')}</option>
                <option value="hi">{t('header.hindi')}</option>
            </select>
        </div>
    );
};
export default LanguageSwitcher;
