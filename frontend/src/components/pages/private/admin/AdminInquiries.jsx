import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { deleteInquiry, getAdminInquiries, markInquiryAsRead } from '../../../../api/testimonials';

export default function AdminInquiries() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

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
    setTimeout(() => setIsLoaded(true), 100);
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
      <div className="mx-auto max-w-7xl rounded-lg border border-black/10 bg-white/80 p-8 shadow-xl backdrop-blur transition-opacity duration-700 dark:border-white/10 dark:bg-dark-teal/80">
        {/* Header */}
        <div>
          <h1
            className={`text-3xl font-semibold sm:text-4xl font-cormorant transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Inquiry <span className="text-old-gold">Inbox</span>
          </h1>
          <p
            className={`mt-2 max-w-2xl text-base text-black/70 dark:text-white/70 transition-all duration-700 delay-100 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Review incoming contact requests, mark them as read, and remove anything that has been handled.
          </p>
        </div>

        {error && (
          <div className="mt-8 rounded-lg border border-rose-400/30 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 text-sm text-black/60 dark:text-white/60">Loading inquiries…</div>
        ) : inquiries.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-black/10 p-10 text-center text-black/60 dark:border-white/10 dark:text-white/60">
            No inquiry submissions yet.
          </div>
        ) : (
          <div
            className={`mt-8 space-y-4 transition-all duration-700 delay-200 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            {inquiries.map((item) => (
              <div key={item._id} className="rounded-lg border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">{item.firstName} {item.lastName}</h2>
                      <span className={`rounded-full border px-2.5 py-1 text-xs uppercase tracking-[0.2em] ${item.status === 'Read'
                          ? 'border-emerald-400/40 text-emerald-600 dark:text-emerald-300'
                          : 'border-old-gold/30 text-old-gold'
                        }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-black/60 dark:text-white/60">{item.email}</p>
                    {item.facebookLink && (
                      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                        Facebook: {item.facebookLink}
                      </p>
                    )}
                    <p className="mt-3 text-sm leading-7 text-black/80 dark:text-white/80">{item.message}</p>
                    <div className="mt-3 text-sm text-black/60 dark:text-white/60">
                      Submitted: {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:min-w-[180px]">
                    {/* Primary action – Mark as read */}
                    <button
                      onClick={() => handleRead(item._id)}
                      className="group relative overflow-hidden px-3 py-2 bg-old-gold text-warm-white dark:text-dark-teal text-sm font-medium transition-all hover:shadow-[0_0_20px_rgba(199,159,72,0.3)]"
                    >
                      <span className="relative z-10">Mark as read</span>
                      <div className="absolute inset-0 bg-dark-teal dark:bg-warm-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    </button>

                    {/* Destructive action – Delete */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="group relative overflow-hidden px-3 py-2 border border-rose-400/40 text-rose-600 dark:text-rose-300 text-sm font-medium transition-all hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                    >
                      <span className="relative z-10">Delete</span>
                      <div className="absolute inset-0 bg-rose-50 dark:bg-rose-900/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    </button>
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