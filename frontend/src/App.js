import PlayerGallery from "./pages/PlayerGallery";
import ComparePlayers from "./pages/ComparePlayers";
import SplashScreen from "./components/SplashScreen";
import { useState, useEffect } from "react";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SportspersonList from './pages/SportspersonList';
import SportspersonDetail from './pages/SportspersonDetail';
import AddSportsperson from './pages/AddSportsperson';
import EditSportsperson from './pages/EditSportsperson';
import SearchResults from './pages/SearchResults';


const queryClient = new QueryClient();

function App() {
 
  const [loading, setLoading] = useState(true);
useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 3000);
}, []);
const [darkMode, setDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme === "dark";
});

const toggleDarkMode = () => {
  setDarkMode(!darkMode);
};
useEffect(() => {
  localStorage.setItem("theme", darkMode ? "dark" : "light");
}, [darkMode]);

if (loading) {
  return <SplashScreen />;
}
  return (
    <QueryClientProvider client={queryClient}>
  <Router>

    <div className={darkMode ? "dark" : ""}>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">

        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        
   
          

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sportspersons" element={<SportspersonList />} />
            <Route path="/sportspersons/:id" element={<SportspersonDetail />} />
            <Route path="/sportspersons/add" element={<AddSportsperson />} />
            <Route path="/sportspersons/:id/edit" element={<EditSportsperson />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/compare" element={<ComparePlayers />} />
            <Route path="/gallery" element={<PlayerGallery />} />
          </Routes>
        </main>

      </div>

    </div>

    <Toaster position="top-right" />

  </Router>
</QueryClientProvider>
  );
}
export default App;
