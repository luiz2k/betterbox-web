import SearchMovieList from "@/components/SearchMovieList/SearchMovieList";
import { searchMovie } from "@/services/TMDB/TMDB";

import type { Movies } from "./page.d";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { query: string };
}): Promise<Metadata> {
  const query: string = params.query;
  const decodedURI: string = decodeURIComponent(query);

  return { title: `betterbox - ${decodedURI}` };
}

export default async function Busca({ params }: { params: { query: string } }) {
  const query: string = params.query;
  const decodedURI: string = decodeURIComponent(query);
  const TMDB_AUTHORIZATION: string = process.env.TMDB_AUTHORIZATION;

  const movies: Movies = await searchMovie(
    TMDB_AUTHORIZATION,
    query,
    1,
    "pt-BR",
  );

  return (
    <section className="space-y-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold uppercase">BUSCA</h1>
        <p className="text-color-3">
          Resulados para: {decodedURI.toUpperCase()}
        </p>
      </header>

      <SearchMovieList
        authorization={TMDB_AUTHORIZATION}
        queryKey={"search"}
        query={query}
        initialData={movies}
      />
    </section>
  );
}
