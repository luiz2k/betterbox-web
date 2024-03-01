import { Session, getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getAllMoviesListedByUser } from "@/services/Batterbox/Batterbox";

import { GetAllMovies } from "./page.d";
import Carousel from "@/components/Carousel/Carousel";

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

      {watchedMovies.data?.length ? (
        <Carousel
          data={watchedMovies.data}
          title="Filmes assistidos"
          subtitle="Filmes que você assistiu"
          href="/perfil/assistidos"
        />
      ) : (
        <section>
          <header>
            <h2 className="text-lg font-bold uppercase">Filmes favoritos</h2>
            <p className="text-color-3">Filmes que você assistiu</p>
          </header>

          <div className="grid justify-center gap-5 overflow-x-auto rounded bg-color-3/5 p-5">
            <p className="uppercase text-color-3">
              Você não possui nenhum filme na lista de assistidos.
            </p>
          </div>
        </section>
      )}

      {favoriteMovies.data?.length ? (
        <Carousel
          data={favoriteMovies.data}
          title="Filmes favoritados"
          subtitle="Filmes que você favoritou"
          href="/perfil/favoritos"
        />
      ) : (
        <section>
          <header>
            <h2 className="text-lg font-bold uppercase">Filmes favoritos</h2>
            <p className="text-color-3">Filmes que você favoritou</p>
          </header>

          <div className="grid justify-center gap-5 overflow-x-auto rounded bg-color-3/5 p-5">
            <p className="uppercase text-color-3">
              Você não possui nenhum filme na lista de favoritos.
            </p>
          </div>
        </section>
      )}
    </section>
  );
}
