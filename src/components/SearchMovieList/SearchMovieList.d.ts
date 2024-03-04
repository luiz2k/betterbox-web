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

export type MovieListProps = {
  authorization: string;
  queryKey: string;
  query: string;
  initialData: Movies;
};
