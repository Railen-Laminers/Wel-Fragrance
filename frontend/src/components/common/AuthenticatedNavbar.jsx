import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import webLogo from '/webLogo.webp';
import webLogoText from '/webLogoText.webp';

// ---- Icons ----

const IconDashboard = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const IconOrders = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const IconProducts = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const IconTestimonials = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const IconMails = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const IconProfile = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const IconBell = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const IconExpand = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
);

const IconCollapse = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
);

// ---- Sidebar Item ----

const SidebarItem = ({ to, icon, label, collapsed, onClick }) => {
    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <NavLink
            to={to}
            onClick={handleClick}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                    ? 'bg-old-gold/20 text-old-gold dark:bg-old-gold/30'
                    : 'text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10'
                } ${collapsed ? 'justify-center' : 'justify-start'}`
            }
            title={collapsed ? label : ''}
        >
            <span className="flex-shrink-0">{icon}</span>
            {!collapsed && <span className="text-sm font-medium">{label}</span>}
        </NavLink>
    );
};

// ---- Main Component ----

export default function AuthenticatedNavbar({ children }) {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setProfileDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getSidebarItems = () => {
        if (isAdmin) {
            return [
                { to: '/admin/dashboard', icon: <IconDashboard />, label: 'Dashboard' },
                { to: '/admin/products', icon: <IconProducts />, label: 'Products' },
                { to: '/admin/testimonials', icon: <IconTestimonials />, label: 'Testimonials' },
                { to: '/admin/mails', icon: <IconMails />, label: 'Mails' },
            ];
        } else {
            return [
                { to: '/customer/dashboard', icon: <IconDashboard />, label: 'Dashboard' },
                { to: '/customer/orders', icon: <IconOrders />, label: 'My Orders' },
                { to: '/customer/profile', icon: <IconProfile />, label: 'Profile' },
            ];
        }
    };

    const items = getSidebarItems();

    const toggleExpand = () => setSidebarExpanded(prev => !prev);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation Bar - fixed */}
            <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-dark-teal border-b border-black/10 dark:border-white/10 flex items-center px-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center h-10">
                        <img src={webLogo} alt="Wel Fragrance" className="h-full w-auto object-contain" />
                        <img
                            src={webLogoText}
                            alt="Wel Fragrance Text"
                            className="h-full w-auto object-contain brightness-0 dark:invert -ml-3"
                        />
                    </Link>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative" aria-label="Notifications">
                        <IconBell />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                            className="flex items-center gap-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-old-gold flex items-center justify-center text-black font-semibold text-sm">
                                {user?.firstName?.charAt(0) || 'U'}
                            </div>
                            <span className="hidden sm:inline text-sm font-medium text-black dark:text-white">
                                {user?.firstName} {user?.lastName}
                            </span>
                        </button>
                        {profileDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-teal rounded-lg shadow-lg border border-black/10 dark:border-white/10 py-1 z-50">
                                <Link to="/profile" className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setProfileDropdownOpen(false)}>Profile</Link>
                                <hr className="my-1 border-black/10 dark:border-white/10" />
                                <button onClick={() => { logout(); navigate('/login'); setProfileDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Sidebar + Main Content */}
            <div className="flex flex-1 pt-16">
                {/* Sidebar - fixed */}
                <aside
                    className={`
                        fixed top-16 left-0 bottom-0 z-40
                        bg-white dark:bg-dark-teal
                        border-r border-black/10 dark:border-white/10
                        transition-all duration-300 ease-in-out
                        ${sidebarExpanded ? 'w-56' : 'w-16'}
                        flex flex-col
                    `}
                >
                    {/* Collapse button */}
                    <div className="flex items-center justify-end p-1">
                        <button
                            onClick={toggleExpand}
                            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-black/70 dark:text-white/70"
                            title={sidebarExpanded ? 'Collapse' : 'Expand'}
                        >
                            {sidebarExpanded ? <IconCollapse /> : <IconExpand />}
                        </button>
                    </div>

                    {/* Navigation items */}
                    <div className="flex-1 overflow-y-auto py-2">
                        <nav className="flex flex-col gap-1 px-2">
                            {items.map((item) => (
                                <SidebarItem
                                    key={item.to}
                                    to={item.to}
                                    icon={item.icon}
                                    label={item.label}
                                    collapsed={!sidebarExpanded}
                                    onClick={item.onClick}
                                />
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main content */}
                <main className={`flex-1 transition-all duration-300 ${sidebarExpanded ? 'ml-56' : 'ml-16'}`}>
                    <div className="p-4 sm:p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}