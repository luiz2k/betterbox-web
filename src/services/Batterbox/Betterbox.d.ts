export type SignIn = { email: string; password: string };
export type SignUp = { username: string; email: string; password: string };

export type AddToWatched = { movieId: number };
export type RemoveFromWatched = { movieId: number };
export type GetMovieWatched = { movieId: number };

export type AddToFavorite = { movieId: number };
export type RemoveFromFavorite = { movieId: number };
export type GetFavoriteMovie = { movieId: number };

export type GetAllWatchedMovies = { userId: number; page?: number };

export type getAllWatchedMoviesData = {
  status: "success" | "error";
  message: string;
  data?: {
    movieId: number;
    watchedDate: string;
  }[];
};

export type GetAllFavoriteMovies = GetAllWatchedMovies;

export type GetAllFavoriteMoviesData = {
  status: "success" | "error";
  message: string;
  data?: {
    movieId: number;
  }[];
};

export type MoviesPromise = {
  id: number;
  title: string;
  posterPath: string;
  watchedDate: string;
};

export type FavoriteMoviesPromise = {
  id: number;
  title: string;
  posterPath: string;
};
