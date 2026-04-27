import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import Toast from "../components/common/Toast/Toast.js"; 
import type { NotificationData, NotificationAction } from "../types/models.js";

interface NotificationContextType {
  showNotification: (message: string, action?: NotificationAction) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = useState<NotificationData | null>(null);

  const showNotification = useCallback((message: string, action: NotificationAction = 'add') => { 
    setNotification({ message, action });
    
    const timer = setTimeout(() => {
      setNotification(null);
    }, 2500);

  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Toast 
          message={notification.message} 
          action={notification.action} 
          onClose={() => setNotification(null)} 
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