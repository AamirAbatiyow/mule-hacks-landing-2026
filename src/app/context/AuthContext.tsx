import { createContext, useContext, useState, ReactNode, useMemo, useRef, useEffect } from 'react';

export interface User {
  email: string;
  name?: string;
  university?: string;
  major?: string;
  year?: string;
  hasCompletedOnboarding: boolean;
  isAdmin?: boolean;
}

const ADMIN_EMAIL = 'admin@ucmo.edu';
const ADMIN_PASSWORD = 'admin123';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ isAdmin: boolean }>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (profile: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Singleton to prevent multiple provider instances
let providerCount = 0;

export function AuthProvider({ children }: { children: ReactNode }) {
  const instanceId = useRef(++providerCount);

  useEffect(() => {
    if (providerCount > 1) {
      console.warn(`Multiple AuthProvider instances detected (${providerCount}). This may cause issues.`);
    }
    return () => {
      providerCount--;
    };
  }, []);

  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage for existing user
    if (typeof window === 'undefined') return null;
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = async (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        email: ADMIN_EMAIL,
        name: 'Admin',
        hasCompletedOnboarding: true,
        isAdmin: true,
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return { isAdmin: true };
    }

    const savedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    const userData = savedUsers[email];

    if (!userData || userData.password !== password) {
      throw new Error('Invalid credentials');
    }

    const nextUser: User = {
      email: userData.email,
      name: userData.name,
      university: userData.university,
      major: userData.major,
      year: userData.year,
      hasCompletedOnboarding: userData.hasCompletedOnboarding || false,
      isAdmin: false,
    };

    setUser(nextUser);
    localStorage.setItem('user', JSON.stringify(nextUser));
    return { isAdmin: false };
  };

  const register = async (email: string, password: string) => {
    // Mock registration - replace with Supabase later
    const savedUsers = JSON.parse(localStorage.getItem('users') || '{}');

    if (savedUsers[email]) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      email,
      hasCompletedOnboarding: false,
      isAdmin: false,
    };

    savedUsers[email] = { ...newUser, password };
    localStorage.setItem('users', JSON.stringify(savedUsers));

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserProfile = (profile: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...profile };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Also update in users storage
    const savedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    if (savedUsers[user.email]) {
      savedUsers[user.email] = { ...savedUsers[user.email], ...profile };
      localStorage.setItem('users', JSON.stringify(savedUsers));
    }
  };

  const value = useMemo(
    () => ({ user, login, register, logout, updateUserProfile }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
