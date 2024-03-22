import { useEffect, useState } from "react";
import { trendingMovies } from "../../movies-api";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        const data = await trendingMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching trending movies: ", error);
      } finally {
        setIsLoading(true);
      }
    }
    getMovies();
  }, []);

  return (
    <>
      {isLoading && (
        <div className={styles.listOfMovies}>
          <h2 className={styles.mainTopic}>Trending today</h2>
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
        </div>
      )}
    </>
  );
}
