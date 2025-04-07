export default function TaskCard({ task, moveTask, currentStatus }) {
    const statuses = ["A faire", "En cours", "Terminé"];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % 3];
    return (
        <div className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg bg-white p-3 mb-3 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <button onClick={() => moveTask(task.id, nextStatus)} className="mt-2 text-blue-500 text-sm hover:underline">
                Déplacer vers {nextStatus}
            </button>
        </div>
    );
}