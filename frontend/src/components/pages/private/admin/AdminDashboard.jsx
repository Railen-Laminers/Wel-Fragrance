import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import api from '../../../../api/axios';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get('/api/admin/stats');
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load statistics.');
      }
    };

    loadStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = useMemo(() => user?.role === 'admin', [user]);

  return (
    <section className="min-h-screen px-6 py-24 text-black dark:text-white">
      <div className="mx-auto max-w-6xl rounded-3xl border border-black/10 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-dark-teal/80">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-old-gold">Admin Panel</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Welcome back, {user?.firstName || 'Admin'}</h1>
            <p className="mt-3 max-w-2xl text-base text-black/70 dark:text-white/70">System overview and administration tools.</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-old-gold/50 px-5 py-3 text-sm font-medium transition hover:bg-old-gold hover:text-black"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mt-8 rounded-2xl border border-rose-400/30 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/10 bg-black/5 p-6 text-center">
            <p className="text-sm text-black/70 dark:text-white/70">Total Products</p>
            <p className="mt-4 text-3xl font-semibold">{stats ? stats.totalProducts : '—'}</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-black/5 p-6 text-center">
            <p className="text-sm text-black/70 dark:text-white/70">Total Testimonials</p>
            <p className="mt-4 text-3xl font-semibold">{stats ? stats.totalTestimonials : '—'}</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-black/5 p-6 text-center">
            <p className="text-sm text-black/70 dark:text-white/70">Total Inquiries</p>
            <p className="mt-4 text-3xl font-semibold">{stats ? stats.totalInquiries : '—'}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
