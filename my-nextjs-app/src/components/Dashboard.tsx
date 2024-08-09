"use client"; // Client Component olarak işaretleme

import { useEffect, useState } from 'react';
import Board from './Board';

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

  useEffect(() => {
    const fetchBoards = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBoards(data.boards);
    };

    fetchBoards();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) => (
          <Board key={board.id} id={board.id} name={board.name} tasks={board.tasks} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
