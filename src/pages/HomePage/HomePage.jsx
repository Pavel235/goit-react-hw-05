import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <div className={styles.listOfMovies}>
        <h2 className={styles.mainTopic}>Trending today</h2>
        <MovieList />
      </div>
    </>
  );
}
