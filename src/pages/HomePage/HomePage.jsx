import { useEffect, useState } from "react";
import { trendingMovies } from "../../movies-api";
import { NavLink } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
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
    <>
      <h2>Trending today</h2>
      <ul>
        {movies &&
          movies.map((movie) => (
            <li key={movie.id}>
              <NavLink
                className={styles.linkElement}
                to={`/movies/${movie.id}`}
              >
                {movie.original_title}
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
}
