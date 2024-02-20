import { notFound } from "next/navigation";

import type {
  FormattedMovie,
  GetMovieResponseData,
  MovieListResponseData,
  FormattedMovies,
  Options,
  Movies,
} from "./TMDS.d";

const apiBaseURL: string = "https://api.themoviedb.org/3";
const imgBaseURL: string = "https://image.tmdb.org/t/p";

const TMDB_AUTHORIZATION: string = process.env.NEXT_PUBLIC_TMDB_AUTHORIZATION;
const REVALIDATE_IN_ONE_HOUR: number = 3600;

const options: Options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_AUTHORIZATION}`,
  },
  next: { revalidate: REVALIDATE_IN_ONE_HOUR },
};

export const movieImage = (
  image: string,
  size: "original" | "w500" = "original",
): string => {
  try {
    if (!image) throw new Error("Rota da imagem não informada.");

    if (size !== "original" && size !== "w500")
      throw new Error("Tamanho da imagem inválido.");

    return `${imgBaseURL}/${size}${image}`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const movieList = async (
  searchType: "popular" | "top_rated" = "popular",
  page: number = 1,
  language: "pt-BR" | "en-US" = "pt-BR",
): Promise<Movies> => {
  try {
    if (searchType !== "popular" && searchType !== "top_rated")
      throw new Error("Tipo de busca inválido.");

    const response: Response = await fetch(
      `${apiBaseURL}/movie/${searchType}?language=${language}&page=${page}`,
      options,
    );

    if (!response.ok) throw new Error("Falha ao buscar os filmes.");

    const data: MovieListResponseData = await response.json();

    const formattedMovies: FormattedMovies[] = data.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path
          ? movieImage(movie.poster_path, "w500")
          : "/posterNotFound.svg",
        releaseDate: movie.release_date.split("-").reverse().join("/"),
        voteAverage: Number(movie.vote_average.toFixed(1)),
      };
    });

    return {
      currentPage: data.page,
      totalPages: data.total_pages,
      movies: formattedMovies,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchMovie = async (
  query: string,
  page: number = 1,
  language: "pt-BR" | "en-US" = "pt-BR",
): Promise<Movies> => {
  if (!query) throw new Error("Nenhuma busca informada.");

  const response: Response = await fetch(
    `${apiBaseURL}/search/movie?query=${query}&include_adult=false&language=${language}&page=${page}`,
    options,
  );

  if (!response.ok) notFound();

  const data: MovieListResponseData = await response.json();

  const formattedMovies: FormattedMovies[] = data.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path
        ? movieImage(movie.poster_path, "w500")
        : "/posterNotFound.svg",
      releaseDate: movie.release_date.split("-").reverse().join("/"),
      voteAverage: Number(movie.vote_average.toFixed(1)),
    };
  });

  return {
    currentPage: data.page,
    totalPages: data.total_pages,
    movies: formattedMovies,
  };
};

export const getMovieById = async (
  movieId: number,
  language: "pt-BR" | "en-US" = "pt-BR",
): Promise<FormattedMovie> => {
  try {
    if (!movieId) throw new Error("Nenhum id foi informado.");

    const response: Response = await fetch(
      `${apiBaseURL}/movie/${movieId}?language=${language}`,
      options,
    );

    if (!response.ok) notFound();

    const data: GetMovieResponseData = await response.json();

    const formattedMovie: FormattedMovie = {
      title: data.title,
      tagline: data.tagline || "Não encontrado",
      backgroundPath: data.backdrop_path
        ? movieImage(data.backdrop_path, "original")
        : "/backgroundNotFound.svg",
      posterPath: data.poster_path
        ? movieImage(data.poster_path, "w500")
        : "/posterNotFound.svg",
      releaseDate: data.release_date.split("-").reverse().join("/"),
      synopsis: data.overview || "Não encontrado",
      voteAverage: Number(data.vote_average.toFixed(1)),
      runtime: data.runtime
        ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
        : "Não encontrado",
      budget: data.budget
        ? data.budget.toLocaleString("pt-BR")
        : "Não encontrado",
      revenue: data.revenue
        ? data.revenue.toLocaleString("pt-BR")
        : "Não encontrado",
      genres: data.genres.length
        ? data.genres.map((genre) => genre.name).join(", ")
        : "Não encontrado",
    };

    return formattedMovie;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
