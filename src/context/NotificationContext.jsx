import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/common/Toast/Toast"; 

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, action = 'add') => { 
    setNotification({ message, action });
    setTimeout(() => setNotification(null), 2500); 
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

export const useNotification = () => useContext(NotificationContext);