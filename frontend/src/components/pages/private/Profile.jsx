import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const toListValue = (value) => (Array.isArray(value) ? value.join('\n') : value || '');

export default function Profile() {
  const { user, logout, updateProfile, changePassword, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({
    firstName: '',
    middleInitial: '',
    lastName: '',
    email: '',
    businessName: '',
    emailAddresses: '',
    contactNumbers: '',
    instagramAccounts: '',
    facebookPages: '',
    businessLocations: '',
  });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || '',
        middleInitial: user.middleInitial || '',
        lastName: user.lastName || '',
        email: user.email || '',
        businessName: user.businessName || '',
        emailAddresses: toListValue(user.emailAddresses),
        contactNumbers: toListValue(user.contactNumbers),
        instagramAccounts: toListValue(user.instagramAccounts),
        facebookPages: toListValue(user.facebookPages),
        businessLocations: toListValue(user.businessLocations),
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setSaving(true);

    try {
      const payload = {
        firstName: profileForm.firstName,
        middleInitial: profileForm.middleInitial,
        lastName: profileForm.lastName,
        email: profileForm.email,
        businessName: profileForm.businessName,
        emailAddresses: profileForm.emailAddresses,
        contactNumbers: profileForm.contactNumbers,
        instagramAccounts: profileForm.instagramAccounts,
        facebookPages: profileForm.facebookPages,
        businessLocations: profileForm.businessLocations,
      };

      await updateProfile(payload);
      await refreshUser();
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setPasswordSaving(true);

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setMessage('Password updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update password.');
    } finally {
      setPasswordSaving(false);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <section className="min-h-screen px-6 py-24 text-black dark:text-white">
      <div className="mx-auto max-w-6xl rounded-3xl border border-black/10 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-dark-teal/80">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-old-gold">Profile</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Your account</h1>
            <p className="mt-3 max-w-2xl text-base text-black/70 dark:text-white/70">Manage your account details and security settings.</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-old-gold/50 px-5 py-3 text-sm font-medium transition hover:bg-old-gold hover:text-black"
          >
            Logout
          </button>
        </div>

        {(message || error) && (
          <div className={`mt-8 rounded-2xl border px-4 py-3 text-sm ${error ? 'border-rose-400/30 bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300' : 'border-emerald-400/30 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300'}`}>
            {error || message}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleProfileSubmit} className="rounded-2xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">Keep your name, email, and business contact details up to date.</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="text-sm">
                <span className="mb-2 block text-black/70 dark:text-white/70">First Name</span>
                <input value={profileForm.firstName} onChange={(event) => setProfileForm((prev) => ({ ...prev, firstName: event.target.value }))} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-dark-teal" required />
              </label>
              <label className="text-sm">
                <span className="mb-2 block text-black/70 dark:text-white/70">Middle Initial</span>
                <input value={profileForm.middleInitial} onChange={(event) => setProfileForm((prev) => ({ ...prev, middleInitial: event.target.value }))} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-dark-teal" maxLength={1} />
              </label>
              <label className="text-sm">
                <span className="mb-2 block text-black/70 dark:text-white/70">Last Name</span>
                <input value={profileForm.lastName} onChange={(event) => setProfileForm((prev) => ({ ...prev, lastName: event.target.value }))} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-dark-teal" required />
              </label>
              <label className="text-sm">
                <span className="mb-2 block text-black/70 dark:text-white/70">Email Address</span>
                <input type="email" value={profileForm.email} onChange={(event) => setProfileForm((prev) => ({ ...prev, email: event.target.value }))} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-dark-teal" required />
              </label>
            </div>

            {isAdmin && (
              <div className="mt-6 space-y-4">
                <label className="text-sm block">
                  <span className="mb-2 block text-black/70 dark:text-white/70">Business Name</span>
                  <input value={profileForm.businessName} onChange={(event) => setProfileForm((prev) => ({ ...prev, businessName: event.target.value }))} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-dark-teal" />
                </label>
                <label className="text-sm block">
                  <span className="mb-2 block text-black/70 dark:text-white/70">Email Addresses (one per line)</span>
                  <textarea rows={3} value={profileForm.emailAddresses} onChange={(event) => setProfileForm((prev) => ({ ...prev, emailAddresses: event.target.value }))} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-dark-teal" />
                </label>
                <label className="text-sm block">
                  <span className="mb-2 block text-black/70 dark:text-white/70">Contact Numbers (one per line)</span>
                  <textarea rows={3} value={profileForm.contactNumbers} onChange={(event) => setProfileForm((prev) => ({ ...prev, contactNumbers: event.target.value }))} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-dark-teal" />
                </label>
                <label className="text-sm block">
                  <span className="mb-2 block text-black/70 dark:text-white/70">Instagram Accounts (one per line)</span>
                  <textarea rows={3} value={profileForm.instagramAccounts} onChange={(event) => setProfileForm((prev) => ({ ...prev, instagramAccounts: event.target.value }))} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-dark-teal" />
                </label>
                <label className="text-sm block">
                  <span className="mb-2 block text-black/70 dark:text-white/70">Facebook Pages (one per line)</span>
                  <textarea rows={3} value={profileForm.facebookPages} onChange={(event) => setProfileForm((prev) => ({ ...prev, facebookPages: event.target.value }))} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-dark-teal" />
                </label>
                <label className="text-sm block">
                  <span className="mb-2 block text-black/70 dark:text-white/70">Business Locations (one per line)</span>
                  <textarea rows={3} value={profileForm.businessLocations} onChange={(event) => setProfileForm((prev) => ({ ...prev, businessLocations: event.target.value }))} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-dark-teal" />
                </label>
              </div>
            )}

            <button type="submit" disabled={saving} className="mt-6 rounded-full bg-old-gold px-5 py-3 text-sm font-medium text-black transition hover:bg-old-gold/90 disabled:opacity-70">
              {saving ? 'Saving…' : 'Save Profile'}
            </button>
          </form>

          <form onSubmit={handlePasswordSubmit} className="rounded-2xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className="text-xl font-semibold">Change Password</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">Your password is stored securely and never exposed.</p>

            <div className="mt-6 space-y-4">
              <label className="text-sm block">
                <span className="mb-2 block text-black/70 dark:text-white/70">Current Password</span>
                <input type="password" value={passwordForm.currentPassword} onChange={(event) => setPasswordForm((prev) => ({ ...prev, currentPassword: event.target.value }))} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-dark-teal" required />
              </label>
              <label className="text-sm block">
                <span className="mb-2 block text-black/70 dark:text-white/70">New Password</span>
                <input type="password" value={passwordForm.newPassword} onChange={(event) => setPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-dark-teal" required minLength={6} />
              </label>
              <label className="text-sm block">
                <span className="mb-2 block text-black/70 dark:text-white/70">Confirm New Password</span>
                <input type="password" value={passwordForm.confirmPassword} onChange={(event) => setPasswordForm((prev) => ({ ...prev, confirmPassword: event.target.value }))} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-dark-teal" required minLength={6} />
              </label>
            </div>

            <button type="submit" disabled={passwordSaving} className="mt-6 rounded-full border border-old-gold/50 px-5 py-3 text-sm font-medium transition hover:bg-old-gold hover:text-black disabled:opacity-70">
              {passwordSaving ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
