import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth, useTheme } from '../App';
import { Upload, TriangleAlert } from '../components/Icons';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Toast: React.FC<{ message: string; show: boolean }> = ({ message, show }) => {
    if (!show) return null;
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-success-DEFAULT text-white py-2 px-6 rounded-lg shadow-lg animate-fade-in z-50">
            {message}
        </div>
    );
};

// Confirmation Modal Component for Deletion
interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message, confirmText }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-sm m-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
                        <TriangleAlert className="h-6 w-6 text-danger-DEFAULT" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                         <h3 className="text-xl font-bold text-gray-900 dark:text-white" id="modal-title">{title}</h3>
                        <div className="mt-2">
                            <p className="text-gray-600 dark:text-gray-400">{message}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-4 flex flex-row-reverse gap-3">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="inline-flex w-full justify-center rounded-md bg-danger-DEFAULT px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 sm:w-auto"
                    >
                        {confirmText}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:w-auto"
                    >
                        {t('deleteAccountModal.cancel')}
                    </button>
                </div>
            </div>
        </div>
    );
};


const ProfileSettingsPage: React.FC = () => {
    const { user, updateUser, deleteAccount } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();

    const [notifications, setNotifications] = useState(true);
    const [tts, setTts] = useState(false);
    const [lowBandwidth, setLowBandwidth] = useState(false);
    
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    if (!user) return null;

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = (event: React.FormEvent) => {
        event.preventDefault();
        // Here you would also handle other form field changes
        
        if (previewSrc) {
            updateUser({ avatar: previewSrc });
            setShowToast(true);
        }
    };

    const handleDeleteConfirm = () => {
        deleteAccount();
        // No need to close modal; the component will unmount upon logout and redirect.
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <Toast message={t('profileSettings.toastSuccess')} show={showToast} />
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title={t('deleteAccountModal.title')}
                message={t('deleteAccountModal.message')}
                confirmText={t('deleteAccountModal.confirm')}
            />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('profileSettings.title')}</h1>
            
            {/* Profile Section */}
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-primary-DEFAULT mb-6">{t('profileSettings.myProfile')}</h2>
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                    <div className="flex flex-col items-center space-y-4">
                         <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".jpg,.png,.jpeg"
                            aria-label="Upload Profile Photo"
                        />
                        <div className="relative group cursor-pointer" onClick={handleImageClick}>
                            <img className="h-32 w-32 rounded-full object-cover ring-4 ring-primary-DEFAULT/50 ring-offset-4 ring-offset-white dark:ring-offset-gray-800" src={previewSrc || user.avatar} alt={`Profile photo of ${user.name}`} />
                            <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Upload className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <button 
                            type="button"
                            onClick={handleImageClick}
                            className="inline-flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            {t('profileSettings.uploadPhoto')}
                        </button>
                    </div>
                    <form onSubmit={handleSaveChanges} className="w-full flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                <input type="text" defaultValue={user.name} className="mt-1 block w-full rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-DEFAULT focus:ring-primary-DEFAULT" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">School ID</label>
                                <input type="text" defaultValue={user.id} readOnly className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 shadow-sm" />
                            </div>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                             <input type="text" defaultValue={user.role} readOnly className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 shadow-sm" />
                        </div>
                        <div className="text-right">
                            <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-success-DEFAULT hover:bg-success-hover">
                                {t('profileSettings.saveChanges')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Settings Section */}
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-primary-DEFAULT mb-6">{t('profileSettings.settings')}</h2>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    <SettingToggle label={t('profileSettings.darkMode')} description={t('profileSettings.darkModeDesc')} isChecked={theme === 'dark'} onToggle={toggleTheme} />
                    <SettingToggle label={t('profileSettings.notifications')} description={t('profileSettings.notificationsDesc')} isChecked={notifications} onToggle={() => setNotifications(!notifications)} />
                    <SettingToggle label={t('profileSettings.tts')} description={t('profileSettings.ttsDesc')} isChecked={tts} onToggle={() => setTts(!tts)} />
                    <SettingToggle label={t('profileSettings.lowBandwidth')} description={t('profileSettings.lowBandwidthDesc')} isChecked={lowBandwidth} onToggle={() => setLowBandwidth(!lowBandwidth)} />
                    
                    <div className="flex items-center justify-between py-4">
                        <div>
                             <p className="font-medium text-gray-800 dark:text-gray-100">{t('profileSettings.language')}</p>
                             <p className="text-sm text-gray-600 dark:text-gray-400">{t('header.selectLanguage')}</p>
                        </div>
                        <LanguageSwitcher />
                    </div>

                    <div className="pt-4">
                        <SettingAction
                            label={t('profileSettings.deleteAccount')}
                            description={t('profileSettings.deleteAccountDesc')}
                            buttonText={t('profileSettings.deleteAccount')}
                            onClick={() => setDeleteModalOpen(true)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface SettingToggleProps {
    label: string;
    description: string;
    isChecked: boolean;
    onToggle: () => void;
}

const SettingToggle: React.FC<SettingToggleProps> = ({ label, description, isChecked, onToggle }) => (
    <div className="flex items-center justify-between py-4">
        <div>
            <p className="font-medium text-gray-800 dark:text-gray-100">{label}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <button
            type="button"
            role="switch"
            aria-checked={isChecked}
            onClick={onToggle}
            className={`${
                isChecked ? 'bg-success-DEFAULT' : 'bg-gray-200 dark:bg-gray-600'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-success-DEFAULT focus:ring-offset-2 dark:ring-offset-gray-800`}
        >
            <span
                aria-hidden="true"
                className={`${
                    isChecked ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
        </button>
    </div>
);

interface SettingActionProps {
    label: string;
    description: string;
    buttonText: string;
    onClick: () => void;
}

const SettingAction: React.FC<SettingActionProps> = ({ label, description, buttonText, onClick }) => (
    <div className="flex items-center justify-between py-4">
        <div>
            <p className="font-medium text-gray-800 dark:text-gray-100">{label}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <button
            type="button"
            onClick={onClick}
            className="px-4 py-2 text-sm font-semibold text-danger-DEFAULT bg-red-100 dark:bg-red-900/40 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-DEFAULT dark:ring-offset-gray-800 transition-colors"
        >
            {buttonText}
        </button>
    </div>
);


export default ProfileSettingsPage;