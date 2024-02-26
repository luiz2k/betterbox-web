import { Session, getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getAllMoviesListedByUser } from "@/services/Batterbox/Batterbox";

import MovieCard from "@/components/MovieCard/index";
import Link from "next/link";
import Button from "@/components/Button/Button";

import { GetAllMovies } from "./page.d";

export const metadata: Metadata = { title: "betterbox - Perfil" };

export default async function Profile() {
  const session: Session | null = await getServerSession(options);

  const watchedMovies: GetAllMovies = await getAllMoviesListedByUser(
    session?.user.id,
    session?.accessToken,
    "watchedMovies",
    1,
  );

  const favoriteMovies: GetAllMovies = await getAllMoviesListedByUser(
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

      <section className="space-y-2">
        <header>
          <h2 className="text-lg font-bold uppercase">Filmes assistidos</h2>
          <p className="text-color-3">Filmes que você assistiu</p>
        </header>

        {watchedMovies.data?.length ? (
          <>
            <div className="grid grid-cols-[repeat(5,148.8px)] gap-5 overflow-x-auto rounded bg-color-3/5 p-5">
              {watchedMovies.data?.slice(0, 5).map((movie) => (
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
              <Link href={"/perfil/assistidos"}>
                <Button theme="grayFill" textColor="white" uppercase>
                  Ver mais
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="grid justify-center gap-5 overflow-x-auto rounded bg-color-3/5 p-5">
            <p className="uppercase text-color-3">
              Você não possui nenhum filme na lista de assistidos.
            </p>
          </div>
        )}
      </section>

      <section className="space-y-2">
        <header>
          <h2 className="text-lg font-bold uppercase">Filmes favoritos</h2>
          <p className="text-color-3">Filmes que você favoritou</p>
        </header>

        {favoriteMovies.data?.length ? (
          <>
            <div className="grid grid-cols-[repeat(5,148.8px)] gap-5 overflow-x-auto rounded bg-color-3/5 p-5">
              {favoriteMovies.data?.slice(0, 5).map((movie) => (
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
              <Link href={"/perfil/favoritos"}>
                <Button theme="grayFill" textColor="white" uppercase>
                  Ver mais
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="grid justify-center gap-5 overflow-x-auto rounded bg-color-3/5 p-5">
            <p className="uppercase text-color-3">
              Você não possui nenhum filme favoritado.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}
