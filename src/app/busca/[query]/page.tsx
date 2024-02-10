import SearchMovieList from "@/components/SearchMovieList/SearchMovieList";
import { searchMovie } from "@/services/TMDB/TMDB";

import type { Movies } from "@/services/TMDB/TMDS";
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

export default async function page({ params }: { params: { query: string } }) {
  const query: string = params.query;
  const decodedURI: string = decodeURIComponent(query);

  const movies: Movies = await searchMovie(query, 1, "pt-BR");

  return (
    <section className="space-y-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold uppercase">BUSCA</h1>
        <p className="text-color-3">
          Resulados para: {decodedURI.toUpperCase()}
        </p>
      </header>

      <SearchMovieList queryKey={"search"} query={query} initialData={movies} />
    </section>
  );
}
