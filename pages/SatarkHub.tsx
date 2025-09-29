import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { Send, Users, ChevronDown, TriangleAlert, MapPin } from '../components/Icons';
import { useTranslation } from 'react-i18next';

interface Alert {
    id: number;
    type: 'Flood' | 'Cyclone' | 'Earthquake' | 'Fire';
    severity: 'Severe' | 'Moderate' | 'Advisory';
    time: string;
    source: 'IMD' | 'NDMA' | 'CWC';
    message: string;
    acknowledged: boolean;
    location: string;
    coordinates: { lat: number, lon: number };
}

const mockAlertsData: Omit<Alert, 'acknowledged'>[] = [
    { id: 1, type: 'Flood', severity: 'Severe', time: '15 mins ago', source: 'IMD', message: 'Heavy rainfall expected in low-lying areas. Evacuate immediately.', location: 'Delhi, India', coordinates: { lat: 28.6139, lon: 77.2090 } },
    { id: 2, type: 'Cyclone', severity: 'Moderate', time: '1 hour ago', source: 'NDMA', message: 'Cyclone Tauktae approaching coast. Stay indoors.', location: 'Mumbai, India', coordinates: { lat: 19.0760, lon: 72.8777 } },
    { id: 3, type: 'Earthquake', severity: 'Advisory', time: '3 hours ago', source: 'NDMA', message: 'Minor tremors felt. Be cautious of aftershocks.', location: 'Chennai, India', coordinates: { lat: 13.0827, lon: 80.2707 } },
];

const severityColors = {
    Severe: 'bg-red-100 text-red-800 border-red-500 dark:bg-red-900/50 dark:text-red-200 dark:border-red-600',
    Moderate: 'bg-orange-100 text-orange-800 border-orange-500 dark:bg-orange-900/50 dark:text-orange-200 dark:border-orange-600',
    Advisory: 'bg-green-100 text-green-800 border-green-500 dark:bg-green-900/50 dark:text-green-200 dark:border-green-600',
};

