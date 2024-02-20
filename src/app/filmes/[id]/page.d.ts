export type Watched = {
  status: "success" | "error";
  message: string;
  data?: { watchedDate: string };
};

export type Favorite = {
  status: "success" | "error";
  message: string;
};
