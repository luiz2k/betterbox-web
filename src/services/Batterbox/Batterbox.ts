import { getServerSession } from "next-auth";
import optionsAuth from "@/app/api/auth/[...nextauth]/options";

import {
  SignIn,
  SignUp,
  GetAllMoviesData,
  MoviesPromise,
  MovieId,
  ChangeUsername,
  ChangeEmail,
  ChangePassword,
  CreateComment,
  GetAllComments,
  GetAllCommentsData,
  DeleteComment,
} from "./Betterbox";

import { getMovieById } from "../TMDB/TMDB";
import { getSession } from "next-auth/react";

const apiBaseURL: string = process.env.API_BASE_URL;

export const signIn = async (data: SignIn) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/auth/signIn`,
      options,
    );

    if (response.status !== 200) throw new Error("Email ou senha inválido.");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signUp = async (data: SignUp) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/auth/signUp`,
      options,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signOut = () => {};

export const refreshToken = async (refreshToken: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/auth/refreshToken`,
      options,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByAccessToken = async (accessToken: string) => {
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/user/getUserById`,
      options,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changeUsername = async (data: ChangeUsername) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data?.accessToken}`,
    },
    body: JSON.stringify({ newUsername: data.newUsername }),
  };

  const apiURL: string = data.apiURL;

  try {
    const response: Response = await fetch(
      `${apiURL}/user/changeUsername`,
      options,
    );

    if (!response.ok) throw new Error();

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const changeEmail = async (data: ChangeEmail) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.accessToken}`,
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      newEmail: data.newEmail,
    }),
  };

  const apiURL: string = data.apiURL;

  try {
    const response: Response = await fetch(
      `${apiURL}/user/changeEmail`,
      options,
    );

    if (!response.ok) throw new Error();

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const changePassword = async (data: ChangePassword) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.accessToken}`,
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      newPassword: data.newPassword,
    }),
  };

  const apiURL: string = data.apiURL;

  try {
    const response: Response = await fetch(
      `${apiURL}/user/changePassword`,
      options,
    );

    if (!response.ok) throw new Error();

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const addToWatched = async (data: MovieId) => {
  const session = await getServerSession(optionsAuth);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/movie/addToWatched`,
      options,
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeFromWatched = async (data: MovieId) => {
  const session = await getServerSession(optionsAuth);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/movie/removeFromWatched`,
      options,
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovieWatched = async (data: MovieId) => {
  const session = await getServerSession(optionsAuth);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(data),
    next: { tags: ["getMovieWatched"] },
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/movie/getMovieWatched`,
      options,
    );

    const data = await response.json();

    if (data.data) {
      const dateOptions = { timeZone: "America/Sao_Paulo" };

      const fullDate: Date = new Date(data.data.watchedDate);

      const date: string = fullDate.toLocaleDateString("pt-BR", dateOptions);
      const time: string = fullDate.toLocaleTimeString("pt-BR", dateOptions);

      return {
        ...data,
        data: {
          watchedDate: `${date} às ${time}`,
        },
      };
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addToFavorite = async (data: MovieId) => {
  const session = await getServerSession(optionsAuth);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/movie/addToFavorite`,
      options,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeFromFavorite = async (data: MovieId) => {
  const session = await getServerSession(optionsAuth);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/movie/removeFromFavorite`,
      options,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFavoriteMovie = async (data: MovieId) => {
  const session = await getServerSession(optionsAuth);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(data),
    next: { tags: ["getFavoriteMovie"] },
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/movie/getFavoriteMovie`,
      options,
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllMoviesListedByUser = async (
  baseURL: string,
  authorization: string,
  userId: number | undefined,
  accessToken: string | undefined,
  searchType: "watchedMovies" | "favoriteMovies" = "watchedMovies",
  page: number = 1,
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ userId: userId }),
  };

  try {
    const response = await fetch(
      `${baseURL}/user/getAll${searchType}?page=${page}`,
      options,
    );

    const data: GetAllMoviesData = await response.json();

    if (data.data) {
      const moviesPromise: Promise<MoviesPromise>[] = data.data.map(
        async (movie) => {
          const getMovie = await getMovieById(
            authorization,
            movie.movieId,
            "pt-BR",
          );

          return {
            id: movie.movieId,
            title: getMovie.title,
            posterPath: getMovie.posterPath,
          };
        },
      );

      const movies: MoviesPromise[] = await Promise.all(moviesPromise);

      return {
        ...data,
        data: movies,
      };
    }

    return {
      ...data,
      data: undefined,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllComments = async (
  data: GetAllComments,
): Promise<GetAllCommentsData> => {
  const session = await getServerSession(optionsAuth);

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    next: { tags: ["getAllComments"] },
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/movie/getAllComments`,
      options,
    );

    const data: GetAllCommentsData = await response.json();

    const formattedComments = data.data.map((item) => {
      return {
        ...item,
        commentedAt: new Date(item.commentedAt).toLocaleDateString("pt-BR"),
        editedAt:
          item.editedAt && new Date(item.editedAt).toLocaleDateString("pt-BR"),
      };
    });

    return {
      status: data.status,
      message: data.message,
      data: formattedComments,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createComment = async (data: CreateComment) => {
  const session = await getSession();
  const apiURL = data.apiBaseURL;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ movieId: data.movieId, comment: data.comment }),
    next: { tags: ["getAllComments"] },
  };

  try {
    const response: Response = await fetch(
      `${apiURL}/movie/createComment`,
      options,
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteComment = async (data: DeleteComment) => {
  const session = await getSession();
  const apiURL = data.apiBaseURL;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ movieId: data.movieId }),
    next: { tags: ["deleteComment"] },
  };

  try {
    const response: Response = await fetch(
      `${apiURL}/movie/deleteComment`,
      options,
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
