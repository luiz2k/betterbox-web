export type MoviesWatched = {
  status: "success" | "error";
  message: string;
  data?: {
    id: number;
    title: string;
    posterPath: string;
    watchedDate: string;
  }[];
};
