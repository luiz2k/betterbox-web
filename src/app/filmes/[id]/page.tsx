import { getMovieById } from "@/services/TMDB/TMDB";
import Image from "next/image";
import { Metadata } from "next";
import Button from "@/components/Button/Button";
import { EyeIcon, Heart, Star } from "lucide-react";
import { revalidateTag } from "next/cache";
import {
  addToFavorite,
  addToWatched,
  getFavoriteMovie,
  getMovieWatched,
  removeFromFavorite,
  removeFromWatched,
} from "@/services/Batterbox/Batterbox";
import type { Watched, Favorite } from "./page.d";
import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const TMDB_AUTHORIZATION: string = process.env.TMDB_AUTHORIZATION;
  const id: number = Number(params.id);

  const movie = await getMovieById(TMDB_AUTHORIZATION, id, "pt-BR");

  return { title: `betterbox - ${movie.title}` };
}

export default async function Movie({ params }: { params: { id: string } }) {
  const TMDB_AUTHORIZATION: string = process.env.TMDB_AUTHORIZATION;
  const id: number = Number(params.id);

  const session = await getServerSession(options);

  const movie = await getMovieById(TMDB_AUTHORIZATION, id, "pt-BR");

  const watched: Watched | null =
    session && (await getMovieWatched({ movieId: id }));
  const favorite: Favorite | null =
    session && (await getFavoriteMovie({ movieId: id }));

  const handleWatched = async (): Promise<void> => {
    "use server";

    if (watched?.status === "success") {
      await removeFromWatched({ movieId: id });
      return revalidateTag("getMovieWatched");
    }

    await addToWatched({ movieId: id });
    return revalidateTag("getMovieWatched");
  };

  const handleFavorite = async (): Promise<void> => {
    "use server";

    if (favorite?.status === "success") {
      await removeFromFavorite({ movieId: id });
      return revalidateTag("getFavoriteMovie");
    }

    await addToFavorite({ movieId: id });
    return revalidateTag("getFavoriteMovie");
  };

  return (
    <section className="m-auto max-w-3xl space-y-2">
      <article className="flex flex-wrap items-end justify-between gap-2">
        {watched?.data && (
          <div>
            <h2 className="text-lg font-bold">Assistido</h2>
            <p className="text-color-3">{watched?.data.watchedDate}</p>
          </div>
        )}

        {watched && (
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
        )}
      </article>

      <header className="space-y-2">
        <Image
          src={movie.backgroundPath}
          alt={movie.title}
          width={768}
          height={432}
          priority
          className="rounded"
        />

        <div className="text-center">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-lg text-color-3">{movie.tagline}</p>
        </div>
      </header>

      <article>
        <h2 className="text-lg font-bold">Sinopse</h2>
        <p className="text-color-3">{movie.synopsis}</p>
      </article>

      <article>
        <div className="flex flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-bold">Lançamento</h2>
            <p className="text-color-3">{movie.releaseDate}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold">Duração</h2>
            <p className="text-color-3">{movie.runtime}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold">Generos</h2>
            <p className="text-color-3">{movie.genres}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-bold">Orçamento</h2>
            <p className="text-color-3">{movie.budget}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold">Bilheteria</h2>
            <p className="text-color-3">{movie.revenue}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold">Avaliação</h2>
            <p className="flex items-center gap-1 text-color-3">
              <Star size={16} />
              {movie.voteAverage}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
