"use client";

import { useEffect, useState } from 'react';
import Board from './Board';
import NewTaskForm from './NewTaskForm';

interface Task {
  id: string;
  name: string;
}

interface BoardData {
  id: string;
  name: string;
  tasks: Task[];
}

const Dashboard: React.FC = () => {
  const [boards, setBoards] = useState<BoardData[]>([]);
  const [showNewTaskForm, setShowNewTaskForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchBoards = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBoards(data.boards || []);
    };

    fetchBoards();
  }, []);

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-3xl">
        <h1 className="text-center text-4xl font-bold mb-6 text-pink-500">Dashboard</h1>
        <div className="bg-gray-800 shadow-lg w-full rounded-lg divide-y divide-gray-700">
          <div className="px-5 py-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boards.length > 0 ? (
                boards.map((board) => (
                  <Board key={board.id} id={board.id} name={board.name} tasks={board.tasks} />
                ))
              ) : (
                <div className="text-center text-gray-400">No boards available</div>
              )}
            </div>
            <button
              className="mt-6 bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              onClick={() => setShowNewTaskForm(true)}
            >
              New Task
            </button>
            {showNewTaskForm && <NewTaskForm closeForm={() => setShowNewTaskForm(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
