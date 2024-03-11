import options from "@/app/api/auth/[...nextauth]/options";
import Button from "@/components/Button/Button";
import {
  getFavoriteMovie,
  getMovieWatched,
} from "@/services/Batterbox/Batterbox";
import { getMovieById } from "@/services/TMDB/TMDB";
import { EyeIcon, Heart, Star } from "lucide-react";
import { getServerSession } from "next-auth";

import Image from "next/image";
import { handleFavorite, handleWatched } from "./actions";

type MovieInfosProps = {
  movieId: number;
};

export default async function MovieInfos({ movieId }: MovieInfosProps) {
  const TMDB_AUTHORIZATION: string = process.env.TMDB_AUTHORIZATION;

  const session = await getServerSession(options);

  const movie = await getMovieById(TMDB_AUTHORIZATION, movieId, "pt-BR");

  const watched = session && (await getMovieWatched({ movieId }));
  const favorite = session && (await getFavoriteMovie({ movieId }));

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
              <form
                action={async () => {
                  "use server";
                  await handleWatched(watched?.status, movieId);
                }}
              >
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
                <form
                  action={async () => {
                    "use server";
                    await handleWatched(watched?.status, movieId);
                  }}
                >
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
              <form
                action={async () => {
                  "use server";
                  await handleFavorite(favorite?.status, movieId);
                }}
              >
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
              <form
                action={async () => {
                  "use server";
                  await handleFavorite(favorite?.status, movieId);
                }}
              >
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
