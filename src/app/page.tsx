import Button from "@/components/Button/Button";
import MovieCard from "@/components/MovieCard";
import { getMovieById, movieList } from "@/services/TMDB/TMDB";
import Link from "next/link";
import { Metadata } from "next";
import options from "./api/auth/[...nextauth]/options";
import { Session, getServerSession } from "next-auth";

export const metadata: Metadata = { title: "betterbox - Início" };

export default async function Home() {
  const popularMovies = await movieList("popular", 1, "pt-BR");
  const topRatedMovies = await movieList("top_rated", 1, "pt-BR");
  const getMovie = await getMovieById(13, "pt-BR");

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

      <section className="space-y-2">
        <header>
          <h2 className="text-lg font-bold uppercase">Em alta</h2>
          <p className="text-color-3">Filmes mais assistidos no momento.</p>
        </header>

        {popularMovies && (
          <div className="space-y-2">
            <div className="flex gap-5 overflow-x-auto rounded bg-color-3/5 p-5">
              {popularMovies.movies?.slice(0, 6).map((movie) => (
                <MovieCard.Root
                  title={movie.title}
                  id={movie.id}
                  key={movie.id}
                >
                  <MovieCard.Image
                    posterPath={movie.posterPath}
                    alt={movie.title}
                  />
                  <MovieCard.Infos>
                    <MovieCard.Title title={movie.title} />
                  </MovieCard.Infos>
                </MovieCard.Root>
              ))}
            </div>

            <div className="flex justify-end">
              <Link href={"/filmes/emalta"}>
                <Button theme="grayFill" textColor="white" uppercase>
                  Ver mais
                </Button>
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-2">
        <header>
          <h2 className="text-lg font-bold uppercase">Top filmes</h2>
          <p className="text-color-3">Filmes com as melhores avaliações.</p>
        </header>

        {topRatedMovies && (
          <div className="space-y-2">
            <div className="flex gap-5 overflow-x-auto rounded bg-color-3/5 p-5">
              {topRatedMovies.movies?.slice(0, 6).map((movie) => (
                <MovieCard.Root
                  title={movie.title}
                  id={movie.id}
                  key={movie.id}
                >
                  <MovieCard.Image
                    posterPath={movie.posterPath}
                    alt={movie.title}
                  />
                  <MovieCard.Infos>
                    <MovieCard.Title title={movie.title} />
                  </MovieCard.Infos>
                </MovieCard.Root>
              ))}
            </div>

            <div className="flex justify-end">
              <Link href={"/filmes/topfilmes"}>
                <Button theme="grayFill" textColor="white" uppercase>
                  Ver mais
                </Button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </section>
  );
}
