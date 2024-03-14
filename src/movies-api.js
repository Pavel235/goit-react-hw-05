import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "ad97b5292508f0e72c69e409eb251b40";

export async function getMovies(movieId) {
  const url = `${BASE_URL}/search/movie?query=${movieId}`;
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDk3YjUyOTI1MDhmMGU3MmM2OWU0MDllYjI1MWI0MCIsInN1YiI6IjY1ZjIwZjY2ZWVhMzRkMDE4ODE0YjZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I68rPBzg-DEMFukpsPO9Ovw0GR3F3DX96j0s7tdqRoI",
    },
    query: movieId,
    api_key: API_KEY,
  };
  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies by keyword :", error);
    return [];
  }
}

export async function trendingMovies() {
  const url = `${BASE_URL}/trending/movie/day`;
  const params = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDk3YjUyOTI1MDhmMGU3MmM2OWU0MDllYjI1MWI0MCIsInN1YiI6IjY1ZjIwZjY2ZWVhMzRkMDE4ODE0YjZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I68rPBzg-DEMFukpsPO9Ovw0GR3F3DX96j0s7tdqRoI",
    },
    api_key: API_KEY,
  };

  try {
    const response = await axios.get(url, params);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies: ", error);
    return [];
  }
}

export async function movieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}`;
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDk3YjUyOTI1MDhmMGU3MmM2OWU0MDllYjI1MWI0MCIsInN1YiI6IjY1ZjIwZjY2ZWVhMzRkMDE4ODE0YjZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I68rPBzg-DEMFukpsPO9Ovw0GR3F3DX96j0s7tdqRoI",
    },
    api_key: API_KEY,
  };
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details by id: ", error);
    return [];
  }
}
