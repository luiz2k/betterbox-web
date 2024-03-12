import Button from "@/components/Button/Button";
import { EyeIcon, Heart } from "lucide-react";
import { Session, getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

import {
  addToFavorite,
  addToWatched,
  getFavoriteMovie,
  getMovieWatched,
  removeFromFavorite,
  removeFromWatched,
} from "@/services/Batterbox/Batterbox";

import type { Favorite, Watched } from "./AddToWatchedAndFavorite.d";
import { revalidateTag } from "next/cache";

const AddToWatchedAndFavorite = async ({ movieId }: { movieId: number }) => {
  const session: Session | null = await getServerSession(options);

  const watched: Watched = await getMovieWatched({ movieId });
  const favorite: Favorite = await getFavoriteMovie({ movieId });

  const handleWatched = async (): Promise<void> => {
    "use server";

    if (watched.status === "success") {
      await removeFromWatched({ movieId });
      return revalidateTag("getMovieWatched");
    }

    await addToWatched({ movieId });
    return revalidateTag("getMovieWatched");
  };

  const handleFavorite = async (): Promise<void> => {
    "use server";

    if (favorite.status === "success") {
      await removeFromFavorite({ movieId });
      return revalidateTag("getFavoriteMovie");
    }

    await addToFavorite({ movieId });
    return revalidateTag("getFavoriteMovie");
  };

  return (
    <>
      {session && (
        <article className="flex flex-wrap items-end justify-between gap-2">
          {watched?.data && (
            <div>
              <h2 className="text-lg font-bold">Assistido</h2>
              <p className="text-color-3">{watched?.data.watchedDate}</p>
            </div>
          )}

          <div className="flex gap-2">
            {watched?.status === "error" ? (
              <form action={handleWatched}>
                <Button
                  leftIcon={<EyeIcon />}
                  theme="grayFill"
                  textColor="white"
                  type="submit"
                >
                  Assistido
                </Button>
              </form>
            ) : (
              <>
                <form action={handleWatched}>
                  <Button
                    leftIcon={<EyeIcon />}
                    theme="grayFill"
                    textColor="white"
                    type="submit"
                  >
                    Remover
                  </Button>
                </form>
              </>
            )}

            {favorite?.status === "error" ? (
              <form action={handleFavorite}>
                <Button
                  leftIcon={<Heart />}
                  theme="grayFill"
                  textColor="white"
                  type="submit"
                >
                  Favoritar
                </Button>
              </form>
            ) : (
              <form action={handleFavorite}>
                <Button
                  leftIcon={<Heart />}
                  theme="grayFill"
                  textColor="white"
                  type="submit"
                >
                  Remover
                </Button>
              </form>
            )}
          </div>
        </article>
      )}
    </>
  );
};

export default AddToWatchedAndFavorite;
