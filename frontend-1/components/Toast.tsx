"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type ToastType = "success" | "info" | "error";
interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  leaving?: boolean;
}

const icons: Record<ToastType, string> = { success: "✅", info: "ℹ️", error: "❌" };

const ToastContext = createContext<(message: string, type?: ToastType) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = idRef.current++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 400);
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`} style={t.leaving ? { animation: "slideOut 0.4s ease forwards" } : undefined}>
            <span>{icons[t.type]}</span> {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
