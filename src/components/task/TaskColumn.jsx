import TaskCard from "./TaskCard";

export default function TaskColumn({ 
  title, 
  tasks, 
  bgColor, 
  borderColor, 
  textColor, 
  accentColor,
  moveTask, 
  deleteTask,
  darkMode
}) {
    return (
        <div className={`p-4 rounded-lg ${
          darkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : `${bgColor} border ${borderColor}`
        } flex-1 min-w-[280px]`}>
            {/* En-tête de la colonne */}
            <div className="flex items-center justify-between mb-4">
                <h2 className={`font-sans text-xl font-bold ${darkMode ? 'text-white' : textColor}`}>
                    {title}
                </h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  darkMode ? 'bg-gray-700 text-white' : bgColor
                }`}>
                    {tasks.length}
                </span>
            </div>
            
            {/* Liste des tâches */}
            <div className="space-y-3">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            moveTask={moveTask}
                            deleteTask={deleteTask}
                            currentStatus={title}
                            darkMode={darkMode}
                            accentColor={textColor}
                        />
                    ))
                ) : (
                    <div className={`p-4 border border-dashed rounded-lg text-center ${
                      darkMode 
                        ? 'border-gray-700 text-gray-500' 
                        : 'border-gray-300 text-gray-400'
                    }`}>
                        <p className="text-sm">Aucune tâche</p>
                    </div>
                )}
            </div>
        </div>
    );
}