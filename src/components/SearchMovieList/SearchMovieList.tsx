"use client";

import Button from "../Button/Button";
import MovieCard from "@/components/MovieCard/index";

import useMovieList from "./useSearchMovieList";

import { Loader } from "lucide-react";

import type { MovieListProps } from "./SearchMovieList.d";

const SearchMovieList = ({ queryKey, query, initialData }: MovieListProps) => {
  const { ref, fetchNextPage, movies, currentPage, totalPages } = useMovieList({
    queryKey,
    query,
    initialData,
  });

  return (
    <>
      <div className="flex flex-wrap justify-center gap-5">
        {movies.map((movie) => (
          <MovieCard.Root title={movie.title} id={movie.id} key={movie.id}>
            <MovieCard.Image posterPath={movie.posterPath} alt={movie.title} />
            <MovieCard.Infos>
              <MovieCard.Title title={movie.title} />

              <MovieCard.VoteAverageAndReleaseDate>
                <MovieCard.VoteAverage voteAverage={movie.voteAverage} />
                <MovieCard.ReleaseDate releaseDate={movie.releaseDate} />
              </MovieCard.VoteAverageAndReleaseDate>
            </MovieCard.Infos>
          </MovieCard.Root>
        ))}
      </div>

      {currentPage < 10 && currentPage !== totalPages && (
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

export default SearchMovieList;
