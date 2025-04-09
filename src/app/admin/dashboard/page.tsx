'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminNavSections } from '@/app/data/structures';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('cognitoToken');
    if (!token) {
      router.push('/admin'); // redirect to login
    } else {
      setIsLoading(false); // allow dashboard to render
    }
  }, [router]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-[#fff9f2] p-4 text-slate-800 rounded-lg">
      <h1 className="text-3xl sm:text-2xl font-bold mb-6 text-primary">Welcome to the Admin Dashboard</h1>

      <div className="flex flex-col gap-4 justify-start md:items-center pt-[3rem]">
        {Object.entries(adminNavSections).map(([key, label], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="w-full min-w-[250px] max-w-[400px] md:max-w-[500px]"
          >
            <Link href={`/admin/${key}`}>
              <div className="bg-white hover:bg-orange-100 transition-all border border-orange-300 p-6 rounded-2xl shadow-md hover:shadow-lg flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-700">{label}</h2>
                  <p className="text-sm text-slate-500 mt-1">Manage {label.toLowerCase()}</p>
                </div>
                <ArrowRight className="text-orange-600" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
