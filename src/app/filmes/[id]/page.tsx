import { getMovieById } from "@/services/TMDB/TMDB";
import { Metadata } from "next";
import { getAllComments } from "@/services/Batterbox/Batterbox";
import MovieComments from "@/components/Movie/MovieComments/MovieComments";
import MovieInfos from "@/components/Movie/MovieInfos/MovieInfos";

import type { Comments } from "./page.d";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const TMDB_AUTHORIZATION: string = process.env.TMDB_AUTHORIZATION;
  const id: number = Number(params.id);

  const movie = await getMovieById(TMDB_AUTHORIZATION, id, "pt-BR");

  return { title: `betterbox - ${movie.title}` };
}

export default async function Movie({ params }: { params: { id: string } }) {
  const movieId: number = Number(params.id);
  const apiBaseURL: string = process.env.API_BASE_URL;

  const movieComments: Comments = await getAllComments({ movieId });

  return (
    <div className="m-auto max-w-3xl space-y-10">
      <MovieInfos movieId={movieId} />

      <MovieComments
        movieComments={movieComments}
        movieId={movieId}
        apiBaseURL={apiBaseURL}
      />
    </div>
  );
}
