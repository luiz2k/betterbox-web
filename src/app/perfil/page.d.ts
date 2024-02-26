export type GetAllMovies = {
  data?: {
    id: number;
    title: string;
    posterPath: string;
  }[];
  currentPage: number;
  totalPages: number;
  status: "success" | "error";
  message: string;
};
