import React, { useState } from "react";
import { useQuery } from "react-query";
import { Loader2, Users, Filter, Search } from "lucide-react";
import SportspersonCard from "../components/SportspersonCard";
import { sportspersonAPI } from "../services/api";

const SportspersonList = () => {

  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [selectedNationality, setSelectedNationality] = useState("");
const [showFilter, setShowFilter] = useState(false);
    const {
    data: sportspersons,
    isLoading,
    error,
    refetch
  } = useQuery("sportspersons", () => sportspersonAPI.getAll(), {
    select: (response) => response.data.data
  });
  
  const sports = [
  ...new Set(
    (sportspersons || []).map(
      (p) => p.sport_categories?.name.toLowerCase())
      .filter(Boolean)
  ),
];
  // Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gradient-to-r from-black via-red-950/30 to-black text-white">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-400">Loading sportspersons...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="text-center py-12 bg-gradient-to-r from-black via-red-950/30 to-black text-white">
        <p className="text-red-500 font-semibold">Error loading sportspersons</p>
        <button onClick={() => refetch()} className="btn-primary mt-4">
          Try Again
        </button>
      </div>
    );
  }

  // FILTER LOGIC
  const filteredSportspersons = (sportspersons || []).filter((sportsperson) => {

  const matchesSport =
    sportFilter === "all" ||
    (sportsperson.sport_categories &&
      sportsperson.sport_categories.name.toLowerCase() === sportFilter);

  const matchesNationality =
    !selectedNationality ||
    sportsperson.nationality?.toLowerCase() === selectedNationality.toLowerCase();
  const matchesSearch =
  !search ||
  `${sportsperson.first_name || ""} ${sportsperson.last_name || ""}`
    .toLowerCase()
    .includes(search.toLowerCase());

return matchesSport && matchesNationality && matchesSearch;
});

  return (
    <div className="space-y-6 bg-gradient-to-r from-black via-red-950/30 to-black text-white min-h-screen p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
            <Users className="h-8 w-8 mr-3 text-blue-600" />
            All Sportspersons
          </h1>
          <p className="text-gray-400 mt-2">
            Browse and manage sportsperson profiles
          </p>
        </div>

          <div className="relative">

  <button 
    onClick={() => setShowFilter(!showFilter)}
    className="btn-secondary flex items-center"
  >
    <Filter className="h-4 w-4 mr-2" />
    Filter
  </button>

  {showFilter && (
      <div className="absolute right-0 mt-2 w-56 max-h-60 overflow-y-auto bg-slate-800 text-white rounded-lg shadow-lg p-3 z-50">
      
      <p className="text-sm text-gray-400 mb-2">Nationality</p>

      {(sportspersons || []).map((p) => p.nationality)
        .filter((v, i, a) => v && a.indexOf(v) === i)
        .map((country) => (
          <div
            key={country}
            className="p-2 hover:bg-slate-700 cursor-pointer rounded"
            onClick={() => {
              setSelectedNationality(country);
              setShowFilter(false);
            }}
          >
            {country}
          </div>
        ))}

      <div
        className="mt-2 text-red-400 cursor-pointer text-sm"
        onClick={() => {
          setSelectedNationality("");
          setShowFilter(false);
        }}
      >
        Reset
      </div>

    </div>
  )}

</div>
      </div>

      {/* SEARCH */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />

        <input
          type="text"
          placeholder="Search sportsperson..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#111827] text-white border border-gray-800 pl-10 pr-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
      </div>

      {/* SPORT FILTER BUTTONS */}
      <div className="flex gap-3 mb-6 flex-wrap">

        <button onClick={() => setSportFilter("all")} 
       
          className={`px-4 py-2 rounded-lg font-medium transition
${sportFilter === "all"
  ? "bg-red-500 text-white"
  : "bg-[#111827] text-gray-300 border border-gray-800 hover:border-red-500"}
  `}
          
          >
          All
        </button>

        
        {sports.map((sport, index) => (
  <button
    key={index}
    onClick={() => setSportFilter(sport)}
    className={`px-4 py-2 rounded-lg font-medium transition
    ${
      sportFilter === sport
        ? "bg-red-500 text-white"
        : "bg-[#111827] text-gray-300 border border-gray-800 hover:border-red-500"
    }`}
  >
    {sport.toUpperCase()}
  </button>
))}

      </div>

      {/* STATS BAR */}
     {filteredSportspersons.length > 0 && (

  <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 flex justify-between items-center">

    <div className="text-gray-900 font-semibold">
{filteredSportspersons.length} Players Found
</div>
    <div className="text-gray-700 text-sm">
      Last updated: {new Date().toLocaleDateString()}
    </div>

  </div>

)}

      {/* GRID */}
      {filteredSportspersons.length > 0 ? (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredSportspersons.map((sportsperson) => (

            <SportspersonCard
              key={sportsperson.id}
              sportsperson={sportsperson}
            />

          ))}

        </div>

      ) : (

        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600">
            No sportspersons found
          </h3>
        </div>

      )}

      {/* LOAD MORE */}
      {filteredSportspersons.length > 0 && (
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