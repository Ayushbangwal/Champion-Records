import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Trophy, Users, Home, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-white">SportsStats</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <Home className="inline h-4 w-4 mr-1" />
              Home
            </Link>
            <Link
              to="/sportspersons"
              className={`nav-link ${isActive('/sportspersons') ? 'active' : ''}`}
            >
              <Users className="inline h-4 w-4 mr-1" />
              Sportspersons
            </Link>
            <Link
              to="/sportspersons/add"
              className={`nav-link ${isActive('/sportspersons/add') ? 'active' : ''}`}
            >
              <PlusCircle className="inline h-4 w-4 mr-1" />
              Add Sportsperson
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search sportspersons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input w-64"
            />
          </form>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="inline h-4 w-4 mr-1" />
                Home
              </Link>
              <Link
                to="/sportspersons"
                className={`nav-link ${isActive('/sportspersons') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="inline h-4 w-4 mr-1" />
                Sportspersons
              </Link>
              <Link
                to="/sportspersons/add"
                className={`nav-link ${isActive('/sportspersons/add') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <PlusCircle className="inline h-4 w-4 mr-1" />
                Add Sportsperson
              </Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative pt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sportspersons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
