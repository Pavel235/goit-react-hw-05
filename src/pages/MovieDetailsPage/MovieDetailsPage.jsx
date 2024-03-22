import { Suspense, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { movieDetails } from "../../movies-api";
import styles from "./MovieDetailsPage.module.css";
import { ColorRing } from "react-loader-spinner";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [yearOfRelease, setYearOfRelease] = useState(0);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const data = await movieDetails(movieId);
        setMovieInfo(data);
        setYearOfRelease(new Date(data.release_date).getFullYear());
      } catch (error) {
        console.error("Error fetching movie information by id: ", error);
      }
    }
    getMovieDetails();
  }, [movieId]);

  return (
    <>
      {!movieInfo && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
      {movieInfo && yearOfRelease && (
        <div>
          <NavLink className={styles.backButton} to={backLinkRef.current}>
            Go back
          </NavLink>
          <div className={styles.movieWrapper}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieInfo.backdrop_path}`}
              alt="movie photo"
              className={styles.imgElement}
            />
            <div className={styles.infoBox}>
              <h2>
                {movieInfo.original_title} ({yearOfRelease})
              </h2>
              <p>User score: {Math.floor(movieInfo.vote_average * 10) / 10}</p>
              <h3>Overview</h3>
              <p className={styles.overview}>{movieInfo.overview}</p>
              <h4>Genres</h4>
              <ul className={styles.genresList}>
                {movieInfo.genres.map((genre) => (
                  <li className={styles.genreElement} key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className={styles.filmInfo}>Additional information</p>
          <ul>
            <li className={styles.listElement}>
              <NavLink className={styles.listItem} to="cast">
                Cast
              </NavLink>
            </li>
            <li className={styles.listElement}>
              <NavLink className={styles.listItem} to="reviews">
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      <Suspense
        fallback={
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
}
