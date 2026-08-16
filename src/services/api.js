export async function getMovie(movieName) {
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  console.log("OMDb key loaded:", !!API_KEY, "length:", API_KEY?.length);
  if (!API_KEY) {
    throw new Error("OMDb API key is missing");
  }

  const url =
    `https://www.omdbapi.com/?apikey=${API_KEY}` +
    `&t=${encodeURIComponent(movieName)}` +
    `&plot=full`;

  console.log("OMDb request:", movieName);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`OMDb HTTP error: ${response.status}`);
  }

  const data = await response.json();

  console.log("OMDb response:", data);

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }

  return data;
}