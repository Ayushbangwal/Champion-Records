import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Search, ArrowLeft } from 'lucide-react';
import SportspersonCard from '../components/SportspersonCard';
import { sportspersonAPI } from '../services/api';

const SearchResults = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  const {
    data: searchResults,
    isLoading,
    error
  } = useQuery(
    ['search', searchQuery],
    () => sportspersonAPI.search(searchQuery),
    {
      enabled: searchQuery.length > 0,
      select: (response) => response.data.data,
    }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) {
      const newUrl = `/search?q=${encodeURIComponent(query)}`;
      window.history.pushState({}, '', newUrl);
      setSearchQuery(query);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Search className="h-8 w-8 mr-3 text-blue-600" />
            Search Results
          </h1>
          {searchQuery && (
            <p className="text-gray-600 mt-2">
              Searching for: <span className="font-medium">"{searchQuery}"</span>
            </p>
          )}
        </div>
        
        <Link
          to="/sportspersons"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Sportspersons
        </Link>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search sportspersons by name, nationality..."
            className="search-input text-lg py-3"
          />
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Searching...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">
            <p className="text-lg font-semibold">Error searching sportspersons</p>
            <p className="text-sm mt-2">{error.message}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {!isLoading && !error && searchQuery && (
        <div>
          {searchResults && searchResults.length > 0 ? (
            <div>
              {/* Results Count */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="text-blue-800">
                  <span className="font-semibold">{searchResults.length}</span> result(s) found for "{searchQuery}"
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((sportsperson) => (
                  <SportspersonCard key={sportsperson.id} sportsperson={sportsperson} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No results found
              </h3>
              <p className="text-gray-500 mb-6">
                No sportspersons found matching "{searchQuery}". Try searching with different keywords.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Search suggestions:</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Check the spelling of your search terms</li>
                  <li>• Try more general search terms</li>
                  <li>• Try searching by sport category or nationality</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Initial State (no search query) */}
      {!isLoading && !error && !searchQuery && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Search for Sportspersons
          </h3>
          <p className="text-gray-500 mb-6">
            Enter a search term to find sportspersons by name, nationality, or other details.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => {
                  window.history.pushState({}, '', '/search?q=Messi');
                  setSearchQuery('Messi');
                }}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
              >
                Messi
              </button>
              <button
                onClick={() => {
                  window.history.pushState({}, '', '/search?q=LeBron');
                  setSearchQuery('LeBron');
                }}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
              >
                LeBron
              </button>
              <button
                onClick={() => {
                  window.history.pushState({}, '', '/search?q=Federer');
                  setSearchQuery('Federer');
                }}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
              >
                Federer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
