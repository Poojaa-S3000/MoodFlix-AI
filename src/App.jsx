import { useState } from "react";
import { getMovie } from "./services/api";

function App() {
  const moods = [
    "😊 Happy",
    "😢 Sad",
    "😍 Romantic",
    "😡 Angry",
    "😴 Relaxed",
    "😎 Excited",
  ];

  const [selectedMood, setSelectedMood] = useState("");
  const [description, setDescription] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRecommend = async () => {
    if (!selectedMood) {
      alert("Please select a mood!");
      return;
    }

    setLoading(true);
    setMovies([]);
    setError("");

    try {
      // Ask our backend AI for 5 movie titles
      const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood: selectedMood,
          description: description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Recommendation failed");
      }

      if (!Array.isArray(data.movies)) {
        throw new Error("Invalid movie list received");
      }

      // Get full information for each movie from OMDb
      const movieDetails = await Promise.all(
        data.movies.map(async (title) => {
          try {
            return await getMovie(title);
          } catch (error) {
            console.error(`Could not find ${title}:`, error);
            return {
              Title: title,
              Error: "Movie details not found",
            };
          }
        })
      );

      setMovies(movieDetails);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          🎬 MoodFlix AI
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Find the perfect movie for your current mood
        </p>

        {/* Mood */}
        <h2 className="text-2xl font-semibold mb-5">
          Select Your Mood
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`px-5 py-3 rounded-xl transition duration-300 ${
                selectedMood === mood
                  ? "bg-blue-600 scale-105"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {mood}
            </button>
          ))}
        </div>

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe how you're feeling..."
          className="w-full h-32 rounded-xl p-4 bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500 resize-none"
        />

        {/* Recommend */}
        <button
          onClick={handleRecommend}
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 px-8 py-3 rounded-xl text-lg font-semibold transition"
        >
          {loading ? "Finding Movies..." : "Recommend Movies"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-900/40 border border-red-500 rounded-xl p-4 text-red-300">
            ❌ {error}
          </div>
        )}
      </div>

      {/* Movie Results */}
      {movies.length > 0 && (
        <div className="max-w-6xl mx-auto mt-14">

          <h2 className="text-3xl font-bold text-center mb-8">
            🎥 Your Recommendations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {movies.map((movie, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:-translate-y-1 transition duration-300"
              >

                {/* Poster */}
                {movie.Poster && movie.Poster !== "N/A" ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-[430px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[430px] bg-slate-700 flex items-center justify-center text-gray-400">
                    🎬 No Poster Available
                  </div>
                )}

                {/* Details */}
                <div className="p-6">

                  <h3 className="text-2xl font-bold mb-3">
                    {movie.Title}
                  </h3>

                  {movie.Error ? (
                    <p className="text-red-400">
                      {movie.Error}
                    </p>
                  ) : (
                    <>
                      <div className="flex gap-5 text-gray-300 mb-3">
                        <span>⭐ {movie.imdbRating}</span>
                        <span>📅 {movie.Year}</span>
                      </div>

                      <p className="text-blue-400 mb-3">
                        🎭 {movie.Genre}
                      </p>

                      <p className="text-gray-400 leading-6">
                        {movie.Plot}
                      </p>
                    </>
                  )}

                </div>
              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  );
}

export default App;