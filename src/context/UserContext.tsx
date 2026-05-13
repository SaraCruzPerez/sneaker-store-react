import React, { createContext, useState, useContext, useEffect, useMemo, useCallback, type ReactNode } from "react";
import type { UserData } from "../types/models.js";

type LoginData = Pick<UserData, 'name' | 'email'> & Partial<UserData>;

interface UserContextType {
  user: UserData | null;
  login: (userData: LoginData) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser) as UserData;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = useCallback((userData: LoginData): void => {
    const completeUser = {
      id: Date.now().toString(), 
      ...userData
    } as UserData;
    
    setUser(completeUser);
  }, []);

  const logout = useCallback((): void => setUser(null), []);

  const isLoggedIn = user !== null;

  const value = useMemo(() => ({
    user,
    login,
    logout,
    isLoggedIn
  }), [user, login, logout, isLoggedIn]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};