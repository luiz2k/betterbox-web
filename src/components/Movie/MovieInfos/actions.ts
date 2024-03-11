"use server";

import {
  addToFavorite,
  addToWatched,
  removeFromFavorite,
  removeFromWatched,
} from "@/services/Batterbox/Batterbox";

import { revalidateTag } from "next/cache";

export const handleWatched = async (
  status: string,
  movieId: number,
): Promise<void> => {
  if (status === "success") {
    console.log("teste");

    await removeFromWatched({ movieId });
    return revalidateTag("getMovieWatched");
  }

  await addToWatched({ movieId });
  return revalidateTag("getMovieWatched");
};

export const handleFavorite = async (
  status: string,
  movieId: number,
): Promise<void> => {
  if (status === "success") {
    await removeFromFavorite({ movieId });
    return revalidateTag("getFavoriteMovie");
  }

  await addToFavorite({ movieId });
  return revalidateTag("getFavoriteMovie");
};
