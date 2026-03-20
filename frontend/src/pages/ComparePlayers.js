import { useState, useEffect } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const ComparePlayers = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [players, setPlayers] = useState([]);
  const [selectedPlayer1, setSelectedPlayer1] = useState(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState(null);

  const chartData = [
    {
      name: "Matches",
      player1: selectedPlayer1?.matches || 0,
      player2: selectedPlayer2?.matches || 0,
    },
    {
      name: "Age",
      player1: selectedPlayer1?.age || 0,
      player2: selectedPlayer2?.age || 0,
    },
  ];

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const res = await api.get("/sportspersons");
        setPlayers(res?.data?.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    loadPlayers();
  }, []);

  const fetchPlayer = async (id, setPlayer) => {
    try {
      const res = await api.get(`/sportspersons/${id}`);
      const p = res?.data?.data;

      let image = "https://via.placeholder.com/150";

      try {
        const img = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${p.first_name}_${p.last_name}`
        ).then((r) => r.json());

        image = img?.thumbnail?.source || image;
      } catch {
        console.log("Wiki image failed");
      }

      setPlayer({
        ...p,
        name: `${p.first_name} ${p.last_name}`,
        image,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCompare = () => {
    if (player1 && player2) {
      fetchPlayer(player1, setSelectedPlayer1);
      fetchPlayer(player2, setSelectedPlayer2);
    }
  };

  
    

  return (
    <div className="min-h-screen bg-black">

      {/* HERO */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Compare Players
        </h1>

        <p className="text-gray-400 mb-10">
          Select two players to compare
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* Player 1 */}
          <select
            value={player1}
            onChange={(e) => {
              setPlayer1(e.target.value);
              fetchPlayer(e.target.value, setSelectedPlayer1);
            }}
            className="p-3 bg-gray-800 text-white rounded"
          >
            <option value="">Select Player</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.first_name} {p.last_name}
              </option>
            ))}
          </select>

          {/* Player 2 */}
          <select
            value={player2}
            onChange={(e) => {
              setPlayer2(e.target.value);
              fetchPlayer(e.target.value, setSelectedPlayer2);
            }}
            className="p-3 bg-gray-800 text-white rounded"
          >
            <option value="">Select Player</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.first_name} {p.last_name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCompare}
          className="mt-6 bg-red-500 px-6 py-2 rounded text-white"
        >
          Compare
        </button>
      </section>

      {/* RESULT */}
      

        <section className="max-w-6xl mx-auto px-4 py-12 text-white">

          {/* VS */}
          <div className="flex justify-center items-center gap-10 mb-12">

            <div className="text-center">
              
              <img src={selectedPlayer1?.image || "https://via.placeholder.com/150"}
  alt={selectedPlayer1?.name || "Player 1"}
   className="w-40 h-40 object-cover rounded-full mx-auto shadow-lg"
/>
              <p>{selectedPlayer1?.name}</p>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-red-500 px-4 py-2 rounded-full"
            >
              VS
            </motion.div>

            <div className="text-center">
              <img src={selectedPlayer2?.image || "https://via.placeholder.com/150"}
  alt={selectedPlayer2?.name || "Player 2"}
  className="w-40 h-40 object-cover rounded-full mx-auto shadow-lg"
/>
              <p>{selectedPlayer2?.name}</p>
            </div>

          </div>

          {/* CHART */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="player1" fill="#ef4444" />
              <Bar dataKey="player2" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>

          {/* WINNER */}
          <p className="text-center mt-6 text-green-400">
            🏆 {(selectedPlayer1?.matches || 0) === (selectedPlayer2?.matches || 0)
  ? "It's a Tie 🤝"
  : (selectedPlayer1?.matches || 0) > (selectedPlayer2?.matches || 0)
  ? selectedPlayer1?.name
  : selectedPlayer2?.name}
          </p>

        </section>

    </div>
  );
};

export default ComparePlayers;