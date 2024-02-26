export type SignIn = { email: string; password: string };
export type SignUp = { username: string; email: string; password: string };

export type MovieId = { movieId: number };

export type GetAllMoviesData = {
  currentPage: number;
  totalPages: number;
  status: "success" | "error";
  message: string;
  data?: {
    userId: number;
    movieId: number;
    watchedDate?: Date;
  }[];
};

export type MoviesPromise = {
  id: number;
  title: string;
  posterPath: string;
};
