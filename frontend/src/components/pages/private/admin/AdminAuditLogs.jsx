import React, { useEffect, useState } from 'react';
import api from '../../../../api/axios';

// Icons
const IconFilter = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
);

const ACTION_OPTIONS = ['Login', 'Logout', 'Create', 'Update', 'Delete', 'View', 'Approve', 'Reject'];
const MODULE_OPTIONS = ['Auth', 'Profile', 'Products', 'Testimonials', 'Inquiries', 'Users'];

const formatDateTime = (value) => {
    if (!value) return '—';
    return new Date(value).toLocaleString();
};

export default function AdminAuditLogs() {
    const [logs, setLogs] = useState([]);
    const [filters, setFilters] = useState({
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
    const [isLoaded, setIsLoaded] = useState(false);

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
        setTimeout(() => setIsLoaded(true), 100);
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
        const cleared = { action: '', module: '', user: '', dateFrom: '', dateTo: '' };
        setFilters(cleared);
        loadLogs(1, cleared);
    };

    return (
        <section className="min-h-screen px-4 py-8 text-black dark:text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl rounded-lg border border-black/10 bg-white/80 p-6 shadow-xl backdrop-blur transition-opacity duration-700 dark:border-white/10 dark:bg-dark-teal/80 sm:p-8">
                {/* Header */}
                <div>
                    <h1
                        className={`mt-2 text-3xl font-semibold sm:text-4xl font-cormorant transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                    >
                        Audit <span className="text-old-gold">Logs</span>
                    </h1>
                    <p
                        className={`mt-2 text-sm text-black/70 dark:text-white/70 transition-all duration-700 delay-100 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                    >
                        Review administrative and user activity across the platform.
                    </p>
                </div>

                {/* Filters */}
                <form
                    onSubmit={handleSubmit}
                    className={`mt-8 grid gap-4 rounded-lg border border-black/10 bg-black/5 p-4 transition-all duration-700 delay-150 ease-out dark:border-white/10 dark:bg-white/5 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}
                >
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <label className="text-sm">
                            <span className="mb-1.5 block text-black/70 dark:text-white/70">Action</span>
                            <select
                                name="action"
                                value={filters.action}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-old-gold dark:border-white/10 dark:bg-dark-teal"
                            >
                                <option value="">All actions</option>
                                {ACTION_OPTIONS.map((action) => (
                                    <option key={action} value={action}>{action}</option>
                                ))}
                            </select>
                        </label>

                        <label className="text-sm">
                            <span className="mb-1.5 block text-black/70 dark:text-white/70">Module</span>
                            <select
                                name="module"
                                value={filters.module}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-old-gold dark:border-white/10 dark:bg-dark-teal"
                            >
                                <option value="">All modules</option>
                                {MODULE_OPTIONS.map((module) => (
                                    <option key={module} value={module}>{module}</option>
                                ))}
                            </select>
                        </label>

                        <label className="text-sm">
                            <span className="mb-1.5 block text-black/70 dark:text-white/70">User</span>
                            <input
                                name="user"
                                value={filters.user}
                                onChange={handleChange}
                                placeholder="User name or email"
                                disabled={loading}
                                className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-old-gold disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-dark-teal"
                            />
                        </label>

                        <div className="grid grid-cols-2 gap-2">
                            <label className="text-sm">
                                <span className="mb-1.5 block text-black/70 dark:text-white/70">From</span>
                                <input
                                    type="date"
                                    name="dateFrom"
                                    value={filters.dateFrom}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-old-gold dark:border-white/10 dark:bg-dark-teal"
                                />
                            </label>
                            <label className="text-sm">
                                <span className="mb-1.5 block text-black/70 dark:text-white/70">To</span>
                                <input
                                    type="date"
                                    name="dateTo"
                                    value={filters.dateTo}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-old-gold dark:border-white/10 dark:bg-dark-teal"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Primary button with slide-up */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative overflow-hidden px-4 py-2 bg-old-gold text-warm-white dark:text-dark-teal font-medium text-sm transition-all hover:shadow-[0_0_30px_rgba(199,159,72,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {loading ? (
                                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
                                        <path d="M21 12a9 9 0 00-9-9" strokeLinecap="round" />
                                    </svg>
                                ) : <IconFilter />}
                                {loading ? 'Applying…' : 'Apply filters'}
                            </span>
                            <div className="absolute inset-0 bg-dark-teal dark:bg-warm-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        </button>

                        {/* Secondary button with slide-up */}
                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={loading}
                            className="group relative overflow-hidden px-4 py-2 border border-black/10 dark:border-white/10 text-black dark:text-white font-medium text-sm transition-all disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <span className="relative z-10">{loading ? 'Resetting…' : 'Reset'}</span>
                            <div className="absolute inset-0 bg-black/5 dark:bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="mt-6 rounded-lg border border-rose-400/30 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">
                        {error}
                    </div>
                )}

                {/* Table */}
                <div
                    className={`mt-6 overflow-x-auto transition-all duration-700 delay-300 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}
                >
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-black/10 text-black/70 dark:border-white/10 dark:text-white/70">
                                <th className="px-3 py-3 font-medium">User</th>
                                <th className="px-3 py-3 font-medium">Action</th>
                                <th className="px-3 py-3 font-medium">Module</th>
                                <th className="px-3 py-3 font-medium">Description</th>
                                <th className="px-3 py-3 font-medium">Date</th>
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

                {/* Pagination */}
                <div
                    className={`mt-6 flex flex-wrap items-center justify-between gap-3 transition-all duration-700 delay-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    <p className="text-sm text-black/70 dark:text-white/70">Page {page} of {totalPages}</p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => loadLogs(page - 1, filters)}
                            disabled={page <= 1 || loading}
                            className="group relative overflow-hidden rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className="relative z-10">{loading ? 'Loading…' : 'Previous'}</span>
                            <div className="absolute inset-0 bg-black/5 dark:bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        </button>
                        <button
                            type="button"
                            onClick={() => loadLogs(page + 1, filters)}
                            disabled={page >= totalPages || loading}
                            className="group relative overflow-hidden rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className="relative z-10">{loading ? 'Loading…' : 'Next'}</span>
                            <div className="absolute inset-0 bg-black/5 dark:bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}