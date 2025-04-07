'use client'

import { useState } from "react";
import TaskColumn from "@/components/task/TaskColumn";

// Mappage entre les noms affichés et les clés techniques

export const STATUS_MAP = {
  "A faire": "todo",
  "En cours": "inProgress",
  "Terminé": "done"
};

//Mappage inverse pour faciliter l'affichage

export const STATUS_LABELS = {
  "todo": "A faire",
  "inProgress": "En cours",
  "done": "Terminé"
}
const initialTasks = {
  todo: [
    { id: 1, title: "Coder portfolio", description: "Créer un site pro pour mes projets." },
    { id: 2, title: "Apprendre Tailwind", description: "Maîtriser le CSS rapide." },
    { id: 3, title: "Contacter PME", description: "Proposer mes services." },
  ],
  inProgress: [
    { id: 4, title: "Développer Task Tracker", description: "Interface Kanban statique." },
  ],
  done: [
    { id: 5, title: "Setup Next.js", description: "Projet initialisé avec succès." },
  ],
}

export default function TaskTracker() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* En-tête */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Task Tracker</h1>
        <p className="text-gray-600">Conçu par Josias Boco - Une démo de gestion de tâches intuitive</p>
      </header>

      {/* Colonnes */}
      <div className="grid gap-4 md:grid-cols-3">
        <TaskColumn
          title="A faire"
          tasks={tasks.todo}
          bgColor="bg-blue-50"
          moveTask={moveTask}
        />
        <TaskColumn
          title="En cours"
          tasks={tasks.inProgress}
          bgColor="bg-blue-50"
          moveTask={moveTask}
        />
        <TaskColumn
          title="Terminé"
          tasks={tasks.done}
          bgColor="bg-green-50"
          moveTask={moveTask}
        />
      </div>
      {/* Bouton Fictif */}
      <div className="text-center mt-6">
        <button
          onClick={()=> setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter une tâche
        </button>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Nouvelle Tâche</h2>
              <p className="text-gray-600">Titre: [Exemple]</p>
              <p className="text-gray-600">Description: [Exemple]</p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
      <footer className="text-center mt-8 text-gray-600">
        <p>Créé avec Next.js et Tailwind CSS - Josias Boco 2025</p>
      </footer>
    </div>
  );
}