import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Trophy, Target, Award } from 'lucide-react';

const SportspersonCard = ({ sportsperson }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const calculateAge = (dateString) => {
    if (!dateString) return 'N/A';
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          {sportsperson.photo_url ? (
            <img
              src={sportsperson.photo_url}
              alt={`${sportsperson.first_name} ${sportsperson.last_name}`}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-500">
                {sportsperson.first_name?.[0]}{sportsperson.last_name?.[0]}
              </span>
            </div>
          )}
        </div>

        {/* Sportsperson Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                <Link to={`/sportspersons/${sportsperson.id}`}>
                  {sportsperson.first_name} {sportsperson.last_name}
                </Link>
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Trophy className="h-4 w-4 mr-1" />
                {sportsperson.sport_categories?.name || 'Unknown Sport'}
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="mt-3 space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span>Age: {calculateAge(sportsperson.date_of_birth)}</span>
              <span className="mx-2">•</span>
              <span>Born: {formatDate(sportsperson.date_of_birth)}</span>
            </div>
            
            {sportsperson.nationality && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span>{sportsperson.nationality}</span>
              </div>
            )}

            {sportsperson.bio && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {sportsperson.bio}
              </p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <Target className="h-4 w-4 mr-1 text-blue-500" />
              <span className="text-gray-600">Career Stats</span>
            </div>
            <div className="flex items-center text-sm">
              <Award className="h-4 w-4 mr-1 text-yellow-500" />
              <span className="text-gray-600">Achievements</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <Link
          to={`/sportspersons/${sportsperson.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
        <div className="text-xs text-gray-400">
          ID: {sportsperson.id}
        </div>
      </div>
    </div>
  );
};

export default SportspersonCard;
