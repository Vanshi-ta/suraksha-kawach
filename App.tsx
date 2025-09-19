

import React, { useState, useContext, createContext, useMemo, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserRole, User, AuthContextType, OnboardingContextType } from './types';
import { MOCK_USERS, SIDEBAR_LINKS } from './constants';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';
import GyanKendraPage from './pages/GyanKendra';
import AbhyasArenaPage from './pages/AbhyasArena';
import SatarkHubPage from './pages/SatarkHub';
import ProfileSettingsPage from './pages/ProfileSettings';
import CoursePage from './pages/CoursePage';
import SafetyQuizPage from './pages/SafetyQuizPage';
import HazardHuntPage from './pages/HazardHuntPage';
import ScenarioMCQsPage from './pages/ScenarioMCQsPage';
import FirstAidMatchPage from './pages/FirstAidMatchPage';
import VirtualDrillPage from './pages/VirtualDrillPage';
import LanguageSwitcher from './components/LanguageSwitcher';
import { HomeIcon, BookOpen, Sword, Shield, User as UserIcon, Settings, LogOut, Menu, X, HelpCircle } from './components/Icons';
import OnboardingTour from './components/OnboardingTour';
import HelpPage from './pages/HelpPage';
import ChatbotWidget from './components/ChatbotWidget';
import StudentReportPage from './pages/StudentReportPage';
import EarthquakeARPage from './pages/EarthquakeARPage';

// --- CONTEXT DEFINITIONS ---

// 1. Theme Context
type Theme = 'light' | 'dark';
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | null>(null);
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

// 2. Authentication Context
const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// 3. Onboarding Context
const OnboardingContext = createContext<OnboardingContextType | null>(null);
export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error("useOnboarding must be used within an OnboardingProvider");
    }
    return context;
};


// --- PROVIDER COMPONENTS ---

// 4. ThemeProvider Component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem('theme');
        return (storedTheme as Theme) || 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }, []);

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}


// 5. OnboardingProvider Component
const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isTourOpen, setIsTourOpen] = useState(false);

    const startTour = useCallback(() => {
        // Prevent tour from starting on small screens where elements might be hidden
        if (window.innerWidth < 768) {
             localStorage.setItem('hasCompletedOnboarding', 'true');
             return;
        }
        setIsTourOpen(true);
    }, []);

    const stopTour = useCallback(() => {
        localStorage.setItem('hasCompletedOnboarding', 'true');
        setIsTourOpen(false);
    }, []);

    const value = useMemo(() => ({ isTourOpen, startTour, stopTour }), [isTourOpen, startTour, stopTour]);

    return (
        <OnboardingContext.Provider value={value}>
            {children}
        </OnboardingContext.Provider>
    );
};


