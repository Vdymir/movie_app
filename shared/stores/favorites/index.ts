import { MoviesDetails } from "@/shared/interfaces/movie_details.interface";
import { create } from "zustand";

interface FavoriteState {
  favorites: MoviesDetails[];
  addToFavorites: (movie: MoviesDetails) => void;
  removeToFavorite: (id: number) => void;
}

export const useFavoriteStore = create<FavoriteState>()((set) => ({
  favorites: [],
  addToFavorites: (movie) => {
    set((state) => ({ favorites: [...state.favorites, movie] }));
  },
  removeToFavorite: (id) => {
    set((state) => ({
      favorites: state.favorites.filter((movie) => movie.id !== id),
    }));
  },
}));
