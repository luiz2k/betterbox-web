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
  apiURL: string;
  newUsername: string;
  accessToken?: string;
};

export type ChangeEmail = {
  apiURL: string;
  email: string;
  password: string;
  newEmail: string;
  accessToken?: string;
};
export type ChangePassword = {
  apiURL: string;
  email: string;
  password: string;
  newPassword: string;
  accessToken?: string;
};

export type CreateComment = {
  movieId: number;
  comment: string;
  apiBaseURL: string;
};

export type GetAllComments = {
  movieId: number;
};

export type GetAllCommentsData = {
  status: "success" | "error";
  message: string;
  data: {
    comment: string;
    commentedAt: string;
    editedAt: string | null;
    user: {
      id: number;
      username: string;
      picture: string | null;
    };
  }[];
};

export type DeleteComment = {
  movieId: number;
  apiBaseURL: string;
};

export type ChangePicture = {
  form: FormData;
  apiBaseURL: string;
};

export type GetPicture = {
  apiBaseURL: string;
};

export type GetPictureById = {
  apiBaseURL: string;
  userId: number;
};

export type DeletePicture = {
  apiBaseURL: string;
};
