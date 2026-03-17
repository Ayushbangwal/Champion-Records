import React from "react";
import { Link } from "react-router-dom";
import { Search, Trophy, Users, PlusCircle, TrendingUp, Star } from "lucide-react";
import PopularSports from "../components/PopularSports";

const Home = () => {
  return (
    <div className="bg-black text-white">
      

      {/* HERO SECTION */}
 
 <section className="w-full min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-[#0b0f1a] via-[#0d1b2a] to-[#7a1010]">
          <div className="max-w-6xl mx-auto px-6">

          <p className="text-red-400 border border-red-500 inline-block px-4 py-1 rounded-full text-sm mb-6">
            WELCOME TO THE ULTIMATE SPORTS DATABASE
          </p>

           <h1 className="text-6xl font-extrabold tracking-tight">
            SPORTS PLAYER
            <span className="block text-red-500 drop-shadow-lg">
            STATS & RECORDS
            </span>
           </h1>

          <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
            Explore comprehensive statistics, achievements, and records of
            legendary sports players from around the world.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">

            <Link
              to="/sportspersons"
              className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-xl shadow-lg shadow-red-500/30 transition"
            >
              EXPLORE PLAYERS
            </Link>

            <Link
              to="/compare"
              className="border border-gray-500 px-8 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              COMPARE STATS
            </Link>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      
      <section className="bg-gradient-to-r from-black via-red-900/50 to-black py-24">
        <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16 tracking-wide">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">

          <div className="bg-[#0f172a] border border-red-900/40 rounded-2xl p-10 flex flex-col items-center text-center hover:-translate-y-2 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/10 transition duration-300">

            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">  
              <Users className="h-8 w-8 text-red-400" />
            </div>

            <h3 className="text-xl font-semibold mb-3 text-red-400">
              Comprehensive Profiles
            </h3>

            <p className="text-gray-400">
              Detailed sportsperson profiles with personal information,
              career statistics, achievements and records.
            </p>
          </div>

          <div className="bg-[#0f172a] border border-red-900/40 rounded-2xl p-10 flex flex-col items-center text-center hover:-translate-y-2 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/10 transition duration-300">

            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">  
              <TrendingUp className="h-8 w-8 text-red-400" />
            </div>

            <h3 className="text-xl font-semibold mb-3 text-red-400">
              Performance Analytics
            </h3>

            <p className="text-gray-400">
              Track performance metrics, analyze trends and compare
              statistics between players.
            </p>
          </div>

          <div className="bg-[#0f172a] border border-red-900/40 rounded-2xl p-10 flex flex-col items-center text-center hover:-translate-y-2 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/10 transition duration-300">

            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">  
              <Trophy className="h-8 w-8 text-red-400" />
            </div>

            <h3 className="text-xl font-semibold mb-3 text-red-400">
              Achievements & Records
            </h3>

            <p className="text-gray-400">
              Document championships, awards, milestones and legendary
              sports records.
            </p>

          </div>

        </div>
        </div>

      </section>

      {/* QUICK ACTIONS */}
      <section className="bg-gradient-to-r from-black via-red-900/50 to-black py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          <Link
            to="/sportspersons"
            className=" bg-[#111827] rounded-xl p-10 border border-gray-800 hover:border-red-500 hover:bg-[#141c2f] transition"
          >
            <Users className="h-10 w-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">View All Players</h3>
            <p className="text-sm text-gray-400">
              Browse the complete sports database
            </p>
          </Link>


          <Link
            to="/sportspersons/add"
            className="bg-[#111827] rounded-xl p-10 border border-gray-800 hover:border-red-500 hover:bg-[#141c2f] transition"
          >
            <PlusCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Add Player</h3>
            <p className="text-sm text-gray-400">
              Create a new sportsperson profile
            </p>
          </Link>


          <div className="bg-[#111827] border border-gray-800 p-10 rounded-xl text-center hover:border-red-500 hover:bg-[#141c2f] transition cursor-pointer">
            <Search className="h-10 w-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Search Players</h3>
            <p className="text-sm text-gray-400">
              Find specific sportspersons
            </p>
          </div>


          <div className="bg-[#111827] border border-gray-800 p-10 rounded-xl text-center hover:border-red-500 hover:bg-[#141c2f] transition">
            <Star className="h-10 w-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Top Performers</h3>
            <p className="text-sm text-gray-400">
              Discover the best athletes
            </p>
          </div>

        </div>
        </div>

      </section>


      {/* PLATFORM STATS */}
      <section className="bg-gradient-to-r from-black via-red-900/50 to-black py-24">
        <h2 className="text-4xl font-bold text-center mb-16 tracking-wide">
          Platform Statistics
        </h2>


        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">



          <div className="bg-[#0f172a] border border-red-900/30 rounded-xl p-10 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/10 transition">
            <div className="text-4xl font-bold text-red-500">50+</div>
            <p className="text-gray-400">Sportspersons</p>
          </div>

          <div className="bg-[#0f172a] border border-red-900/30 rounded-xl p-10 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/10 transition">
            <div className="text-4xl font-bold text-red-500">7</div>
            <p className="text-gray-400">Sport Categories</p>
          </div>

          <div className="bg-[#0f172a] border border-red-900/30 rounded-xl p-10 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/10 transition">
            <div className="text-4xl font-bold text-red-500">100+</div>
            <p className="text-gray-400">Achievements</p>
          </div>

          <div className="bg-[#0f172a] border border-red-900/30 rounded-xl p-10 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/10 transition">
            <div className="text-4xl font-bold text-red-500">25+</div>
            <p className="text-gray-400">Records</p>
          </div>

        </div>

      </section>

<div className="my-20">
  <PopularSports />
</div>




      {/* SPLIT CTA SECTION */}
<section className="grid md:grid-cols-2 border-t border-gray-800">

  {/* LEFT */}
  <div className="bg-gradient-to-r from-[#0f172a] to-[#7f1d1d] text-center py-20 px-6 border-r border-gray-800">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
      Ready to Explore the Database?
    </h2>

    <p className="text-gray-300 mb-8">
      Discover legendary athletes and their career achievements.
    </p>

    <Link
      to="/sportspersons"
      className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-lg font-semibold transition"
    >
      Explore Now
    </Link>
  </div>

  {/* RIGHT */}
  <div className="bg-gradient-to-r from-[#7f1d1d] to-[#ef4444] text-center py-20 px-6">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
      Ready to Compare Players?
    </h2>

    <p className="text-red-100 mb-8">
      Use our advanced comparison tool to analyze stats side by side
    </p>

    <Link
      to="/compare"
      className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
    >
      Compare Players
    </Link>
  </div>

</section>
    </div>
  );
};

export default Home;