import { getMovieById } from "@/services/TMDB/TMDB";
import { Star } from "lucide-react";

import Image from "next/image";
import AddToWatchedAndFavorite from "./AddToWatchedAndFavorite";

export default async function MovieInfos({ movieId }: { movieId: number }) {
  const TMDB_AUTHORIZATION: string = process.env.TMDB_AUTHORIZATION;
  const movie = await getMovieById(TMDB_AUTHORIZATION, movieId);

  return (
    <section className="m-auto max-w-3xl space-y-2">
      <AddToWatchedAndFavorite movieId={movieId} />

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
