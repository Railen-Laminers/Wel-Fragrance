import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { deleteInquiry, getAdminInquiries, markInquiryAsRead } from '../../../../api/testimonials';

export default function AdminInquiries() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const data = await getAdminInquiries();
      setInquiries(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load inquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleRead = async (id) => {
    try {
      await markInquiryAsRead(id);
      await loadInquiries();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not mark inquiry as read.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry submission?')) return;

    try {
      await deleteInquiry(id);
      await loadInquiries();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete inquiry.');
    }
  };

  return (
    <section className="min-h-screen px-6 py-24 text-black dark:text-white">
      <div className="mx-auto max-w-7xl rounded-3xl border border-black/10 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-dark-teal/80">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-old-gold">Admin Panel</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Inquiry Inbox</h1>
            <p className="mt-3 max-w-2xl text-base text-black/70 dark:text-white/70">
              Review incoming contact requests, mark them as read, and remove anything that has been handled.
            </p>
          </div>
          <div className="rounded-full border border-old-gold/40 px-4 py-2 text-sm text-black/70 dark:text-white/70">
            Signed in as {user?.firstName || 'Admin'}
          </div>
        </div>

        {error && <div className="mt-8 rounded-2xl border border-rose-400/30 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">{error}</div>}

        {loading ? (
          <div className="mt-8 text-sm text-black/60 dark:text-white/60">Loading inquiries…</div>
        ) : inquiries.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-black/10 p-10 text-center text-black/60 dark:border-white/10 dark:text-white/60">
            No inquiry submissions yet.
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {inquiries.map((item) => (
              <div key={item._id} className="rounded-2xl border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">{item.firstName} {item.lastName}</h2>
                      <span className={`rounded-full border px-2.5 py-1 text-xs uppercase tracking-[0.2em] ${item.status === 'Read' ? 'border-emerald-400/40 text-emerald-600 dark:text-emerald-300' : 'border-old-gold/30 text-old-gold'}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-black/60 dark:text-white/60">{item.email}</p>
                    {item.facebookLink && <p className="mt-2 text-sm text-black/60 dark:text-white/60">Facebook: {item.facebookLink}</p>}
                    <p className="mt-3 text-sm leading-7 text-black/80 dark:text-white/80">{item.message}</p>
                    <div className="mt-3 text-sm text-black/60 dark:text-white/60">
                      Submitted: {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:min-w-[180px]">
                    <button onClick={() => handleRead(item._id)} className="rounded-xl border border-old-gold/40 px-3 py-2 text-sm transition hover:bg-old-gold/10">Mark as read</button>
                    <button onClick={() => handleDelete(item._id)} className="rounded-xl border border-rose-400/40 px-3 py-2 text-sm text-rose-600 transition hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-900/20">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
