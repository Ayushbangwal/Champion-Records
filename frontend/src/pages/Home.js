import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Trophy, Users, PlusCircle, TrendingUp, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-orange-600 via-red-600 to_yellow-500 rounded-2xl text-white shadow-xl">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide mb-4">
            Champion Sports Records
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Track, manage, and explore sports statistics, achievements, and records
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sportspersons"
              className="btn-primary bg-orange-500 text-white hover:bg-orange-600 px-8 py-3 text-lg"
            >
              <Users className="inline h-5 w-5 mr-2" />
              Browse Sportspersons
            </Link>
            <Link
              to="/sportspersons/add"
              className="bg-black hover:bg-gray-800 text-orange-500 font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              <PlusCircle className="inline h-5 w-5 mr-2" />
              Add New Sportsperson
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Comprehensive Profiles
            </h3>
            <p className="text-gray-600">
              Detailed sportsperson profiles with personal information, career statistics, 
              achievements, and records.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Performance Analytics
            </h3>
            <p className="text-gray-600">
              Track performance metrics, career statistics, and analyze trends over time 
              for each sportsperson.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Achievements & Records
            </h3>
            <p className="text-gray-600">
              Document championships, awards, records, and milestones in each sportsperson's career.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/sportspersons"
            className="card hover:shadow-lg transition-shadow duration-300 text-center group"
          >
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-800 mb-1">View All Sportspersons</h3>
            <p className="text-sm text-gray-600">Browse the complete database</p>
          </Link>

          <Link
            to="/sportspersons/add"
            className="card hover:shadow-lg transition-shadow duration-300 text-center group"
          >
            <PlusCircle className="h-12 w-12 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-800 mb-1">Add Sportsperson</h3>
            <p className="text-sm text-gray-600">Create a new profile</p>
          </Link>

          <div className="card hover:shadow-lg transition-shadow duration-300 text-center group cursor-pointer">
            <Search className="h-12 w-12 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-800 mb-1">Search Database</h3>
            <p className="text-sm text-gray-600">Find specific sportspersons</p>
          </div>

          <div className="card hover:shadow-lg transition-shadow duration-300 text-center group">
            <Star className="h-12 w-12 text-yellow-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-800 mb-1">Top Performers</h3>
            <p className="text-sm text-gray-600">View highest achievers</p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="bg-gray-100 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Platform Statistics
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <p className="text-gray-600">Sportspersons</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">7</div>
            <p className="text-gray-600">Sport Categories</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">100+</div>
            <p className="text-gray-600">Achievements</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
            <p className="text-gray-600">Records</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Begin exploring sports statistics and managing sportsperson records today.
        </p>
        <Link
          to="/sportspersons"
          className="btn-primary px-8 py-3 text-lg"
        >
          Explore Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
