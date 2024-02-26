export type ProfileMovieListProps = {
  userId: number | undefined;
  accessToken: string | undefined;
  queryKey: string;
  searchType: "watchedMovies" | "favoriteMovies";
  initialData: {
    currentPage: number;
    totalPages: number;
    status: "success" | "error";
    message: string;
    data?: {
      id: number;
      title: string;
      posterPath: string;
      watchedDate?: string;
    }[];
  };
};

export type Movies = {
  currentPage: number;
  totalPages: number;
  status: "success" | "error";
  message: string;
  data?: {
    id: number;
    title: string;
    posterPath: string;
  }[];
};
