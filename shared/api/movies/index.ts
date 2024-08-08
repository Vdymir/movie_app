import { Fetch } from "../config";

type MoviesType = "now_playing" | "popular" | "top_rated" | "upcoming";

export async function getMovies(movieType: MoviesType = "top_rated") {
  try {
    const response = await Fetch(`movie/${movieType}`);
    return response;
  } catch (error) {
    return error;
  }
}
