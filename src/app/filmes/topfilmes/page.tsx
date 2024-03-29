import MovieList from "@/components/MovieList/MovieList";
import { movieList } from "@/services/TMDB/TMDB";

import type { Movies } from "./page.d";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "betterbox - TOP Filmes" };

export default async function TopFilmes() {
  const TMDB_AUTHORIZATION: string = process.env.TMDB_AUTHORIZATION;

  const movies: Movies = await movieList(
    TMDB_AUTHORIZATION,
    "top_rated",
    1,
    "pt-BR",
  );

  return (
    <section className="space-y-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold uppercase">Top filmes</h1>
        <p className="text-color-3">Filmes com as melhores avaliações.</p>
      </header>

      <MovieList
        authorization={TMDB_AUTHORIZATION}
        queryKey={"top_rated"}
        searchType={"top_rated"}
        initialData={movies}
      />
    </section>
  );
}
