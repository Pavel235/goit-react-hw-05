import axios from "axios";

const getMovies = async (movieId) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${movieId}`;
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDk3YjUyOTI1MDhmMGU3MmM2OWU0MDllYjI1MWI0MCIsInN1YiI6IjY1ZjIwZjY2ZWVhMzRkMDE4ODE0YjZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I68rPBzg-DEMFukpsPO9Ovw0GR3F3DX96j0s7tdqRoI",
    },
    query: movieId,
    api_key: "ad97b5292508f0e72c69e409eb251b40",
  };
  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getMovies;
