import RandomPlayer from "./pages/RandomPlayer";
import PlayerGallery from "./pages/PlayerGallery";
import ComparePlayers from "./pages/ComparePlayers";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SportspersonList from './pages/SportspersonList';
import SportspersonDetail from './pages/SportspersonDetail';
import EditSportsperson from './pages/EditSportsperson';
import SearchResults from './pages/SearchResults';


const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
  <Router>

   

        <div className="min-h-screen bg-gray-50">

        <Navbar />
        
   
          

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sportspersons" element={<SportspersonList />} />
            <Route path="/sportspersons/:id" element={<SportspersonDetail />} />
            <Route path="/sportspersons/:id/edit" element={<EditSportsperson />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/compare" element={<ComparePlayers />} />
            <Route path="/gallery" element={<PlayerGallery />} />
            <Route path="/random-player" element={<RandomPlayer />} />
          </Routes>
        </main>

      </div>

    

    <Toaster position="top-right" />

  </Router>
</QueryClientProvider>
  );
}
export default App;
