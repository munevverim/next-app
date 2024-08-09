"use client"; // Client Component olarak işaretleme

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // next/router yerine next/navigation

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form onSubmit={handleLogin} className="bg-pink-500 p-6 rounded-lg shadow-md w-80">
        <h2 className="mb-4 text-2xl text-white font-bold">Login</h2>
        <div className="mb-4">
          <label className="block text-sm text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-pink-700 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-pink-700 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
        </div>
        <button type="submit" className="w-full bg-black text-pink-500 p-2 rounded hover:bg-pink-600">Login</button>
      </form>
    </div>
  );
};

export default Login;

