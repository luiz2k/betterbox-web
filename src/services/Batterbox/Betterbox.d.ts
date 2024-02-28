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

export type ChangeUsername = {
  newUsername: string;
  accessToken?: string;
};

export type ChangeEmail = {
  email: string;
  password: string;
  newEmail: string;
  accessToken?: string;
};
export type ChangePassword = {
  email: string;
  password: string;
  newPassword: string;
  accessToken?: string;
};
