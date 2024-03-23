"use client";

import { createComment, deleteComment } from "@/services/Batterbox/Batterbox";
import { createCommentSchema } from "@/validations/movieValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import type { CreateComment, MovieCommentsProps } from "./MovieComment.d";

const useMovieComments = ({
  movieId,
  apiBaseURL,
  movieComments,
}: MovieCommentsProps) => {
  const { data: session } = useSession();

  const router = useRouter();

  const commented = movieComments.data.find(
    (comment) => comment.user.id === session?.user.id,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateComment>({
    resolver: zodResolver(createCommentSchema),
  });

  const handleFormSubmit = async (data: CreateComment) => {
    try {
      await createComment({
        ...data,
        movieId,
        apiBaseURL,
      });

      reset();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (movieId: number) => {
    try {
      await deleteComment({ movieId, apiBaseURL });

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    register,
    handleFormSubmit,
    handleDeleteComment,
    handleSubmit,
    session,
    errors,
    commented,
  };
};

export default useMovieComments;
