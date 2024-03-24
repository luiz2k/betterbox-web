import { createCommentSchema } from "@/validations/movieValidation";
import { z } from "zod";

export type MovieCommentsProps = {
  movieComments: {
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
  movieId: number;
  apiBaseURL: string;
};

export type CreateComment = z.infer<typeof createCommentSchema>;