// 6. AuthProvider Component
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const { startTour } = useOnboarding();

    const handleSuccessfulLogin = useCallback((loggedInUser: User) => {
        const customAvatar = localStorage.getItem(`avatar_${loggedInUser.id}`);
        const finalUser = {
            ...loggedInUser,
            ...(customAvatar && { avatar: customAvatar })
        };
        setUser(finalUser);
        
        const hasCompletedTour = localStorage.getItem('hasCompletedOnboarding');
        if (!hasCompletedTour) {
            setTimeout(() => startTour(), 500);
        }
    }, [startTour]);


    const login = useCallback((identifier: string, role: UserRole, password: string) => {
        // 1. Try to log in with mock data (ID-based, password is the same as ID)
        const mockUser = MOCK_USERS.find(u => u.id === identifier && u.role === role);
        if (mockUser && password === mockUser.id) {
            handleSuccessfulLogin(mockUser);
            return true;
        }

        // 2. Try to log in with registered users from localStorage (email-based)
        const storedUsersRaw = localStorage.getItem('registered_users');
        if (storedUsersRaw) {
            const storedUsers: (User & { password?: string })[] = JSON.parse(storedUsersRaw);
            const registeredUser = storedUsers.find(
                (u) => (u.email === identifier || u.id === identifier) && u.role === role && u.password === password
            );

            if (registeredUser) {
                const { password, ...userToSet } = registeredUser; // Don't keep password in state
                handleSuccessfulLogin(userToSet);
                return true;
            }
        }
        return false;
    }, [handleSuccessfulLogin]);

     const register = useCallback(async (details: { name: string; email: string; password: string; role: UserRole; schoolId?: string }) => {
        // NOTE: Storing plain text passwords in localStorage is NOT secure.
        // This is for prototype purposes only. In a real application,
        // passwords must be hashed on a secure server.
        try {
            const storedUsersRaw = localStorage.getItem('registered_users');
            const storedUsers: (User & { password: string })[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

            const userExists = storedUsers.some((u) => u.email === details.email);
            if (userExists) {
                return { success: false, message: 'An account with this email already exists.' };
            }

            const newUser: User & { password: string } = {
                id: details.schoolId || `user-${Date.now()}`,
                name: details.name,
                email: details.email,
                role: details.role,
                password: details.password, // Storing password for prototype
                avatar: `https://picsum.photos/seed/${details.email}/200`,
                xp: 0,
                level: 1,
            };
            
            storedUsers.push(newUser);
            localStorage.setItem('registered_users', JSON.stringify(storedUsers));
            
            const { password, ...userToSet } = newUser;
            handleSuccessfulLogin(userToSet);

            return { success: true, message: 'Registration successful!' };

        } catch (error) {
            console.error("Registration failed:", error);
            return { success: false, message: 'An unexpected error occurred during registration.' };
        }
    }, [handleSuccessfulLogin]);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const deleteAccount = useCallback(() => {
        if (!user) return;

        // Remove from registered_users in localStorage
        const storedUsersRaw = localStorage.getItem('registered_users');
        if (storedUsersRaw) {
            let storedUsers: (User & { password?: string })[] = JSON.parse(storedUsersRaw);
            storedUsers = storedUsers.filter(u => u.id !== user.id && u.email !== user.email);
            localStorage.setItem('registered_users', JSON.stringify(storedUsers));
        }

        // Remove custom avatar
        try {
            localStorage.removeItem(`avatar_${user.id}`);
        } catch (error) {
            console.error("Failed to remove avatar from localStorage:", error);
        }

        // Logout will clear the session user and trigger redirect
        logout();
    }, [user, logout]);


    const addXp = useCallback((amount: number) => {
        setUser(currentUser => {
            if (!currentUser) return null;
            const newXp = (currentUser.xp || 0) + amount;
            const newLevel = Math.floor(newXp / 1000) + 1;
            return {
                ...currentUser,
                xp: newXp,
                level: newLevel,
            };
        });
    }, []);
    
    const updateUser = useCallback((updatedData: Partial<User>) => {
        setUser(currentUser => {
            if (!currentUser) return null;
            const finalUser = { ...currentUser, ...updatedData };
            
            if (updatedData.avatar) {
                try {
                    localStorage.setItem(`avatar_${finalUser.id}`, updatedData.avatar);
                } catch (error) {
                    console.error("Failed to save avatar to localStorage:", error);
                }
            }
            return finalUser;
        });
    }, []);

    const value = useMemo(() => ({ user, login, logout, addXp, updateUser, register, deleteAccount }), [user, login, logout, addXp, updateUser, register, deleteAccount]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


// --- ROUTING & APP STRUCTURE ---

// 7. Protected Route Component
const ProtectedRoute: React.FC = () => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <Layout />;
};

// 8. Main App Component with Router and Providers
const App: React.FC = () => {
    return (
        <ThemeProvider>
            <OnboardingProvider>
                <AuthProvider>
                    <HashRouter>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/" element={<Navigate to="/dashboard" />} />
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/gyan-kendra" element={<GyanKendraPage />} />
                                <Route path="/abhyas-arena" element={<AbhyasArenaPage />} />
                                <Route path="/satark-hub" element={<SatarkHubPage />} />
                                <Route path="/profile" element={<ProfileSettingsPage />} />
                                <Route path="/settings" element={<ProfileSettingsPage />} />
                                <Route path="/help" element={<HelpPage />} />
                                <Route path="/course/:courseId" element={<CoursePage />} />
                                <Route path="/safety-quiz/:disasterType" element={<SafetyQuizPage />} />
                                <Route path="/hazard-hunt" element={<HazardHuntPage />} />
                                <Route path="/scenario-mcqs/:disasterType" element={<ScenarioMCQsPage />} />
                                <Route path="/first-aid-match" element={<FirstAidMatchPage />} />
                                <Route path="/virtual-drill/:drillId" element={<VirtualDrillPage />} />
                                <Route path="/report/:studentId" element={<StudentReportPage />} />
                                <Route path="/earthquake-ar" element={<EarthquakeARPage />} />
                            </Route>
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </HashRouter>
                </AuthProvider>
            </OnboardingProvider>
        </ThemeProvider>
    );
};

export default App;


// --- UI COMPONENTS ---

// Confirmation Modal Component
interface ConfirmationModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onConfirm, onCancel }) => {
    const { t } = useTranslation();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-sm m-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white" id="modal-title">{t('logoutModal.title')}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {t('logoutModal.message')}
                </p>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:ring-offset-gray-800"
                    >
                        {t('logoutModal.cancel')}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-danger-DEFAULT rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-DEFAULT dark:ring-offset-gray-800"
                    >
                        {t('logoutModal.confirm')}
                    </button>
                </div>
            </div>
        </div>
    );
}

