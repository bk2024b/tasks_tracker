import { useState } from 'react';
import { ChevronRight, Trash2, Clock, AlertCircle } from 'lucide-react';
import { STATUS_LABELS } from '@/app/page';

export default function TaskCard({ task, moveTask, currentStatus, deleteTask, darkMode, accentColor }) {
    const statuses = ["À faire", "En cours", "Terminé"];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % 3];
    const [showDetails, setShowDetails] = useState(false);
    
    // Fonction pour déterminer l'icône et la couleur de priorité
    const getPriorityInfo = (priority) => {
        switch(priority) {
            case 'high':
                return { 
                    label: 'Haute',
                    color: 'text-rose-600',
                    bgColor: darkMode ? 'bg-rose-900/30' : 'bg-rose-100'
                };
            case 'medium':
                return { 
                    label: 'Moyenne',
                    color: 'text-amber-600',
                    bgColor: darkMode ? 'bg-amber-900/30' : 'bg-amber-100'
                };
            case 'low':
                return { 
                    label: 'Basse',
                    color: 'text-emerald-600',
                    bgColor: darkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'
                };
            default:
                return { 
                    label: 'Non définie',
                    color: 'text-gray-600',
                    bgColor: darkMode ? 'bg-gray-800' : 'bg-gray-100'
                };
        }
    };
    
    const priorityInfo = getPriorityInfo(task.priority);
    
    // Calcul des jours restants
    const getDaysRemaining = () => {
        if (!task.dueDate) return null;
        
        const today = new Date();
        const dueDate = new Date(task.dueDate);
        const timeDiff = dueDate - today;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        return daysDiff;
    };
    
    const daysRemaining = getDaysRemaining();
    
    // Formatage de la date d'échéance
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
    };
    
    return (
        <div 
            className={`transition-all duration-300 ease-in-out hover:scale-102 ${
                darkMode 
                    ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700 shadow-lg shadow-black/10' 
                    : 'bg-white hover:shadow-lg border border-gray-100'
            } p-4 mb-4 rounded-lg relative`}
        >
            {/* En-tête de la carte */}
            <div className="flex items-start justify-between">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {task.title}
                </h3>
                <div className="flex gap-1">
                    <button 
                        onClick={() => setShowDetails(!showDetails)}
                        className={`text-xs p-1 rounded-md ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        } transition-colors`}
                    >
                        {showDetails ? '−' : '+'}
                    </button>
                </div>
            </div>
            
            {/* Badges de priorité et date */}
            <div className="flex flex-wrap gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${priorityInfo.bgColor} ${priorityInfo.color}`}>
                    <AlertCircle size={12} />
                    {priorityInfo.label}
                </span>
                
                {task.dueDate && (
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                        daysRemaining < 0
                            ? darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                            : daysRemaining === 0
                                ? darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600'
                                : darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                    }`}>
                        <Clock size={12} />
                        {daysRemaining < 0 
                            ? 'En retard' 
                            : daysRemaining === 0 
                                ? 'Aujourd\'hui'
                                : `${daysRemaining} jour${daysRemaining > 1 ? 's' : ''}`}
                    </span>
                )}
            </div>
            
            {/* Description (toujours visible) */}
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
            </p>
            
            {/* Détails (conditionnels) */}
            {showDetails && (
                <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    {task.dueDate && (
                        <div className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <span className="font-medium">Échéance:</span> {formatDate(task.dueDate)}
                        </div>
                    )}
                    
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span className="font-medium">Statut actuel:</span> {currentStatus}
                    </div>
                </div>
            )}
            
            {/* Actions */}
            <div className="flex justify-between mt-3 pt-3 border-t border-dashed border-opacity-50 border-gray-300">
                <button 
                    onClick={() => deleteTask(task.id)}
                    className={`text-xs flex items-center gap-1 ${
                        darkMode 
                            ? 'text-red-400 hover:text-red-300' 
                            : 'text-red-500 hover:text-red-700'
                    } transition-colors`}
                >
                    <Trash2 size={14} />
                    Supprimer
                </button>
                
                <button 
                    onClick={() => moveTask(task.id, nextStatus)}
                    className="text-xs flex items-center gap-1 font-medium"
                    style={{ color: accentColor }}
                >
                    <span>Vers {nextStatus}</span>
                    <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
}