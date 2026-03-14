import { useState, useEffect } from "react";
import api from "../services/api";

const PlayerGallery = () => {

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await api.get("/sportspersons");
        setPlayers(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold text-center mb-8">
        Player Gallery
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
{players.map((player) => (
  <div
    key={player.id}
    className="bg-white rounded-xl shadow-md overflow-hidden text-center p-3 hover:scale-105 transition duration-300"
  >
   <img
  src={player.image}
  alt={`${player.first_name} ${player.last_name}`}
 className="w-full h-60 object-contain bg-gray-100 rounded-lg"
/>

    <h3 className="mt-3 text-lg font-semibold text-gray-800">
      {player.first_name} {player.last_name}
    </h3>
  </div>
))}
      </div>
   </div>
  );
};
export default PlayerGallery;