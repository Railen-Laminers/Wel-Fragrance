import React, { useEffect, useState } from 'react';
import api from '../../../../api/axios';

const ACTION_OPTIONS = ['Login', 'Logout', 'Create', 'Update', 'Delete', 'View', 'Approve', 'Reject'];
const MODULE_OPTIONS = ['Auth', 'Profile', 'Products', 'Testimonials', 'Inquiries', 'Users'];

const formatDateTime = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleString();
};

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    action: '',
    module: '',
    user: '',
    dateFrom: '',
    dateTo: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadLogs = async (nextPage = 1, nextFilters = filters) => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams({
        page: String(nextPage),
        limit: '10',
      });

      Object.entries(nextFilters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      const response = await api.get(`/api/admin/audit-logs?${params.toString()}`);
      setLogs(response.data.logs || []);
      setTotal(response.data.total || 0);
      setPage(response.data.page || 1);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load audit logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs(1, filters);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loadLogs(1, filters);
  };

  const handleReset = () => {
    const cleared = { search: '', action: '', module: '', user: '', dateFrom: '', dateTo: '' };
    setFilters(cleared);
    loadLogs(1, cleared);
  };

  return (
    <section className="min-h-screen px-4 py-8 text-black dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-black/10 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-dark-teal/80">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-old-gold">Audit Control</p>
            <h1 className="mt-2 text-3xl font-semibold">Audit Logs</h1>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Review administrative and user activity across the platform.
            </p>
          </div>
          <div className="rounded-full border border-old-gold/40 px-4 py-2 text-sm font-medium text-old-gold">
            {total} entries
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 rounded-2xl border border-black/10 bg-black/5 p-4 md:grid-cols-2 xl:grid-cols-4 dark:border-white/10 dark:bg-white/5">
          <label className="text-sm">
            <span className="mb-2 block text-black/70 dark:text-white/70">Search</span>
            <input
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Search description, user, module"
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-old-gold dark:border-white/10 dark:bg-dark-teal"
            />
          </label>

          <label className="text-sm">
            <span className="mb-2 block text-black/70 dark:text-white/70">Action</span>
            <select
              name="action"
              value={filters.action}
              onChange={handleChange}
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-old-gold dark:border-white/10 dark:bg-dark-teal"
            >
              <option value="">All actions</option>
              {ACTION_OPTIONS.map((action) => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-2 block text-black/70 dark:text-white/70">Module</span>
            <select
              name="module"
              value={filters.module}
              onChange={handleChange}
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-old-gold dark:border-white/10 dark:bg-dark-teal"
            >
              <option value="">All modules</option>
              {MODULE_OPTIONS.map((module) => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-2 block text-black/70 dark:text-white/70">User</span>
            <input
              name="user"
              value={filters.user}
              onChange={handleChange}
              placeholder="User name or email"
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-old-gold dark:border-white/10 dark:bg-dark-teal"
            />
          </label>

          <label className="text-sm">
            <span className="mb-2 block text-black/70 dark:text-white/70">From</span>
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleChange}
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-old-gold dark:border-white/10 dark:bg-dark-teal"
            />
          </label>

          <label className="text-sm">
            <span className="mb-2 block text-black/70 dark:text-white/70">To</span>
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleChange}
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-old-gold dark:border-white/10 dark:bg-dark-teal"
            />
          </label>

          <div className="flex items-end gap-2 md:col-span-2 xl:col-span-2">
            <button type="submit" className="rounded-full bg-old-gold px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90">
              Apply filters
            </button>
            <button type="button" onClick={handleReset} className="rounded-full border border-black/10 px-4 py-2 text-sm transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10">
              Reset
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-400/30 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">
            {error}
          </div>
        )}

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/10 text-black/70 dark:border-white/10 dark:text-white/70">
                <th className="px-3 py-3">User</th>
                <th className="px-3 py-3">Action</th>
                <th className="px-3 py-3">Module</th>
                <th className="px-3 py-3">Description</th>
                <th className="px-3 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-3 py-8 text-center text-black/60 dark:text-white/60">Loading logs…</td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-3 py-8 text-center text-black/60 dark:text-white/60">No audit logs match your filters.</td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="border-b border-black/10 align-top dark:border-white/10">
                    <td className="px-3 py-3">
                      <div className="font-medium">{log.user?.name || 'System'}</div>
                      <div className="text-xs text-black/60 dark:text-white/60">{log.user?.email || '—'}</div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-old-gold/20 px-2.5 py-1 text-xs font-semibold text-old-gold">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-3 py-3">{log.module}</td>
                    <td className="max-w-xl px-3 py-3 text-black/80 dark:text-white/80">{log.description}</td>
                    <td className="px-3 py-3 text-xs text-black/60 dark:text-white/60">{formatDateTime(log.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-black/70 dark:text-white/70">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => loadLogs(page - 1, filters)}
              disabled={page <= 1}
              className="rounded-full border border-black/10 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => loadLogs(page + 1, filters)}
              disabled={page >= totalPages}
              className="rounded-full border border-black/10 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
