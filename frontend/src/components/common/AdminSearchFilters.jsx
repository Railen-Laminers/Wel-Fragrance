import React from 'react';

export default function AdminSearchFilters({
  searchQuery = '',
  onSearchChange = () => { },
  filters = {},
  onFilterChange = () => { },
  filterDefinitions = [],
  onClear,
}) {
  return (
    <div className="border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-dark-teal/50 sm:p-5 rounded-sm">
      {/* Search bar – always on top */}
      <div className="mb-4">
        <label htmlFor="admin-search" className="mb-1 block text-sm font-medium text-black/70 dark:text-white/70">
          Search
        </label>
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40 dark:text-white/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="6" />
            <path d="M20 20L16.5 16.5" strokeLinecap="round" />
          </svg>
          <input
            id="admin-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search…"
            className="w-full border border-black/10 bg-white/95 py-2 pl-9 pr-3 text-sm text-black outline-none transition duration-200 focus:border-old-gold focus:ring-1 focus:ring-old-gold/20 dark:border-white/10 dark:bg-dark-teal/90 dark:text-white rounded-sm"
          />
        </div>
      </div>

      {/* Filters row – placed below search */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filterDefinitions.map(({ name, label, type = 'select', options, placeholder }) => (
          <label key={name} className="block text-sm">
            <span className="mb-1 block text-sm font-medium text-black/70 dark:text-white/70">{label}</span>
            {type === 'select' ? (
              <select
                value={filters[name] ?? ''}
                onChange={(e) => onFilterChange(name, e.target.value)}
                className="w-full border border-black/10 bg-white/95 px-3 py-2 text-sm text-black outline-none transition duration-200 focus:border-old-gold focus:ring-1 focus:ring-old-gold/20 dark:border-white/10 dark:bg-dark-teal/90 dark:text-white rounded-sm"
              >
                {options?.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-white text-black dark:bg-dark-teal/90 dark:text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : type === 'date' ? (
              <input
                type="date"
                value={filters[name] ?? ''}
                onChange={(e) => onFilterChange(name, e.target.value)}
                className="w-full border border-black/10 bg-white/95 px-3 py-2 text-sm text-black outline-none transition duration-200 focus:border-old-gold focus:ring-1 focus:ring-old-gold/20 dark:border-white/10 dark:bg-dark-teal/90 dark:text-white rounded-sm"
              />
            ) : (
              <input
                type="text"
                value={filters[name] ?? ''}
                onChange={(e) => onFilterChange(name, e.target.value)}
                placeholder={placeholder || ''}
                className="w-full border border-black/10 bg-white/95 px-3 py-2 text-sm text-black outline-none transition duration-200 focus:border-old-gold focus:ring-1 focus:ring-old-gold/20 dark:border-white/10 dark:bg-dark-teal/90 dark:text-white rounded-sm"
              />
            )}
          </label>
        ))}

        {/* Clear filters button */}
        {onClear && (
          <div className="flex items-end">
            <button
              type="button"
              onClick={onClear}
              className="w-full border border-black/10 bg-black/[0.025] px-3 py-2 text-sm font-medium text-black transition hover:border-old-gold/40 hover:bg-old-gold/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white rounded-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}