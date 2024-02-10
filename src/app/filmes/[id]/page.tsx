import { getMovieById } from "@/services/TMDB/TMDB";
import Image from "next/image";

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const id: number = params.id;

  const movie = await getMovieById(id, "pt-BR");

  return { title: `betterbox - ${movie.title}` };
}

export default async function Movie({ params }: { params: { id: number } }) {
  const id: number = params.id;
  const movie = await getMovieById(id, "pt-BR");

  return (
    <section className="m-auto max-w-3xl space-y-2">
      <header className="space-y-2">
        <Image
          src={movie.backgroundPath}
          alt={movie.title}
          width={768}
          height={432}
          className="rounded"
        />

        <div className="text-center">
          <h1 className="text-3xl">{movie.title}</h1>
          <p className="text-lg text-color-3">{movie.tagline}</p>
        </div>
      </header>

      <div>
        <h2 className="text-xl">Sinopse</h2>
        <p className="text-color-3">{movie.synopsis}</p>
      </div>

      <article>
        <div className="flex flex-wrap gap-2">
          <div>
            <h2>Lançamento</h2>
            <p className="text-color-3">{movie.releaseDate}</p>
          </div>

          <div>
            <h2>Duração</h2>
            <p className="text-color-3">{movie.runtime}</p>
          </div>

          <div>
            <h2>Generos</h2>
            <p className="text-color-3">{movie.genres}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <div>
            <h2>Orçamento</h2>
            <p className="text-color-3">{movie.budget}</p>
          </div>

          <div>
            <h2>Bilheteria</h2>
            <p className="text-color-3">{movie.revenue}</p>
          </div>
        </div>
      </article>
    </section>
  );
}
