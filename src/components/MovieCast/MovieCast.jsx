import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../movies-api";
import styles from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieActors, setMovieActors] = useState(null);

  useEffect(() => {
    async function getMovieCast() {
      try {
        const data = await fetchMovieCast(movieId);
        setMovieActors(data);
      } catch (error) {
        console.error("Error loading cast information: ", error);
      }
    }

    getMovieCast();
  }, [movieId]);

  return (
    <>
      {movieActors && (
        <ul>
          {movieActors.length === 0 ? (
            <p className={styles.messageNoActorsStyle}>
              Unfortunately, there are no actors in this movie.
            </p>
          ) : (
            movieActors.map((actor) => (
              <li className={styles.actorInfo} key={actor.id}>
                <img
                  className={styles.actorPhoto}
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt="photo of the actor"
                />
                <p className={styles.textInfo}>{actor.original_name}</p>
                <p className={styles.textInfo}>Character: {actor.character}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </>
  );
}
