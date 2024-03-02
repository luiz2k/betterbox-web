import MovieList from "@/components/MovieList/MovieList";
import { movieList } from "@/services/TMDB/TMDB";

import type { Movies } from "./page.d";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "betterbox - Em Alta" };

export default async function EmAlta() {
  const TMBD_AUTHORIZATION: string = process.env.TMDB_AUTHORIZATION;

  const movies: Movies = await movieList(
    TMBD_AUTHORIZATION,
    "popular",
    1,
    "pt-BR",
  );

  return (
    <section className="space-y-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold uppercase">Em alta</h1>
        <p className="text-color-3">Filmes mais assistidos no momento.</p>
      </header>

      <MovieList
        authorization={TMBD_AUTHORIZATION}
        queryKey={"popular"}
        searchType={"popular"}
        initialData={movies}
      />
    </section>
  );
}
