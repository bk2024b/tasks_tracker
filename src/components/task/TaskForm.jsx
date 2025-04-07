import { useState } from 'react';
import { X } from 'lucide-react';
import { STATUS_LABELS } from '@/app/page';

export default function TaskForm({ onClose, onSubmit, darkMode }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        status: 'À faire',
        dueDate: ''
    });
    
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Réinitialiser l'erreur pour ce champ
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Le titre est requis';
        }
        
        if (!formData.description.trim()) {
            newErrors.description = 'La description est requise';
        }
        
        if (!formData.dueDate) {
            newErrors.dueDate = 'La date d\'échéance est requise';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            onSubmit(formData);
        }
    };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className={`relative w-full max-w-md p-6 rounded-lg shadow-xl ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}>
                <button 
                    onClick={onClose}
                    className={`absolute top-4 right-4 p-1 rounded-full ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                >
                    <X size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                </button>
                
                <h2 className="text-2xl font-bold mb-6">Nouvelle tâche</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Titre */}
                        <div>
                            <label htmlFor="title" className={`block text-sm font-medium mb-1 ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                Titre
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 rounded-md border ${
                                    errors.title 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : darkMode
                                            ? 'border-gray-600 bg-gray-700 focus:ring-indigo-500'
                                            : 'border-gray-300 focus:ring-indigo-500'
                                } focus:ring-2 outline-none transition-colors`}
                                placeholder="Titre de la tâche"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                            )}
                        </div>
                        
                        {/* Description */}
                        <div>
                            <label htmlFor="description" className={`block text-sm font-medium mb-1 ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className={`w-full px-3 py-2 rounded-md border ${
                                    errors.description
                                        ? 'border-red-500 focus:ring-red-500'
                                        : darkMode
                                            ? 'border-gray-600 bg-gray-700 focus:ring-indigo-500'
                                            : 'border-gray-300 focus:ring-indigo-500'
                                } focus:ring-2 outline-none transition-colors`}
                                placeholder="Description détaillée de la tâche"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>
                        
                        {/* Statut et Priorité */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="status" className={`block text-sm font-medium mb-1 ${
                                    darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    Statut
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 rounded-md border appearance-none ${
                                        darkMode
                                            ? 'border-gray-600 bg-gray-700 focus:ring-indigo-500'
                                            : 'border-gray-300 focus:ring-indigo-500'
                                    } focus:ring-2 outline-none transition-colors`}
                                >
                                    {Object.values(STATUS_LABELS).map(label => (
                                        <option key={label} value={label}>{label}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="priority" className={`block text-sm font-medium mb-1 ${
                                    darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    Priorité
                                </label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 rounded-md border appearance-none ${
                                        darkMode
                                            ? 'border-gray-600 bg-gray-700 focus:ring-indigo-500'
                                            : 'border-gray-300 focus:ring-indigo-500'
                                    } focus:ring-2 outline-none transition-colors`}
                                >
                                    <option value="low">Basse</option>
                                    <option value="medium">Moyenne</option>
                                    <option value="high">Haute</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* Date d'échéance */}
                        <div>
                            <label htmlFor="dueDate" className={`block text-sm font-medium mb-1 ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                Date d'échéance
                            </label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 rounded-md border ${
                                    errors.dueDate
                                        ? 'border-red-500 focus:ring-red-500'
                                        : darkMode
                                            ? 'border-gray-600 bg-gray-700 focus:ring-indigo-500'
                                            : 'border-gray-300 focus:ring-indigo-500'
                                } focus:ring-2 outline-none transition-colors`}
                            />
                            {errors.dueDate && (
                                <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
                            )}
                        </div>
                        
                        {/* Boutons d'action */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className={`px-4 py-2 rounded-md ${
                                    darkMode 
                                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                } transition-colors`}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700 transition-colors"
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}