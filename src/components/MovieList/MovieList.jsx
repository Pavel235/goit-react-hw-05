import { NavLink, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";
import { trendingMovies } from "../../movies-api";
import { useEffect, useState } from "react";

export default function MovieList() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    async function getMovies() {
      try {
        const data = await trendingMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching trending movies: ", error);
      }
    }
    getMovies();
  }, []);

  return (
    <ul>
      {movies &&
        movies.map((movie) => (
          <li key={movie.id}>
            <NavLink
              className={styles.linkElement}
              to={`/movies/${movie.id}`}
              state={location}
            >
              {movie.original_title}
            </NavLink>
          </li>
        ))}
    </ul>
  );
}
