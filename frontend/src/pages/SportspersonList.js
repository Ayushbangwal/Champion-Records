import SplashScreen from "../components/SplashScreen";
import React from 'react';
import { useQuery } from 'react-query';
import { Loader2, Users, Filter } from 'lucide-react';
import SportspersonCard from '../components/SportspersonCard';
import { sportspersonAPI } from '../services/api';

const SportspersonList = () => {
  const {
    data: sportspersons,
    isLoading,
    error,
    refetch
  } = useQuery('sportspersons', () => sportspersonAPI.getAll(), {
    select: (response) => response.data.data,
  });

  if (isLoading) {
    return <SplashScreen />;
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading sportspersons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <p className="text-lg font-semibold">Error loading sportspersons</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
        <button
          onClick={() => refetch()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users className="h-8 w-8 mr-3 text-blue-600" />
            All Sportspersons
          </h1>
          <p className="text-gray-600 mt-2">
            Browse and manage sportsperson profiles
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="btn-secondary flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      {sportspersons && sportspersons.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-blue-800">
              <span className="font-semibold">{sportspersons.length}</span> sportsperson(s) found
            </div>
            <div className="text-sm text-blue-600">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      )}

      {/* Sportspersons Grid */}
      {sportspersons && sportspersons.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sportspersons.map((sportsperson) => (
            <SportspersonCard key={sportsperson.id} sportsperson={sportsperson} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No sportspersons found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by adding your first sportsperson to the database.
          </p>
          <a
            href="/sportspersons/add"
            className="btn-primary"
          >
            Add First Sportsperson
          </a>
        </div>
      )}

      {/* Load More Button (for pagination) */}
      {sportspersons && sportspersons.length > 0 && (
        <div className="text-center mt-8">
          <button className="btn-secondary">
            Load More Sportspersons
          </button>
        </div>
      )}
    </div>
  );
};

export default SportspersonList;
