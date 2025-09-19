

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { useTranslation } from 'react-i18next';
import { Check, GraduationCap, Briefcase, Building } from '../components/Icons';

type View = 'login' | 'forgotPassword' | 'resetConfirmation';

const LoginPage: React.FC = () => {
    const [view, setView] = useState<View>('login');
    const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.Student);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [resetId, setResetId] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const { t } = useTranslation();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!identifier) {
            setError(t('login.errorRequired'));
            return;
        }
        if (!password) {
            setError(t('login.errorPasswordRequired'));
            return;
        }
        
        if (login(identifier, selectedRole, password)) {
            navigate('/dashboard');
        } else {
            setError(t('login.errorInvalid'));
        }
    };

    const handlePasswordResetRequest = (e: React.FormEvent) => {
        e.preventDefault();
        setView('resetConfirmation');
    };

    const RoleButton = ({ role, children }: { role: UserRole, children: React.ReactNode }) => (
        <button
            type="button"
            onClick={() => setSelectedRole(role)}
            className={`w-full flex items-center justify-center py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                selectedRole === role
                    ? 'bg-primary-DEFAULT text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary-DEFAULT">{t('appName')}</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{t('appDescription')}</p>
                </div>
                
                {view === 'login' && (
                    <>
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('login.selectRole')}</label>
                            <div className="grid grid-cols-3 gap-3">
                                <RoleButton role={UserRole.Student}><GraduationCap className="h-5 w-5 mr-2" />{t('login.student')}</RoleButton>
                                <RoleButton role={UserRole.Teacher}><Briefcase className="h-5 w-5 mr-2" />{t('login.teacher')}</RoleButton>
                                <RoleButton role={UserRole.Administrator}><Building className="h-5 w-5 mr-2" />{t('login.admin')}</RoleButton>
                            </div>
                        </div>

                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="identifier" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('login.identifierLabel')}
                                </label>
                                <input
                                    id="identifier"
                                    name="identifier"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-gray-900 dark:text-white"
                                    placeholder={t('login.identifierPlaceholder')}
                                />
                            </div>
                             <div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('login.passwordLabel')}
                                    </label>
                                    <button type="button" onClick={() => setView('forgotPassword')} className="text-sm font-medium text-primary-DEFAULT hover:text-primary-hover">
                                        {t('login.forgotPassword')}
                                    </button>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-gray-900 dark:text-white"
                                    placeholder="********"
                                />
                            </div>
                            {error && <p className="text-sm text-red-600 animate-shake">{error}</p>}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-action-DEFAULT hover:bg-action-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-DEFAULT"
                                >
                                    {t('login.signInButton')}
                                </button>
                            </div>
                        </form>
                         <div className="mt-6 text-center text-sm">
                            <p className="text-gray-600 dark:text-gray-400">
                                {t('login.noAccount')}
                                <Link to="/register" className="font-medium text-primary-DEFAULT hover:text-primary-hover ml-1" aria-label="Create New Account">
                                    {t('login.createAccount')}
                                </Link>
                            </p>
                        </div>
                    </>
                )}

                {view === 'forgotPassword' && (
                     <div className="animate-fade-in">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('login.resetPasswordTitle')}</h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('login.resetPasswordDesc')}</p>
                        </div>
                        <form className="space-y-6" onSubmit={handlePasswordResetRequest}>
                            <div>
                                <label htmlFor="resetId" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('login.identifierLabel')}
                                </label>
                                <input
                                    id="resetId"
                                    name="resetId"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={resetId}
                                    onChange={(e) => setResetId(e.target.value)}
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-gray-900 dark:text-white"
                                />
                            </div>
                             <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-action-DEFAULT hover:bg-action-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-DEFAULT"
                                >
                                    {t('login.sendResetLink')}
                                </button>
                            </div>
                        </form>
                        <div className="mt-4 text-center">
                             <button type="button" onClick={() => setView('login')} className="text-sm font-medium text-primary-DEFAULT hover:text-primary-hover">
                                {t('login.backToLogin')}
                            </button>
                        </div>
                    </div>
                )}
                
                {view === 'resetConfirmation' && (
                     <div className="animate-fade-in text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                           <Check className="h-6 w-6 text-green-600"/>
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">{t('login.resetLinkSentTitle')}</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('login.resetLinkSentDesc', { schoolId: resetId })}</p>
                        <div className="mt-6">
                             <button type="button" onClick={() => setView('login')} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-DEFAULT hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT">
                                {t('login.backToLogin')}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default LoginPage;