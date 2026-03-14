import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";


import {
Loader2,
ArrowLeft,
Calendar,
MapPin,
Trophy,
Target,
Award,
Edit
} from "lucide-react";
import { sportspersonAPI } from "../services/api";

const SportspersonDetail = () => {

const { id } = useParams();
const [sportsperson, setSportsperson] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
  const fetchSportsperson = async () => {
    try {
      const response = await sportspersonAPI.getDetails(id);
      setSportsperson(response.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchSportsperson();
}, [id]);

const formatDate = (dateString) => {
if (!dateString) return "N/A";
const date = new Date(dateString);
return date.toLocaleDateString("en-US", {
year: "numeric",
month: "long",
day: "numeric"
});
};

const calculateAge = (dateString) => {
if (!dateString) return "N/A";
const birthDate = new Date(dateString);
const today = new Date();
let age = today.getFullYear() - birthDate.getFullYear();
const monthDiff = today.getMonth() - birthDate.getMonth();


if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
  age--;
}

return age;


};

/* -------- Achievement Count -------- */

const achievementCount =
(sportsperson?.achievements?.length || 0) +
(sportsperson?.records?.length || 0) +
(sportsperson?.awards?.length || 0);

/* -------- Timeline Merge -------- */

const timeline = [
...(sportsperson?.achievements || []).map((a) => ({
title: a.title,
date: a.achievement_date,
type: "Achievement",
})),


...(sportsperson?.records || []).map((r) => ({
  title: r.record_type,
  date: r.record_date,
  type: "Record",
})),

...(sportsperson?.awards || []).map((a) => ({
  title: a.award_name,
  date: a.award_date,
  type: "Award",
})),
];

const sortedTimeline = [...timeline].sort(
(a, b) => new Date(b.date || 0) - new Date(a.date || 0)
);

/* -------- Loading -------- */

if (isLoading) {
return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-10 w-10 animate-spin text-blue-600" /> </div>
);
}

/* -------- Error -------- */

if (error || !sportsperson) {
return ( <div className="text-center py-12"> <p>Error loading sportsperson</p> <Link to="/sportspersons" className="text-blue-600">
Back to Sportspersons </Link> </div>
);
}

return ( <div className="space-y-6">


  {/* Back Button */}

  <Link
    to="/sportspersons"
    className="inline-flex items-center text-blue-600"
  >
    <ArrowLeft className="h-4 w-4 mr-2" />
    Back to Sportspersons
  </Link>

  {/* Header */}

  <div className="card flex justify-between items-start">

    <div className="flex items-start space-x-6">

      {sportsperson.image ? (
        <img
          src={sportsperson.image}
          alt={sportsperson.first_name}
          className="w-32 h-32 rounded-full object-cover"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
          {sportsperson.first_name?.[0]}
        </div>
      )}

      <div>

        <h1 className="text-3xl font-bold">
          {sportsperson.first_name} {sportsperson.last_name}
        </h1>

        <div className="flex items-center text-gray-600 mt-2">
          <Trophy className="h-5 w-5 mr-2" />
          {sportsperson.sport_categories?.name}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">

          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            Age: {calculateAge(sportsperson.date_of_birth)}
          </div>

          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            Born: {formatDate(sportsperson.date_of_birth)}
          </div>

          {sportsperson.nationality && (
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {sportsperson.nationality}
            </div>
          )}

        </div>

      </div>

    </div>

    <Link
      to={`/sportspersons/${sportsperson.id}/edit`}
      className="btn-secondary flex items-center"
    >
      <Edit className="h-4 w-4 mr-2" />
      Edit
    </Link>

  </div>

  {/* Career Statistics */}

  <div className="stat-card">

    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold">Career Statistics</h3>
      <Target className="h-6 w-6" />
    </div>

    {sportsperson.statistics?.length > 0 ? (
      <div className="space-y-3">
        {sportsperson.statistics.map((stat) => (
          <div key={stat.id} className="bg-white/10 rounded-lg p-3">
            <div className="font-medium">{stat.season}</div>
            <div className="text-sm opacity-90">
              Matches: {stat.matches_played} | Wins: {stat.wins} | Losses: {stat.losses}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No statistics available</p>
    )}

  </div>

  {/* Achievements Timeline */}

  <div className="achievement-card">

    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold">Achievements</h3>
      <Award className="h-6 w-6" />
    </div>

    <div className="mb-2 text-sm">
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
      <p>No achievements available</p>
    )}

  </div>

</div>

);
};

export default SportspersonDetail;
