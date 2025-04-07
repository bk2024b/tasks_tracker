'use client'

import { useState, useEffect } from "react";
import TaskColumn from "@/components/task/TaskColumn";
import TaskForm from "@/components/task/TaskForm";
import { PlusCircle } from "lucide-react";

// Mappage entre les noms affichés et les clés techniques
export const STATUS_MAP = {
  "À faire": "todo",
  "En cours": "inProgress",
  "Terminé": "done"
};

// Mappage inverse pour faciliter l'affichage
export const STATUS_LABELS = {
  "todo": "À faire",
  "inProgress": "En cours",
  "done": "Terminé"
};

// Couleurs par statut pour une cohérence visuelle
export const STATUS_COLORS = {
  "todo": {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    progress: "bg-indigo-500"
  },
  "inProgress": {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    progress: "bg-amber-500"
  },
  "done": {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    progress: "bg-emerald-500"
  }
};

const initialTasks = {
  todo: [
    { id: 1, title: "Développer portfolio", description: "Créer un site professionnel pour présenter mes projets", priority: "high", dueDate: "2025-05-15" },
    { id: 2, title: "Maîtriser Tailwind CSS", description: "Approfondir les connaissances sur les classes utilitaires et les configurations personnalisées", priority: "medium", dueDate: "2025-04-30" },
    { id: 3, title: "Contacter entreprises ciblées", description: "Démarcher les PME du secteur pour proposer mes services de développement web", priority: "high", dueDate: "2025-05-05" },
  ],
  inProgress: [
    { id: 4, title: "Développer Task Tracker", description: "Créer une interface Kanban interactive avec fonctionnalités avancées", priority: "medium", dueDate: "2025-04-20" },
  ],
  done: [
    { id: 5, title: "Initialiser projet Next.js", description: "Configuration réussie de l'environnement de développement avec structure de fichiers optimisée", priority: "low", dueDate: "2025-04-01" },
  ],
};

export default function TaskTracker() {
  const [tasks, setTasks] = useState(() => {
    // Récupération des tâches depuis le localStorage si disponibles
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : initialTasks;
    }
    return initialTasks;
  });
  
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [nextId, setNextId] = useState(6); // Commence à 6 car les IDs initiaux vont jusqu'à 5
  
  // Sauvegarder les tâches dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Récupération du thème préféré du système
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  const moveTask = (taskId, newStatusLabel) => {
    // Convertir le label affiché en clé technique
    const newStatus = STATUS_MAP[newStatusLabel];
    if (!newStatus) {
      console.error(`Status invalide: ${newStatus}`);
      return;
    }
    
    const updatedTasks = { ...tasks };
    for (let status in updatedTasks) {
      const taskIndex = updatedTasks[status].findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        const [task] = updatedTasks[status].splice(taskIndex, 1);
        updatedTasks[newStatus].push(task);
        setTasks(updatedTasks);
        break;
      }
    }
  };

  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: nextId
    };
    
    setNextId(nextId + 1);
    
    const updatedTasks = {
      ...tasks,
      [STATUS_MAP[newTask.status]]: [...tasks[STATUS_MAP[newTask.status]], taskWithId]
    };
    
    setTasks(updatedTasks);
    setShowModal(false);
  };
  
  const deleteTask = (taskId) => {
    const updatedTasks = { ...tasks };
    for (let status in updatedTasks) {
      const taskIndex = updatedTasks[status].findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        updatedTasks[status].splice(taskIndex, 1);
        setTasks(updatedTasks);
        break;
      }
    }
  };

  // Filtrer les tâches en fonction du terme de recherche
  const getFilteredTasks = () => {
    if (!searchTerm.trim()) return tasks;
    
    const filtered = { todo: [], inProgress: [], done: [] };
    
    for (const status in tasks) {
      filtered[status] = tasks[status].filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  // Obtenir les statistiques des tâches
  const getTaskStats = () => {
    const total = Object.values(tasks).flat().length;
    const completed = tasks.done.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, percentage };
  };

  const stats = getTaskStats();
  const filteredTasks = getFilteredTasks();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      {/* En-tête */}
      <header className="py-6 px-8 border-b shadow-sm mb-6 sticky top-0 z-10 backdrop-blur-lg bg-opacity-80 transition-colors duration-300"
              style={{ backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(249, 250, 251, 0.8)' }}>
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">Task Tracker Pro</h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gérez vos projets efficacement</p>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-3 pr-10 py-2 rounded-lg w-full min-w-[200px] focus:ring-2 focus:ring-indigo-500 outline-none ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border`}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{stats.completed} tâches terminées sur {stats.total}</span>
              <span>{stats.percentage}%</span>
            </div>
            <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500"
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 pb-16">
        {/* Colonnes */}
        <div className="grid gap-6 md:grid-cols-3">
          <TaskColumn
            title="À faire"
            tasks={filteredTasks.todo}
            bgColor={STATUS_COLORS.todo.bg}
            borderColor={STATUS_COLORS.todo.border}
            textColor={STATUS_COLORS.todo.text}
            accentColor={STATUS_COLORS.todo.progress}
            moveTask={moveTask}
            deleteTask={deleteTask}
            darkMode={darkMode}
          />
          <TaskColumn
            title="En cours"
            tasks={filteredTasks.inProgress}
            bgColor={STATUS_COLORS.inProgress.bg}
            borderColor={STATUS_COLORS.inProgress.border}
            textColor={STATUS_COLORS.inProgress.text}
            accentColor={STATUS_COLORS.inProgress.progress}
            moveTask={moveTask}
            deleteTask={deleteTask}
            darkMode={darkMode}
          />
          <TaskColumn
            title="Terminé"
            tasks={filteredTasks.done}
            bgColor={STATUS_COLORS.done.bg}
            borderColor={STATUS_COLORS.done.border}
            textColor={STATUS_COLORS.done.text}
            accentColor={STATUS_COLORS.done.progress}
            moveTask={moveTask}
            deleteTask={deleteTask}
            darkMode={darkMode}
          />
        </div>
        
        {/* Bouton Ajouter une tâche flottant */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            aria-label="Ajouter une tâche"
          >
            <PlusCircle size={24} />
          </button>
        </div>
      </main>

      {/* Modal Form */}
      {showModal && (
        <TaskForm 
          onClose={() => setShowModal(false)} 
          onSubmit={addTask}
          darkMode={darkMode}
        />
      )}
      
      {/* Footer */}
      <footer className={`text-center py-6 border-t ${
        darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
      }`}>
        <div className="container mx-auto px-4">
          <p>Conçu et développé par Josias Boco © 2025</p>
          <p className="text-sm mt-1">Réalisé avec Next.js et Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}