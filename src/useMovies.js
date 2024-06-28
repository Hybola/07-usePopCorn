import { useState, useEffect } from "react";

export function useMovies(query) {
  const KEY = "20772893";
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      //   callback?.();
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          // if (!res.ok)
          //   throw new Error("Something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False")
            throw new Error("Movie isn't found kub");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.message === "Failed to fetch")
            setError("Something went wrong");
          else if (err.name !== "AbortError") {
            //ไม่ต้องการสนใจ "AbortError"
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
      //   handleCloseMovie();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
