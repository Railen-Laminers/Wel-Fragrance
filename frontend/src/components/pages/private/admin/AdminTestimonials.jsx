import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { deleteTestimonial, getAdminTestimonials, updateTestimonialStatus } from '../../../../api/testimonials';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  return `${baseUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
};

export default function AdminTestimonials() {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [pendingActionId, setPendingActionId] = useState(null);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await getAdminTestimonials();
      setTestimonials(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load testimonials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleStatusChange = async (id, status) => {
    setPendingActionId(id);
    setError('');
    try {
      await updateTestimonialStatus(id, status);
      await loadTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update testimonial status.');
    } finally {
      setPendingActionId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial submission?')) return;
    setPendingActionId(id);
    setError('');
    try {
      await deleteTestimonial(id);
      await loadTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete testimonial.');
    } finally {
      setPendingActionId(null);
    }
  };

  return (
    <section className="min-h-screen px-6 py-24 text-black dark:text-white">
      <div className="mx-auto max-w-7xl rounded-lg border border-black/10 bg-white/80 p-8 shadow-xl backdrop-blur transition-opacity duration-700 dark:border-white/10 dark:bg-dark-teal/80">
        {/* Header – no eyebrow, no badge */}
        <div>
          <h1
            className={`text-3xl font-semibold sm:text-4xl font-cormorant transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Testimonials <span className="text-old-gold">Review</span>
          </h1>
          <p
            className={`mt-2 max-w-2xl text-base text-black/70 dark:text-white/70 transition-all duration-700 delay-100 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Review submitted stories, approve or reject them, and keep your public testimonials curated.
          </p>
        </div>

        {error && (
          <div className="mt-8 rounded-lg border border-rose-400/30 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 text-sm text-black/60 dark:text-white/60">Loading testimonials…</div>
        ) : testimonials.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-black/10 p-10 text-center text-black/60 dark:border-white/10 dark:text-white/60">
            No testimonial submissions yet.
          </div>
        ) : (
          <div
            className={`mt-8 space-y-4 transition-all duration-700 delay-200 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="rounded-lg border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  {/* Left: Avatar + info */}
                  <div className="flex gap-4">
                    {item.profilePicture ? (
                      <img
                        src={getImageUrl(item.profilePicture)}
                        alt={`${item.firstName} ${item.lastName}`}
                        className="h-16 w-16 rounded-full object-cover border border-old-gold/30"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-old-gold/20 text-lg font-semibold text-old-gold">
                        {item.firstName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-semibold">
                          {item.firstName} {item.lastName}
                        </h2>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs uppercase tracking-[0.2em] ${item.status === 'Approved'
                              ? 'border-emerald-400/40 text-emerald-600 dark:text-emerald-300'
                              : item.status === 'Rejected'
                                ? 'border-rose-400/40 text-rose-600 dark:text-rose-300'
                                : 'border-old-gold/30 text-old-gold'
                            }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-black/60 dark:text-white/60">{item.email}</p>
                      <p className="mt-3 text-sm leading-7 text-black/80 dark:text-white/80">
                        “{item.message}”
                      </p>
                      <div className="mt-3 text-sm text-black/60 dark:text-white/60">
                        Rating: {item.rating}/5 • Submitted:{' '}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Right: Status select + Delete button */}
                  <div className="flex flex-col gap-2 lg:min-w-[220px]">
                    <label className="text-xs uppercase tracking-[0.2em] text-black/50 dark:text-white/50">
                      Status
                    </label>
                    <select
                      value={item.status}
                      disabled={pendingActionId === item._id}
                      onChange={(event) => handleStatusChange(item._id, event.target.value)}
                      className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-old-gold disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-dark-teal"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={pendingActionId === item._id}
                      className="group relative overflow-hidden rounded-lg border border-rose-400/40 px-3 py-2 text-sm text-rose-600 transition-all hover:shadow-[0_0_20px_rgba(244,63,94,0.2)] disabled:cursor-not-allowed disabled:opacity-70 dark:text-rose-300"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {pendingActionId === item._id ? (
                          <>
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
                              <path d="M21 12a9 9 0 00-9-9" strokeLinecap="round" />
                            </svg>
                            Deleting…
                          </>
                        ) : 'Delete'}
                      </span>
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