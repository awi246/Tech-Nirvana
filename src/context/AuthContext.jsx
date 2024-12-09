import React, { createContext, useState, useEffect } from 'react';
import usersData from '../../public/data/users.json';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(usersData);

    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const signup = (email, password) => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }
    const newUser = { id: Date.now(), email, password, profileImage: '' };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const existingUser = users.find(u => u.email === email && u.password === password);
    if (existingUser) {
      localStorage.setItem('currentUser', JSON.stringify(existingUser));
      setUser(existingUser);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateProfile = (updatedUser) => {
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      const updatedUsers = [...users];
      updatedUsers[index] = updatedUser;
      setUsers(updatedUsers);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
