import { useRef, useState } from "react";
import { getMovies } from "../../movies-api";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./MoviesPage.module.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MoviesPage() {
  const inputElement = useRef();
  const [moviesList, setMoviesList] = useState(null);
  const navigate = useNavigate();

  async function getListOfMovies(event) {
    event.preventDefault();

    if (inputElement.current.value.trim() === "") {
      toast.error("Please input your request!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    try {
      const nameOfMovie = inputElement.current.value;
      const data = await getMovies(nameOfMovie);
      setMoviesList(data);
      navigate(`?query=${nameOfMovie}`);

      if (data.length === 0) {
        toast.info("Unfortunately, there are no movies for this request!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error while searching for movies by keyword: ", error);
    } finally {
      inputElement.current.value = "";
    }
  }

  return (
    <>
      <form className={styles.formElement} onSubmit={getListOfMovies}>
        <input className={styles.inputItem} type="text" ref={inputElement} />
        <button className={styles.buttonElement} type="submit">
          Search
        </button>
      </form>

      <ToastContainer />

      <ul>
        {moviesList &&
          moviesList.map((movie) => (
            <li className={styles.listItem} key={movie.id}>
              <NavLink className={styles.linkElement} to={`${movie.id}`}>
                {movie.title}
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
}
