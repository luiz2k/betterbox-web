export type Watched = {
  status: "success" | "error";
  message: string;
  data?: { watchedDate: string };
};

export type Favorite = {
  status: "success" | "error";
  message: string;
};

export type Comments = {
  status: "success" | "error";
  message: string;
  data: {
    commentedAt: string;
    editedAt: string | null;
    comment: string;
    user: {
      id: number;
      username: string;
    };
  }[];
};
