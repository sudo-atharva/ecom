'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 