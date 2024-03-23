import { NavLink, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

export default function MovieList({ films }) {
  const location = useLocation();

  return (
    <ul>
      {films &&
        films.map((film) => (
          <li key={film.id}>
            <NavLink
              className={styles.linkElement}
              to={`/movies/${film.id}`}
              state={location}
            >
              {film.original_title}
            </NavLink>
          </li>
        ))}
    </ul>
  );
}
