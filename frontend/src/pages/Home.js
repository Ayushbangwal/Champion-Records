import React from "react";
import { Link } from "react-router-dom";
import { Search, Trophy, Users, PlusCircle, TrendingUp, Star } from "lucide-react";

const Home = () => {
  return (
    <div className="space-y-20 bg-black text-white">

      {/* HERO SECTION */}

      <section className="min-h-screen flex items-center justify-center text-center px-6 bg-gradient-to-br from-black via-gray-900 to-red-900">

        <div>

          <p className="text-red-400 border border-red-500 inline-block px-4 py-1 rounded-full text-sm mb-6">
            WELCOME TO THE ULTIMATE SPORTS DATABASE
          </p>

          <h1 className="text-6xl font-bold leading-tight">
            SPORTS PLAYER
            <span className="block text-red-500">STATS & RECORDS</span>
          </h1>

          <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
            Explore comprehensive statistics, achievements, and records of
            legendary sports players from around the world.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">

            <Link
              to="/sportspersons"
              className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-lg font-semibold transition"
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

      <section className="px-10">

        <h2 className="text-4xl font-bold text-center mb-12">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-gray-900 border border-red-900 p-8 rounded-xl text-center hover:scale-105 transition">

            <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
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


          <div className="bg-gray-900 border border-red-900 p-8 rounded-xl text-center hover:scale-105 transition">

            <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
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


          <div className="bg-gray-900 border border-red-900 p-8 rounded-xl text-center hover:scale-105 transition">

            <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
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

      </section>


      {/* QUICK ACTIONS */}

      <section className="px-10">

        <h2 className="text-4xl font-bold text-center mb-12">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <Link
            to="/sportspersons"
            className="bg-gray-900 border border-gray-800 p-6 rounded-xl text-center hover:border-red-500 hover:scale-105 transition"
          >
            <Users className="h-12 w-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">View All Players</h3>
            <p className="text-sm text-gray-400">
              Browse the complete sports database
            </p>
          </Link>


          <Link
            to="/sportspersons/add"
            className="bg-gray-900 border border-gray-800 p-6 rounded-xl text-center hover:border-red-500 hover:scale-105 transition"
          >
            <PlusCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Add Player</h3>
            <p className="text-sm text-gray-400">
              Create a new sportsperson profile
            </p>
          </Link>


          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl text-center hover:border-red-500 hover:scale-105 transition cursor-pointer">
            <Search className="h-12 w-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Search Players</h3>
            <p className="text-sm text-gray-400">
              Find specific sportspersons
            </p>
          </div>


          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl text-center hover:border-red-500 hover:scale-105 transition">
            <Star className="h-12 w-12 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Top Performers</h3>
            <p className="text-sm text-gray-400">
              Discover the best athletes
            </p>
          </div>

        </div>

      </section>


      {/* PLATFORM STATS */}

      <section className="bg-gradient-to-r from-black via-red-950 to-black py-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          Platform Statistics
        </h2>

        <div className="grid md:grid-cols-4 gap-10 text-center">

          <div>
            <div className="text-4xl font-bold text-red-500">50+</div>
            <p className="text-gray-400">Sportspersons</p>
          </div>

          <div>
            <div className="text-4xl font-bold text-red-500">7</div>
            <p className="text-gray-400">Sport Categories</p>
          </div>

          <div>
            <div className="text-4xl font-bold text-red-500">100+</div>
            <p className="text-gray-400">Achievements</p>
          </div>

          <div>
            <div className="text-4xl font-bold text-red-500">25+</div>
            <p className="text-gray-400">Records</p>
          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="text-center py-16">

        <h2 className="text-4xl font-bold mb-4">
          Ready to Explore the Database?
        </h2>

        <p className="text-gray-400 mb-8 text-lg">
          Discover legendary athletes and their career achievements.
        </p>

        <Link
          to="/sportspersons"
          className="bg-red-500 hover:bg-red-600 px-10 py-4 rounded-lg font-semibold text-lg transition"
        >
          Explore Now
        </Link>

      </section>

    </div>
  );
};

export default Home;