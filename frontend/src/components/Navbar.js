import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X, Trophy, Users, Home, Image } from 'lucide-react';
import { sportspersonAPI } from "../services/api";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");
const [results, setResults] = useState([]);
const [showDropdown, setShowDropdown] = useState(false);

useEffect(() => {
  const timeout = setTimeout(async () => {
      if (query.trim().length < 1) {
  setResults([]);

  return;
}
 try {
  const res = await sportspersonAPI.search(query);
  //console.log("API RESPONSE:", res);
  //console.log("DATA:", res.data);
  // console.log("PLAYERS:", res.data.data);
const players = res?.data?.data || [];

const filtered = players.filter((player) => {
  const name = `${player.first_name || ""} ${player.last_name || ""}`.toLowerCase();
  const sport = player.sport_category?.name?.toLowerCase() || "";

  return (
    name.includes(query.toLowerCase()) ||
    sport.includes(query.toLowerCase())
  );
});

setResults(filtered);
 } catch(err){
  console.error("Search API eror:", err);
 }
}, 300);

  return () => clearTimeout(timeout);
}, [query]);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".search-container")) {
      setShowDropdown(false);
    }
  };

  window.addEventListener("click", handleClickOutside);

  return () => {
    window.removeEventListener("click", handleClickOutside);
  };
}, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setShowDropdown(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (

      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="w-full px-6">
      <div className="flex justify-between items-center h-16 max-w-7xl mx-auto">
        
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-orange-500" />

          <h1 className="text-xl font-bold text-white">
          <span className="text-red-500">SPORTS</span> STATS
          </h1>
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
    to="/compare"
    className={`nav-link ${isActive('/compare') ? 'active' : ''}`}
  >
    <Trophy className="inline h-4 w-4 mr-1" />
    Compare Players
  </Link>

  <Link
    to="/gallery"
    className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}
  >
    <Image className="inline h-4 w-4 mr-1" />
    Gallery
  </Link>

  <Link
    to="/random-player"
    className={`nav-link ${isActive('/random-player') ? 'active' : ''}`}
  >
    <Trophy className="inline h-4 w-4 mr-1" />
    Random Player
  </Link>

</div>
 
  <div className="relative ml-4 hidden md:flex flex-col search-container">
  <form onSubmit={handleSearch} className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
  <input
    type="text"
    placeholder="Search sportspersons..."
    value={query}
    onClick={(e) => e.stopPropagation()}
onChange={(e) => {
  setQuery(e.target.value);
  setShowDropdown(true);
}}
  
    className="search-input w-64"
  />
</form>
    {showDropdown && query.trim().length > 0 && (
  <div
        className="absolute top-full left-0 mt-2 w-72 bg-slate-800 text-white 
border border-gray-600 rounded-lg shadow-2xl z-50 p-2 
max-h-60 overflow-y-auto">

    {results.length > 0 ? (
      results.slice(0, 5).map((player) => (
        <div
          key={player.id}
          className="p-2 hover:bg-slate-700 cursor-pointer flex flex-col transition rounded"
          onClick={() => {
            navigate(`/sportspersons/${player.id}`);
            setShowDropdown(false);
            setQuery("");
          }}
        >
         <span className="text-white font-semibold">
  {`${player.first_name || ""} ${player.last_name || ""}`.trim()}
</span>
        {player.sport_category?.name && (
  <span className="text-xs text-gray-400">
    {player.sport_category.name}
  </span>
)}

        </div>
      ))
    ) : (
      query && (
        <div className="p-2 text-gray-400">
          No results found
        </div>
      )
    )}

  </div>
)}
</div>

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
        to="/compare"
        className={`nav-link ${isActive('/compare') ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <Trophy className="inline h-4 w-4 mr-1" />
        Compare Players
      </Link>

      <Link
        to="/gallery"
        className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <Image className="inline h-4 w-4 mr-1" />
        Gallery
      </Link>

      <Link
        to="/random-player"
        className={`nav-link ${isActive('/random-player') ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <Trophy className="inline h-4 w-4 mr-1" />
        Random Player
      </Link>

      {/* Mobile Search */}
      <form onSubmit={handleSearch} className="relative pt-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search sportspersons..."
          value={query}
          onClick={(e) => e.stopPropagation()}
onChange={(e) => {
  setQuery(e.target.value);
  setShowDropdown(true);
}}
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
