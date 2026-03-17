import { Flame, Trophy, CircleDot, Target } from "lucide-react";

const PopularSports = () => {
  return (
    <div className="text-center px-6 py-24 bg-gradient-to-r from-black via-red-950/20 to-black">
      <h2 className="text-4xl font-bold mb-4">Popular Sports</h2>
      <p className="text-gray-400 mb-12">
        Explore statistics across different sports
      </p>

      <div className="grid md:grid-cols-4 gap-10 max-w-7xl mx-auto">
        
        
        {/* Cricket */}
        
       
        <div className="bg-[#111827] p-10 rounded-2xl border border-gray-800 hover:border-red-500 transition hover:-translate-y-2">
          <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <Flame className="text-white" size={28} />
          </div>
          <h3 className="text-xl font-semibold">Cricket</h3>
          <p className="text-gray-400 text-sm">3 Players</p>
        </div>

        {/* Football */}
        <div className="bg-[#111827] p-10 rounded-2xl border border-gray-800 hover:border-blue-500 transition hover:-translate-y-2">
          <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
            <CircleDot className="text-white" size={28} />
          </div>
          <h3 className="text-xl font-semibold">Football</h3>
          <p className="text-gray-400 text-sm">3 Players</p>
        </div>

        {/* Basketball */}
        <div className="bg-[#111827] p-10 rounded-2xl border border-gray-800 hover:border-orange-500 transition hover:-translate-y-2">
          <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Trophy className="text-white" size={28} />
          </div>
          <h3 className="text-xl font-semibold">Basketball</h3>
          <p className="text-gray-400 text-sm">3 Players</p>
        </div>

        {/* Tennis */}
        <div className="bg-[#111827] p-10 rounded-2xl border border-gray-800 hover:border-green-500 transition hover:-translate-y-2">
          <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-green-400 to-lime-500 flex items-center justify-center">
            <Target className="text-white" size={28} />
          </div>
          <h3 className="text-xl font-semibold">Tennis</h3>
          <p className="text-gray-400 text-sm">3 Players</p>
        </div>

      </div>
    </div>
  );
};

export default PopularSports;