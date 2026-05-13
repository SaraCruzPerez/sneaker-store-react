import React, { createContext, useContext, useState, useCallback, useRef, useMemo, useEffect, type ReactNode } from "react";
import Toast from "../components/common/Toast/Toast.js"; 
import type { NotificationData, NotificationAction } from "../types/models.js";

interface NotificationContextType {
  showNotification: (message: string, action?: NotificationAction) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = useState<NotificationData | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideNotification = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setNotification(null);
  }, []);

  const showNotification = useCallback((message: string, action: NotificationAction = "add") => { 
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setNotification({ message, action });
    
    timerRef.current = setTimeout(() => {
      hideNotification();
    }, 1000);
  }, [hideNotification]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const value = useMemo(() => ({ showNotification }), [showNotification]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notification && (
        <Toast 
          message={notification.message} 
          action={notification.action} 
          onClose={hideNotification} 
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};