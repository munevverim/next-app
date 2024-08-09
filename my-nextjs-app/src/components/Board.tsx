import React from 'react';

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
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">{name}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mt-2">{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
