import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { 
  Loader2, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Trophy, 
  Target, 
  Award,
  TrendingUp,
  Star,
  Edit
} from 'lucide-react';
import { sportspersonAPI } from '../services/api';

const SportspersonDetail = () => {
  const { id } = useParams();

  const {
    data: sportsperson,
    isLoading,
    error
  } = useQuery(['sportsperson', id], () => sportspersonAPI.getDetails(id), {
    select: (response) => response.data.data,
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
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
  const achievementCount =
  (sportsperson?.achievements?.length || 0) +
  (sportsperson?.records?.length || 0) +
  (sportsperson?.awards?.length || 0);

  const timeline = [
  ...(sportsperson?.achievements || []).map(a => ({
    title: a.title,
    date: a.achievement_date,
    type: "Achievement"
  })),

  ...(sportsperson?.records || []).map(r => ({
    title: r.record_type,
    date: r.record_date,
    type: "Record"
  })),

  ...(sportsperson?.awards || []).map(a => ({
    title: a.award_name,
    date: a.award_date,
    type: "Award"
  }))
];

const sortedTimeline = timeline.sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading sportsperson details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <p className="text-lg font-semibold">Error loading sportsperson details</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
        <Link to="/sportspersons" className="btn-primary">
          Back to Sportspersons
        </Link>
      </div>
    );
  }

  if (!sportsperson) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Sportsperson not found
        </h3>
        <Link to="/sportspersons" className="btn-primary">
          Back to Sportspersons
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/sportspersons"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Sportspersons
      </Link>

      {/* Header Section */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              {sportsperson.image ? (
                <img
                  src={sportsperson.image}
                  alt={`${sportsperson.first_name} ${sportsperson.last_name}`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-500">
                    {sportsperson.first_name?.[0]}{sportsperson.last_name?.[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {sportsperson.first_name} {sportsperson.last_name}
              </h1>
              
              <div className="flex items-center text-lg text-gray-600 mb-4">
                <Trophy className="h-5 w-5 mr-2 text-blue-600" />
                {sportsperson.sport_categories?.name || 'Unknown Sport'}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>Age: {calculateAge(sportsperson.date_of_birth)}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>Born: {formatDate(sportsperson.date_of_birth)}</span>
                </div>
                
                {sportsperson.nationality && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{sportsperson.nationality}</span>
                  </div>
                )}
              </div>

              {sportsperson.bio && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Biography</h3>
                  <p className="text-gray-600 leading-relaxed">{sportsperson.bio}</p>
                </div>
              )}
            </div>
          </div>

          {/* Edit Button */}
          <Link
            to={`/sportspersons/${sportsperson.id}/edit`}
            className="btn-secondary flex items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Career Statistics</h3>
            <Target className="h-6 w-6" />
          </div>
          {sportsperson.statistics && sportsperson.statistics.length > 0 ? (
            <div className="space-y-3">
              {sportsperson.statistics.slice(0, 3).map((stat) => (
                <div key={stat.id} className="bg-white/10 rounded-lg p-3">
                  <div className="font-medium">{stat.season}</div>
                  <div className="text-sm opacity-90">
                    Matches: {stat.matches_played} | Wins: {stat.wins} | Losses: {stat.losses}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="opacity-90">No statistics available</p>
          )}
        </div>

        <div className="achievement-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Recent Achievements</h3>
            <Award className="h-6 w-6" />
          </div>
          {sportsperson.achievements && sportsperson.achievements.length > 0 ? (
            <div className="space-y-3">
              {sportsperson.achievements.slice(0, 3).map((achievement) => (
                <div key={achievement.id} className="bg-white/10 rounded-lg p-3">
                  <div className="font-medium">{achievement.title}</div>
                  <div className="text-sm opacity-90">
                    {formatDate(achievement.achievement_date)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="opacity-90">No achievements available</p>
          )}
        </div>
      </div>

      {/* Records Section */}
      {sportsperson.records && sportsperson.records.length > 0 && (
        <div className="record-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Records</h3>
            <Star className="h-6 w-6" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sportsperson.records.map((record) => (
              <div key={record.id} className="bg-white/10 rounded-lg p-4">
                <div className="font-semibold mb-1">{record.record_type}</div>
                <div className="text-lg font-bold mb-2">{record.record_value}</div>
                <div className="text-sm opacity-90">{record.description}</div>
                <div className="text-xs opacity-75 mt-2">
                  {formatDate(record.record_date)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Awards Section */}
      {sportsperson.awards && sportsperson.awards.length > 0 && (
        <div className="award-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Awards</h3>
            <Trophy className="h-6 w-6" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sportsperson.awards.map((award) => (
              <div key={award.id} className="bg-white/10 rounded-lg p-4">
                <div className="font-semibold mb-1">{award.award_name}</div>
                <div className="text-sm opacity-90 mb-2">{award.awarding_organization}</div>
                <div className="text-xs opacity-75">
                  {formatDate(award.award_date)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Timeline */}

<div className="achievement-card">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-xl font-semibold">Achievements Timeline</h3>
    <TrendingUp className="h-6 w-6" />
  </div>

  <div className="mb-4 font-medium">
    Total Achievements: {achievementCount}
  </div>

  {sortedTimeline.length > 0 ? (
    <div className="space-y-3">
      {sortedTimeline.map((item, index) => (
        <div key={index} className="bg-white/10 rounded-lg p-3">
          <div className="font-medium">{item.title}</div>
          <div className="text-sm opacity-90">
            {item.type} • {formatDate(item.date)}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="opacity-90">No achievements available</p>
  )}
</div>
    </div>
  );
};

export default SportspersonDetail;
