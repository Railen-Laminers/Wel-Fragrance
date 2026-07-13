import { useEffect, useState } from 'react';
import { subscribeToToasts } from '../../utils/toast';

const toastStyles = {
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
  error: 'border-rose-500/30 bg-rose-500/10 text-rose-200',
  info: 'border-sky-500/30 bg-sky-500/10 text-sky-200',
};

export default function ToastProvider() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToToasts(({ message, type = 'info', duration = 4000 }) => {
      const id = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
      const toast = { id, message, type };

      setToasts((current) => [...current, toast]);

      window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== id));
      }, duration);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[120] flex justify-center px-4">
      <div className="flex w-full max-w-lg flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-xl border px-4 py-3 shadow-lg backdrop-blur ${toastStyles[toast.type] || toastStyles.info}`}
          >
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
