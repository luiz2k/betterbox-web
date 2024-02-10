export type Options = {
  method: string;
  headers: { accept: string; Authorization: string };
  next: { revalidate: number };
};

export type MovieListResponseData = {
  page: number;
  total_pages: number;
  results: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  }[];
};

export type Movies = {
  currentPage: number;
  totalPages: number;
  movies: {
    id: number;
    title: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
  }[];
};

export type FormattedMovies = {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
};

export type GetMovieResponseData = {
  title: string;
  tagline: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
  runtime: number;
  budget: number;
  revenue: number;
  genres: { name: string }[];
};

export type FormattedMovie = {
  title: string;
  tagline: string;
  backgroundPath: string;
  releaseDate: string;
  synopsis: string;
  voteAverage: number;
  runtime: string;
  budget: string;
  revenue: string;
  genres: string;
};
