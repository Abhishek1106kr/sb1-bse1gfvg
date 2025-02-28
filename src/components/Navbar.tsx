import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">SafeGuardian</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-purple-600">Home</Link>
            {currentUser ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-purple-600">Dashboard</Link>
                <Link to="/emergency-contacts" className="px-3 py-2 rounded-md hover:bg-purple-600">Emergency Contacts</Link>
                <Link to="/safe-routes" className="px-3 py-2 rounded-md hover:bg-purple-600">Safe Routes</Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md bg-purple-800 hover:bg-purple-900"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 rounded-md hover:bg-purple-600">Login</Link>
                <Link to="/register" className="px-3 py-2 rounded-md bg-purple-800 hover:bg-purple-900">Register</Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-purple-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md hover:bg-purple-600">Home</Link>
            {currentUser ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 rounded-md hover:bg-purple-600">Dashboard</Link>
                <Link to="/emergency-contacts" className="block px-3 py-2 rounded-md hover:bg-purple-600">Emergency Contacts</Link>
                <Link to="/safe-routes" className="block px-3 py-2 rounded-md hover:bg-purple-600">Safe Routes</Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-3 py-2 rounded-md bg-purple-800 hover:bg-purple-900"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md hover:bg-purple-600">Login</Link>
                <Link to="/register" className="block px-3 py-2 rounded-md bg-purple-800 hover:bg-purple-900">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;