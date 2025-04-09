// app/admin/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from '../lib/cognitoAuth';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await signIn(email, password);
      localStorage.setItem('cognitoToken', token);
      router.push('/admin/dashboard');
    } catch (error: any) {
      setErrorMsg(error.message || 'Failed to sign in.');
    }
  };

  return (
    <div className="bg-[#f5e3c5] min-h-screen flex items-center justify-center text-slate-800">
      <motion.div
        className="bg-[#faf0e0] shadow-md p-4 rounded-lg max-w-[400px] w-full border border-orange-100"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          <button
            type="submit"
            className="w-full bg-primary font-bold text-[1.3rem] hover:underline text-slate-700 py-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}
