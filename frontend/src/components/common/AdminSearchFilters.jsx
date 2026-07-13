import React from 'react';

export default function AdminSearchFilters({
  searchQuery,
  onSearchChange,
  filters = {},
  onFilterChange,
  filterDefinitions = [],
  onClear,
}) {
  return (
    <div className="mt-8 rounded-3xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_auto]">
        <div>
          <label htmlFor="admin-search" className="mb-2 block text-sm font-semibold text-black/70 dark:text-white/70">
            Search
          </label>
          <input
            id="admin-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name, email, message, or tag..."
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition duration-200 focus:border-old-gold focus:ring-2 focus:ring-old-gold/20 dark:border-white/10 dark:bg-dark-teal dark:text-white"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filterDefinitions.map(({ name, label, options }) => (
            <label key={name} className="block text-sm">
              <span className="mb-2 block text-sm font-semibold text-black/70 dark:text-white/70">{label}</span>
              <select
                value={filters[name] ?? ''}
                onChange={(event) => onFilterChange(name, event.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition duration-200 focus:border-old-gold focus:ring-2 focus:ring-old-gold/20 dark:border-white/10 dark:bg-dark-teal dark:text-white"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ))}

          <div className="flex items-end">
            <button
              type="button"
              onClick={onClear}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black transition duration-200 hover:border-old-gold hover:bg-old-gold/10 dark:border-white/10 dark:bg-dark-teal dark:text-white"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-black/60 dark:text-white/60">
        Use search and filters together for fast, precise results.
      </p>
    </div>
  );
}
