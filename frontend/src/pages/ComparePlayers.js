import { useState, useEffect } from "react";
import api from "../services/api";

const ComparePlayers = () => {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [players, setPlayers] = useState([]);
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");

useEffect(() => {
  const loadPlayers = async () => {
    try {
      const res = await api.get("/sportspersons");
      setPlayers(res?.data?.data || []);
    } catch (err) {
      console.error("Error loading players:", err);
    }
  };
   loadPlayers();
}, []);

const fetchPlayers = async () => {
  try {
    const res1 = await api.get(`/sportspersons/${id1}`);
    const res2 = await api.get(`/sportspersons/${id2}`);

    const p1 = res1?.data?.data || {};
    const p2 = res2?.data?.data || {};
    const img1 = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${p1.first_name}_${p1.last_name}`
    ).then(r => r.json());

    const img2 = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${p2.first_name}_${p2.last_name}`
    ).then(r => r.json());

    setPlayer1({
      ...p1,
      image_url: img1.thumbnail?.source
    });

    setPlayer2({
      ...p2,
      image_url: img2.thumbnail?.source
    });

  } catch (err) {
    console.error("Error fetching players:", err);
  }
};

   return (
        <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Compare Player
      </h1>
       {/* Input Section */}
        <div className="flex items-center gap-4 mb-8">
<select
 value={id1}
 onChange={(e) => setId1(e.target.value)}
 className="border border-gray-300 rounded-lg px-4 py-2 w-56 bg-white text-black"
>
 <option value="">Select Player 1</option>

 {players?.map((p) => (
  <option key={p.id} value={p.id}>
    {p?.first_name || ""} {p?.last_name || ""}
  </option>
))}

</select>

 <select
 value={id2}
 onChange={(e) => setId2(e.target.value)}
 className="border border-gray-300 rounded-lg px-4 py-2 w-56 bg-white text-black"
>
 <option value="">Select Player 2</option>

 {players?.map((p) => (
  <option key={p.id} value={p.id}>
    {p?.first_name || ""} {p?.last_name || ""}
  </option>
))}

</select>
    <button
  onClick={fetchPlayers}
  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
>
  Compare
</button>
      </div>

      {/* Comparison Section */}
{player1 && player2 && (
<div className="grid grid-cols-2 gap-10">

{/* Player 1 Card */}
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">

<img
src={player1?.image_url || "https://via.placeholder.com/150"}
alt={player1.first_name}
className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
/>

<h2 className="text-xl font-bold text-white text-center mb-2">
{player1?.first_name || ""} {player1?.last_name || ""}
</h2>

<p className="text-gray-300 text-center">
<strong>DOB:</strong>{" "}
{player1.date_of_birth &&
new Date(player1.date_of_birth).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
})}
</p>

<p className="text-gray-300 text-center">
<strong>Country:</strong> {player1.nationality}
</p>

</div>


{/* Player 2 Card */}
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">

<img
src={player2.image_url || "https://via.placeholder.com/150"}
alt={player2.first_name}
className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
/>

<h2 className="text-xl font-bold text-white text-center mb-2">
{player1?.first_name || ""} {player1?.last_name || ""}
</h2>

<p className="text-gray-300 text-center">
    <strong>DOB:</strong>{" "}
{player2.date_of_birth &&
new Date(player2.date_of_birth).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
})}
</p>

<p className="text-gray-300 text-center">
<strong>Country:</strong> {player2.nationality}
</p>
</div>
</div>
)}
</div>

);
};
export default ComparePlayers;