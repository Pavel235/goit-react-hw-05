import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { trendingMovies } from "../../movies-api";

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
      <div className={styles.listOfMovies}>
        <h2 className={styles.mainTopic}>Trending today</h2>
        <MovieList films={movies} />
      </div>
    </>
  );
}
