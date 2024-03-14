import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../movies-api";
import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieComments, setMovieComments] = useState(null);

  useEffect(() => {
    async function getMovieReviews() {
      try {
        const data = await fetchMovieReviews(movieId);
        setMovieComments(data);
      } catch (error) {
        console.error("Error loading user comments about the movie: ", error);
      }
    }

    getMovieReviews();
  }, [movieId]);

  return (
    <>
      {movieComments && (
        <ul>
          {movieComments.length === 0 ? (
            <p className={styles.messageNoReviewsStyle}>
              Unfortunately, we do not have any reviews for this movie.
            </p>
          ) : (
            movieComments.map((comment) => (
              <li key={comment.id}>
                <p className={styles.authorInfo}>Author: {comment.author}</p>
                <p className={styles.commentElement}>{comment.content}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </>
  );
}
