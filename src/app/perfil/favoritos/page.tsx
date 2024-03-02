import { getAllMoviesListedByUser } from "@/services/Batterbox/Batterbox";
import ProfileMovieList from "@/components/ProfileMovieList/ProfileMovieList";
import { Session, getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

export default async function Favorites() {
  const TMDB_AUTHORIZATION: string = process.env.TMDB_AUTHORIZATION;
  const session: Session | null = await getServerSession(options);

  const favoriteMovies = await getAllMoviesListedByUser(
    TMDB_AUTHORIZATION,
    session?.user.id,
    session?.accessToken,
    "favoriteMovies",
    1,
  );

  return (
    <section className="space-y-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold uppercase">Filmes favoritos</h1>
        <p className="text-lg text-color-3">
          Todos os filmes que você listou como favoritos
        </p>
      </header>

      <ProfileMovieList
        authorization={TMDB_AUTHORIZATION}
        userId={session?.user.id}
        accessToken={session?.accessToken}
        queryKey={"favoriteMovies"}
        searchType={"favoriteMovies"}
        initialData={favoriteMovies}
      />
    </section>
  );
}
