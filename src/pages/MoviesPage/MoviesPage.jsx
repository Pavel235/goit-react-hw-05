import { useEffect, useRef, useState } from "react";
import { getMovies } from "../../movies-api";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import styles from "./MoviesPage.module.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";

export default function MoviesPage() {
  const inputElement = useRef();
  const [moviesList, setMoviesList] = useState(null);
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const value = params.get("query") ?? "";
  const [isLoading, setIsLoading] = useState(false);

  function getListOfMovies(event) {
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

    setParams({ query: inputValue });

    setInputValue("");
  }

  useEffect(() => {
    async function getInputValue() {
      setIsLoading(true);

      try {
        const data = await getMovies(value);
        setMoviesList(data);

        if (data.length === 0 && moviesList !== null) {
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
        console.error("Error while searching for movies:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getInputValue();
  }, [value]);

  return (
    <>
      <div>
        <form className={styles.formElement} onSubmit={getListOfMovies}>
          <input
            className={styles.inputItem}
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            ref={inputElement}
          />
          <button className={styles.buttonElement} type="submit">
            Search
          </button>
        </form>

        <ToastContainer />

        {isLoading && (
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

        <ul>
          {moviesList &&
            !isLoading &&
            moviesList.map((movie) => (
              <li className={styles.listItem} key={movie.id}>
                <NavLink
                  className={styles.linkElement}
                  to={`${movie.id}`}
                  state={location}
                >
                  {movie.title}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
