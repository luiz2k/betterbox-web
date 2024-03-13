import { Session, getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getAllMoviesListedByUser } from "@/services/Batterbox/Batterbox";

import { GetAllMovies } from "./page.d";
import MovieCard from "@/components/MovieCard";
import Button from "@/components/Button/Button";
import Link from "next/link";

export const metadata: Metadata = { title: "betterbox - Perfil" };

export default async function Profile() {
  const TMDB_AUTHORIZATION: string = process.env.TMDB_AUTHORIZATION;
  const apiBaseURL: string = process.env.API_BASE_URL;

  const session: Session | null = await getServerSession(options);

  const watchedMovies: GetAllMovies = await getAllMoviesListedByUser(
    apiBaseURL,
    TMDB_AUTHORIZATION,
    session?.user.id,
    session?.accessToken,
    "watchedMovies",
    1,
  );

  const favoriteMovies: GetAllMovies = await getAllMoviesListedByUser(
    apiBaseURL,
    TMDB_AUTHORIZATION,
    session?.user.id,
    session?.accessToken,
    "favoriteMovies",
    1,
  );

  return (
    <section className="space-y-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold uppercase">Seu perfil</h1>
        {session && (
          <p className="text-lg text-color-3">Olá {session.user?.username}</p>
        )}
      </header>

      {watchedMovies.data?.length ? (
        <section className="space-y-2">
          <header>
            <h2 className="text-lg font-bold uppercase">Filmes assistidos</h2>
            <p className="text-color-3">Filmes que você assistiu</p>
          </header>

          <section className="flex gap-5 overflow-hidden rounded bg-color-3/10 p-2">
            {watchedMovies.data.slice(0, 9).map((movie) => (
              <MovieCard.Root key={movie.id} id={movie.id} title={movie.title}>
                <MovieCard.Image
                  posterPath={movie.posterPath}
                  alt={movie.title}
                />
              </MovieCard.Root>
            ))}
          </section>

          <div className="flex justify-end pb-2">
            <Link href={"/perfil/assistidos"} className="flex justify-center">
              <Button theme="grayFill" textColor="white" uppercase>
                Ver mais
              </Button>
            </Link>
          </div>
        </section>
      ) : (
        <section className="space-y-2">
          <header>
            <h2 className="text-lg font-bold uppercase">Filmes assistidos</h2>
            <p className="text-color-3">Filmes que você assistiu</p>
          </header>

          <div className="grid justify-center gap-5 overflow-x-auto rounded bg-color-3/10 p-5">
            <p className="uppercase text-color-3">
              Você não possui nenhum filme na lista de assistidos.
            </p>
          </div>
        </section>
      )}

      {favoriteMovies.data?.length ? (
        <section className="space-y-2">
          <header>
            <h2 className="text-lg font-bold uppercase">Filmes favoritos</h2>
            <p className="text-color-3">Filmes que você favoritou</p>
          </header>

          <section className="flex gap-5 overflow-hidden rounded bg-color-3/10 p-2">
            {favoriteMovies.data.slice(0, 9).map((movie) => (
              <MovieCard.Root key={movie.id} id={movie.id} title={movie.title}>
                <MovieCard.Image
                  posterPath={movie.posterPath}
                  alt={movie.title}
                />
              </MovieCard.Root>
            ))}
          </section>

          <div className="flex justify-end py-2">
            <Link href={"/perfil/favoritos"} className="flex justify-center">
              <Button theme="grayFill" textColor="white" uppercase>
                Ver mais
              </Button>
            </Link>
          </div>
        </section>
      ) : (
        <section className="space-y-2">
          <header>
            <h2 className="text-lg font-bold uppercase">Filmes favoritos</h2>
            <p className="text-color-3">Filmes que você favoritou</p>
          </header>

          <div className="grid justify-center gap-5 overflow-x-auto rounded bg-color-3/10 p-5">
            <p className="uppercase text-color-3">
              Você não possui nenhum filme na lista de favoritos.
            </p>
          </div>
        </section>
      )}
    </section>
  );
}
