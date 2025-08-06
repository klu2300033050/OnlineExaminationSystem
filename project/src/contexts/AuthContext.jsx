import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
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
    role: 'teacher',
    password: 'password123',
  },
  student: {
    id: 's1',
    name: 'Jane Doe',
    email: 'student@example.com',
    role: 'student',
    password: 'password123',
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('examproUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password, role) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
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
}

export const useAuth = () => useContext(AuthContext);