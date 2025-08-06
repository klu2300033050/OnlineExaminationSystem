import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
}

// Define the context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: 'student' | 'teacher') => Promise<boolean>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
});

// Mock users for demo purposes
const MOCK_USERS = {
  teacher: {
    id: 't1',
    name: 'John Smith',
    email: 'teacher@example.com',
    role: 'teacher' as const,
    password: 'password123',
  },
  student: {
    id: 's1',
    name: 'Jane Doe',
    email: 'student@example.com',
    role: 'student' as const,
    password: 'password123',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('examproUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string, role: 'student' | 'teacher'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo purposes, check against mock users
    const mockUser = MOCK_USERS[role];
    if (mockUser && mockUser.email === email && mockUser.password === password) {
      const { password, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('examproUser', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    alert('Invalid credentials. Please try again.');
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('examproUser');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);