// Main Satark Hub Page
const SatarkHubPage: React.FC = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const [alerts, setAlerts] = useState<Alert[]>(
        mockAlertsData.map(alert => ({ ...alert, acknowledged: false }))
    );
    const [showAcknowledged, setShowAcknowledged] = useState(true);

    const handleAcknowledge = (alertId: number) => {
        setAlerts(prevAlerts =>
            prevAlerts.map(alert =>
                alert.id === alertId ? { ...alert, acknowledged: true } : alert
            )
        );
    };

    const filteredAlerts = useMemo(() => {
        if (showAcknowledged) return alerts;
        return alerts.filter(alert => !alert.acknowledged);
    }, [alerts, showAcknowledged]);


    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
                    <TriangleAlert className="w-10 h-10" />
                    {t('satarkHub.title')}
                </h1>
                <h2 className="text-2xl font-semibold text-primary-DEFAULT">{t('satarkHub.subtitle')}</h2>
                <p className="mt-2 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                    {t('satarkHub.description')}
                </p>
            </div>
            
            {user?.role === UserRole.Administrator && <AdminBroadcast />}
            {user?.role === UserRole.Teacher && <TeacherRollCall />}
            
            {/* Live Alert Feed */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t('satarkHub.liveFeed')}</h3>
                    <label className="flex items-center cursor-pointer">
                        <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t('satarkHub.showAcknowledged')}</span>
                        <div className="relative">
                            <input type="checkbox" checked={showAcknowledged} onChange={() => setShowAcknowledged(!showAcknowledged)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-DEFAULT"></div>
                        </div>
                    </label>
                </div>

                {filteredAlerts.length > 0 ? (
                     filteredAlerts.map(alert => (
                        <AlertCard key={alert.id} alert={alert} onAcknowledge={handleAcknowledge} />
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <p>{t('satarkHub.noAlerts')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Static Map Placeholder Component
const StaticMapPlaceholder: React.FC = () => (
    <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 dark:text-gray-500">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
            <rect x="30%" y="30%" width="40%" height="40%" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-center">
                <MapPin className="h-8 w-8 text-danger-DEFAULT mx-auto" />
                <span className="bg-black/50 text-white text-xs font-bold py-1 px-2 rounded mt-1 inline-block">MAP PREVIEW</span>
            </div>
        </div>
    </div>
);


// Alert Card Component
const AlertCard: React.FC<{ alert: Alert, onAcknowledge: (id: number) => void }> = ({ alert, onAcknowledge }) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`border-l-4 rounded-r-lg p-4 transition-all duration-300 ${severityColors[alert.severity]} ${alert.acknowledged ? 'opacity-60' : ''}`}>
            {/* Clickable Header for Toggling */}
            <div className="flex justify-between items-start cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div>
                    <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${severityColors[alert.severity].replace('border-l-4', '').replace('p-4', '')}`}>{alert.severity}</span>
                    <h4 className="font-bold text-lg mt-1">{alert.type} Alert</h4>
                </div>
                <div className="flex items-center">
                    <div className="text-right text-xs">
                        <p>{alert.time}</p>
                        <p>Source: <strong>{alert.source}</strong></p>
                    </div>
                    <ChevronDown className={`ml-4 h-6 w-6 shrink-0 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {/* Always visible message */}
            <p className="mt-2">{alert.message}</p>

            {/* Location Info */}
            <div className="mt-3 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <MapPin className="h-5 w-5 mr-2 text-primary-DEFAULT flex-shrink-0" />
                <span>{alert.location} ({alert.coordinates.lat}, {alert.coordinates.lon})</span>
            </div>
 
            {/* Expandable Detailed Info Section */}
            <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] mt-4 pt-4 border-t border-gray-300 dark:border-gray-600' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <div className="space-y-4">
                        <div> 
                            <h5 className="font-semibold text-gray-800 dark:text-gray-200">Affected Area</h5>
                            <div className="mt-2">
                                <StaticMapPlaceholder />
                            </div>
                        </div>
                         <div>
                            <h5 className="font-semibold text-gray-800 dark:text-gray-200">Related Safety Tips</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                For more details, visit the 'Gyan Kendra' section on Flood Safety. Practice evacuation drills in the 'Abhyas Arena'.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/gyan-kendra" className="bg-primary-DEFAULT text-white text-sm font-semibold py-1 px-3 rounded-lg hover:bg-primary-hover">{t('satarkHub.learnSafety')}</Link>
                <button 
                    onClick={() => onAcknowledge(alert.id)}
                    disabled={alert.acknowledged}
                    className={`text-sm font-semibold py-1 px-3 rounded-lg transition-colors ${
                        alert.acknowledged 
                        ? 'bg-green-200 dark:bg-green-800/50 text-green-800 dark:text-green-200 cursor-not-allowed' 
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                >
                    {alert.acknowledged ? t('satarkHub.acknowledged') : t('satarkHub.acknowledge')}
                </button>
            </div>
        </div>
    );
};

// Admin Broadcast Component
const AdminBroadcast: React.FC = () => (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Campus Broadcast Tool</h3>
        <div className="relative">
            <textarea
                className="w-full p-3 pr-24 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
                rows={2}
                placeholder="Type your campus-wide alert here..."
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary-DEFAULT text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover flex items-center">
                <Send className="h-4 w-4 mr-2" />
                Send
            </button>
        </div>
    </div>
);

// Teacher Roll Call Component
const TeacherRollCall: React.FC = () => {
    const students = [
        { name: 'Anjali Gupta', status: 'Safe' },
        { name: 'Vikram Rathore', status: 'Unconfirmed' },
        { name: 'Sneha Patel', status: 'Safe' },
    ];
    const safeCount = students.filter(s => s.status === 'Safe').length;

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center"><Users className="mr-2"/>Digital Roll Call</h3>
                <span className="font-bold text-lg text-success-DEFAULT">{safeCount} / {students.length} Safe</span>
            </div>
            <div className="space-y-3">
                {students.map(student => (
                    <div key={student.name} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="font-medium text-gray-800 dark:text-gray-200">{student.name}</span>
                        <div className="flex space-x-2">
                            <button className={`px-3 py-1 text-xs font-semibold rounded-full ${student.status === 'Safe' ? 'bg-success-DEFAULT text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'}`}>✅ Safe</button>
                            <button className={`px-3 py-1 text-xs font-semibold rounded-full ${student.status === 'Unconfirmed' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'}`}>⚠️ Unconfirmed</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SatarkHubPage;
