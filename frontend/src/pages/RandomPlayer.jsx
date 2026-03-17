import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const RandomPlayer = () => {

  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState(null);

  const navigate = useNavigate(); // ✅ IMPORTANT

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await api.get("/sportspersons");
        setPlayers(res.data.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  const getRandomPlayer = () => {
    if (players.length === 0) return;

    const randomIndex = Math.floor(Math.random() * players.length);
    setPlayer(players[randomIndex]);
  };

  return (
    <div className="p-10 text-center">

      <h1 className="text-3xl font-bold mb-6">
        Random Player
      </h1>

      <button
        onClick={getRandomPlayer}
        className="bg-orange-500 text-white px-6 py-2 rounded-lg mb-6"
      >
        Get Random Player
      </button>

      {player && (
        <div
          onClick={() => navigate(`/sportspersons/${player.id}`)}
          className="bg-white p-5 rounded-xl shadow-lg max-w-sm mx-auto cursor-pointer hover:shadow-xl transition duration-300"
        >

          <img
            src={player.image}
            alt={`${player.first_name} ${player.last_name}`}
            className="w-full h-64 object-contain bg-gray-100 rounded-lg hover:scale-105 transition duration-300"
          />

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {player.first_name} {player.last_name}
          </h2>

          <p className="text-gray-600 text-lg">
            Nationality: {player.nationality}
          </p>

        </div>
      )}

    </div>
  );
};

export default RandomPlayer;