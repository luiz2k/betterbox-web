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
