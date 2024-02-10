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
  queryKey: string;
  searchType: "popular" | "top_rated";
  initialData: Movies;
};
