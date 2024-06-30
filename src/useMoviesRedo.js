import { useState, useEffect } from "react";
const KEY = "20772893";

export function useMoviesRedo(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found kub");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.message === "Failed to fetch")
          setError("Internet connection went wrong");
        else if (err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    // setSelectedId(null);
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);
  return { isLoading, movies, error };
}
