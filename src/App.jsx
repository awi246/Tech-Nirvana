import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Blogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetail from './pages/BlogDetail';
import EditBlog from './pages/EditBlog';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto px-4">
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/blogs" element={<Blogs />} />
            <Route
              path="/create-blog"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route
              path="/edit-blog/:id"
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
