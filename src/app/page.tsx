import { getMovieById, movieList } from "@/services/TMDB/TMDB";
import { Metadata } from "next";
import options from "./api/auth/[...nextauth]/options";
import { Session, getServerSession } from "next-auth";
import Carousel from "../components/Carousel/Carousel";

export const metadata: Metadata = { title: "betterbox - Início" };

import { GetMovie, PopularMovies, TopRatedMovies } from "./page.d";

export default async function Home() {
  const popularMovies: PopularMovies = await movieList("popular", 1, "pt-BR");
  const topRatedMovies: TopRatedMovies = await movieList(
    "top_rated",
    1,
    "pt-BR",
  );
  const getMovie: GetMovie = await getMovieById(13, "pt-BR");

  const session: Session | null = await getServerSession(options);

  return (
    <section className="space-y-10">
      <header
        style={{ backgroundImage: `url(${getMovie.backgroundPath})` }}
        className={`w-[1280px]')] relative h-[350px] rounded bg-cover bg-top bg-no-repeat`}
      >
        <article className="absolute bottom-0 flex w-full justify-center">
          {session ? (
            <div className="m-2 flex w-fit flex-col items-center justify-center gap-2 rounded p-5 text-center backdrop-blur-md">
              <h2 className="text-sm">
                Olá <strong>{session.user?.username}</strong>!
              </h2>
            </div>
          ) : (
            <div className="m-2 flex w-fit flex-col items-center justify-center gap-2 rounded p-5 text-center backdrop-blur-md">
              <h2 className="text-sm uppercase">
                Crie uma conta para gerenciar seus filmes.
              </h2>
            </div>
          )}
        </article>
      </header>

      <Carousel
        data={popularMovies.movies}
        title="Em alta"
        subtitle="Filmes mais assistidos no momento."
        href="/filmes/emalta"
      />

      <Carousel
        data={topRatedMovies.movies}
        title="Top filmes"
        subtitle="Filmes com as melhores avaliações."
        href="/filmes/topfilmes"
      />
    </section>
  );
}