// 9. Layout Component (includes Sidebar and Header)
const Layout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { isTourOpen } = useOnboarding();
    const location = useLocation();

    // Hide layout for AR page
    if (location.pathname === '/earthquake-ar') {
        return <Outlet />;
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {isTourOpen && <OnboardingTour />}
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-6 py-8">
                        <Outlet />
                    </div>
                </main>
            </div>
            <ChatbotWidget />
        </div>
    );
};

// 10. Header Component
const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
    const { user } = useAuth();
    const { t } = useTranslation();
    return (
        <header className="flex justify-between md:justify-end items-center px-6 py-4 bg-white dark:bg-gray-800 border-b-2 border-gray-100 dark:border-gray-700">
             <button onClick={onMenuClick} className="text-gray-500 dark:text-gray-300 focus:outline-none md:hidden">
                <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
                <div data-tour-id="language-switcher">
                    <LanguageSwitcher />
                </div>
                <span className="text-gray-800 dark:text-gray-300 hidden md:block">{t('header.welcome', { name: user?.name })}</span>
                <img className="h-10 w-10 rounded-full object-cover" src={user?.avatar} alt="User avatar" />
            </div>
        </header>
    );
};


// 11. Sidebar Component
interface SidebarProps {
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const { t } = useTranslation();

    const roleLinks = SIDEBAR_LINKS[user?.role || UserRole.Student];

    const iconMap: { [key: string]: React.ElementType } = {
        'sidebar.dashboard': HomeIcon,
        'sidebar.gyanKendra': BookOpen,
        'sidebar.abhyasArena': Sword,
        'sidebar.satarkHub': Shield,
        'sidebar.help': HelpCircle,
        'sidebar.profile': UserIcon,
        'sidebar.settings': Settings
    };

    const navLinks = roleLinks.map(link => {
        const Icon = iconMap[link.nameKey];
        const isActive = location.pathname === link.path;
        
        let tourId = '';
        if (link.path === '/gyan-kendra') tourId = 'gyan-kendra-link';
        if (link.path === '/abhyas-arena') tourId = 'abhyas-arena-link';
        if (link.path === '/satark-hub') tourId = 'satark-hub-link';

        return (
            <Link
                key={link.nameKey}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 mt-2 transition-colors duration-300 transform rounded-lg hover:bg-primary-hover hover:text-white ${isActive ? 'bg-primary-hover text-white' : 'text-blue-200'}`}
                data-tour-id={tourId || undefined}
            >
                {Icon && <Icon className="h-5 w-5" />}
                <span className="mx-4 font-medium">{t(link.nameKey)}</span>
            </Link>
        );
    });

    return (
        <>
            {/* Overlay for mobile */}
            <div className={`fixed inset-0 bg-black opacity-50 z-20 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>

            <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary-DEFAULT overflow-x-hidden overflow-y-auto scrollbar-hide transition-transform duration-300 transform md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between px-6 py-4">
                     <Link to="/dashboard" className="text-2xl font-bold text-white">
                        {t('appName')}
                    </Link>
                    <button className="md:hidden text-white" onClick={() => setSidebarOpen(false)}>
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div data-tour-id="profile-info" className="flex flex-col items-center mt-6 -mx-2">
                    <img className="object-cover w-24 h-24 mx-2 rounded-full border-4 border-white/50" src={user?.avatar} alt="avatar" />
                    <h4 className="mx-2 mt-2 font-medium text-white">{user?.name}</h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-blue-200">{user?.role}</p>
                </div>
                
                <nav data-tour-id="sidebar-nav" className="mt-10 px-4">
                    {navLinks}
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setShowLogoutConfirm(true); }}
                        className="flex items-center px-4 py-3 mt-8 text-blue-200 transition-colors duration-300 transform rounded-lg hover:bg-primary-hover hover:text-white"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="mx-4 font-medium">{t('sidebar.logout')}</span>
                    </a>
                </nav>
            </div>
            {showLogoutConfirm && (
                <ConfirmationModal
                    onConfirm={() => {
                        logout();
                        setShowLogoutConfirm(false);
                    }}
                    onCancel={() => setShowLogoutConfirm(false)}
                />
            )}
        </>
    );
};