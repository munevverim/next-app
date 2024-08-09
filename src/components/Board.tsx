import React, { useState } from 'react';
import TaskModal from './TaskModal';

interface Task {
  id: string;
  name: string;
}

interface BoardProps {
  id: string;
  name: string;
  tasks: Task[];
}

const Board: React.FC<BoardProps> = ({ id, name, tasks }) => {
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const closeModal = () => {
    setShowTaskModal(false);
    setSelectedTask(null);
  };

  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-pink-500">{name}</h2>
      <ul>
        {tasks.map((task) => (
          <li 
            key={task.id} 
            className="mb-2 cursor-pointer text-gray-300 hover:text-pink-500" 
            onClick={() => handleTaskClick(task)}
          >
            {task.name}
          </li>
        ))}
      </ul>
      {showTaskModal && selectedTask && (
        <TaskModal task={selectedTask} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Board;
