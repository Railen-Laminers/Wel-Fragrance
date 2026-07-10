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
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateTestimonialStatus(id, status);
      await loadTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update testimonial status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial submission?')) return;

    try {
      await deleteTestimonial(id);
      await loadTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete testimonial.');
    }
  };

  return (
    <section className="min-h-screen px-6 py-24 text-black dark:text-white">
      <div className="mx-auto max-w-7xl rounded-3xl border border-black/10 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-dark-teal/80">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-old-gold">Admin Panel</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Testimonials Review</h1>
            <p className="mt-3 max-w-2xl text-base text-black/70 dark:text-white/70">
              Review submitted stories, approve or reject them, and keep your public testimonials curated.
            </p>
          </div>
          <div className="rounded-full border border-old-gold/40 px-4 py-2 text-sm text-black/70 dark:text-white/70">
            Signed in as {user?.firstName || 'Admin'}
          </div>
        </div>

        {error && <div className="mt-8 rounded-2xl border border-rose-400/30 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">{error}</div>}

        {loading ? (
          <div className="mt-8 text-sm text-black/60 dark:text-white/60">Loading testimonials…</div>
        ) : testimonials.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-black/10 p-10 text-center text-black/60 dark:border-white/10 dark:text-white/60">
            No testimonial submissions yet.
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {testimonials.map((item) => (
              <div key={item._id} className="rounded-2xl border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    {item.profilePicture ? (
                      <img src={getImageUrl(item.profilePicture)} alt={`${item.firstName} ${item.lastName}`} className="h-16 w-16 rounded-full object-cover border border-old-gold/30" />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-old-gold/20 text-lg font-semibold text-old-gold">
                        {item.firstName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-semibold">{item.firstName} {item.lastName}</h2>
                        <span className="rounded-full border border-old-gold/30 px-2.5 py-1 text-xs uppercase tracking-[0.2em] text-old-gold">{item.status}</span>
                      </div>
                      <p className="mt-1 text-sm text-black/60 dark:text-white/60">{item.email}</p>
                      <p className="mt-3 text-sm leading-7 text-black/80 dark:text-white/80">“{item.message}”</p>
                      <div className="mt-3 text-sm text-black/60 dark:text-white/60">
                        Rating: {item.rating}/5 • Submitted: {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:min-w-[220px]">
                    <label className="text-xs uppercase tracking-[0.2em] text-black/50 dark:text-white/50">Status</label>
                    <select value={item.status} onChange={(event) => handleStatusChange(item._id, event.target.value)} className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-dark-teal">
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
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
