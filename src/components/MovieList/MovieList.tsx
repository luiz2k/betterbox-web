"use client";

import Button from "../Button/Button";
import MovieCard from "../MovieCard/MovieCard";

import useMovieList from "./useMovieList";

import { Loader } from "lucide-react";

import { type MovieListProps } from "./MovieList.d";

const MovieList = ({ queryKey, searchType, initialData }: MovieListProps) => {
  const { ref, fetchNextPage, movies, currentPage } = useMovieList({
    queryKey,
    searchType,
    initialData,
  });

  return (
    <>
      <section className="flex flex-wrap justify-center gap-5">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
            releaseDate={movie.releaseDate}
            voteAverage={movie.voteAverage}
          />
        ))}
      </section>

      {currentPage < 10 && (
        <div className="m-auto flex flex-col items-center justify-center">
          {currentPage > 1 && currentPage < 10 && <span ref={ref} />}

          {currentPage === 1 && (
            <Button
              theme="grayFill"
              textColor="white"
              paddingX="large"
              paddingY="medium"
              onClick={() => fetchNextPage()}
            >
              VER MAIS
            </Button>
          )}

          {currentPage > 1 && currentPage < 10 && (
            <Loader className="animate-spin" />
          )}
        </div>
      )}
    </>
  );
};

export default MovieList;
