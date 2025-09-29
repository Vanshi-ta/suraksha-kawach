import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from '../components/Icons';
import { motion } from 'framer-motion';

const RegisterPage: React.FC = () => {
    const { register } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<UserRole>(UserRole.Student);
    const [schoolId, setSchoolId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const passwordStrength = useMemo(() => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    }, [password]);

    const getStrengthColor = () => {
        if (passwordStrength < 2) return 'bg-red-500'; // Very Weak
        if (passwordStrength === 2) return 'bg-orange-500'; // Weak
        if (passwordStrength === 3) return 'bg-yellow-500'; // Medium
        if (passwordStrength === 4) return 'bg-blue-500'; // Strong
        return 'bg-green-500'; // Very Strong
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError(t('register.errors.passwordMismatch'));
            return;
        }
        if (passwordStrength < 3) {
            setError(t('register.errors.passwordWeak'));
            return;
        }

        setLoading(true);
        const result = await register({
            name: fullName,
            email,
            password,
            role,
            schoolId,
        });
        setLoading(false);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    const RoleButton = ({ value, children }: { value: UserRole, children: React.ReactNode }) => (
        <button
            type="button"
            onClick={() => setRole(value)}
            className={`w-full py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                role === value
                    ? 'bg-primary-DEFAULT text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary-DEFAULT">{t('register.title')}</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{t('register.subtitle')}</p>
                </div>
                
                {/* FIX: Replaced custom 'input-field' class on inputs below and removed the non-standard <style jsx> block to fix a compilation error. The new classes are consistent with the rest of the application. */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('register.selectRole')}</label>
                        <div className="grid grid-cols-3 gap-3">
                            {/* FIX: Added children to RoleButton components to satisfy the required 'children' prop. Each button now includes the translated role name. */}
                            <RoleButton value={UserRole.Student}>{t('login.student')}</RoleButton>
                            <RoleButton value={UserRole.Teacher}>{t('login.teacher')}</RoleButton>
                            <RoleButton value={UserRole.Administrator}>{t('login.admin')}</RoleButton>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('register.fullNameLabel')}</label>
                        <input id="fullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-gray-900 dark:text-white" />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('register.emailLabel')}</label>
                        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-gray-900 dark:text-white" />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('register.passwordLabel')}</label>
                        <div className="relative">
                            <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-gray-900 dark:text-white pr-10" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400">
                                {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                            </button>
                        </div>
                        {password.length > 0 && (
                            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                                <motion.div 
                                    className={`h-1.5 rounded-full ${getStrengthColor()}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('register.confirmPasswordLabel')}</label>
                        <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-gray-900 dark:text-white" />
                    </div>

                    <div>
                        <label htmlFor="schoolId" className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('register.schoolIdLabel')} ({t('register.optional')})</label>
                        <input id="schoolId" type="text" value={schoolId} onChange={e => setSchoolId(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-gray-900 dark:text-white" />
                    </div>

                    {error && <p className="text-sm text-red-600 animate-shake">{error}</p>}
                    
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-action-DEFAULT hover:bg-action-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-DEFAULT disabled:bg-gray-400"
                        >
                            {loading ? t('register.creatingAccount') : t('register.createAccountButton')}
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                        {t('register.haveAccount')}
                        <Link to="/login" className="font-medium text-primary-DEFAULT hover:text-primary-hover ml-1">
                            {t('register.signIn')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;