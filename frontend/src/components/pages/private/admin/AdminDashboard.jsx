import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <section className="min-h-screen px-6 py-24 text-black dark:text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-black/10 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-dark-teal/80">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-old-gold">Admin Panel</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Welcome back, {user?.firstName || 'Admin'}</h1>
            <p className="mt-3 max-w-2xl text-base text-black/70 dark:text-white/70">
              This protected area is now reserved for authenticated admins. You can expand it with inventory, orders, and content management views from here.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-old-gold/50 px-5 py-3 text-sm font-medium transition hover:bg-old-gold hover:text-black"
          >
            Logout
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: 'Orders', value: '12 pending' },
            { title: 'Products', value: '48 live' },
            { title: 'Customers', value: '320 active' },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm uppercase tracking-[0.2em] text-black/50 dark:text-white/50">{card.title}</p>
              <p className="mt-2 text-2xl font-semibold">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
