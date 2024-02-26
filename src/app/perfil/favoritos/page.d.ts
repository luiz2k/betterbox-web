export type FavoriteMovies = {
  status: "success" | "error";
  message: string;
  data?: {
    id: number;
    title: string;
    posterPath: string;
  }[];
};
