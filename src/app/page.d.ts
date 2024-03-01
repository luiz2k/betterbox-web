export type PopularMovies = {
  movies: {
    id: number;
    title: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
  }[];
};

export type TopRatedMovies = {
  movies: {
    id: number;
    title: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
  }[];
};

export type GetMovie = {
  backgroundPath: string;
};
