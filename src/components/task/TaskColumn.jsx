import TaskCard from "./TaskCard";

export default function TaskColumn({ title, tasks, bgColor, moveTask }) {
    return (
        <div className={`p-4 rounded-lg ${bgColor} flex-1 min-w-[250px]`}>
            <h2 className="font-sans text-xl font-bold text-gray-800 mb-4">{title}</h2>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    moveTask={moveTask}
                    currentStatus={title}
                />
            ))}
        </div>
    );
}