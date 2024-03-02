"use client";

import Button from "../Button/Button";
import MovieCard from "../MovieCard";

import { ProfileMovieListProps } from "./ProfileMovieList.d";
import { Loader } from "lucide-react";
import useProfileMovieList from "./useProfileMovieList";

const ProfileMovieList = ({
  authorization,
  userId,
  accessToken,
  queryKey,
  searchType,
  initialData,
}: ProfileMovieListProps) => {
  const { movies, ref, fetchNextPage } = useProfileMovieList({
    authorization,
    userId,
    accessToken,
    queryKey,
    searchType,
    initialData,
  });

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,148.8px)] justify-center gap-5">
        {movies.data?.map((movie) => (
          <MovieCard.Root id={movie.id} title={movie.title} key={movie.id}>
            <MovieCard.Image posterPath={movie.posterPath} alt={movie.title} />
            <MovieCard.Infos>
              <MovieCard.Title title={movie.title} />
            </MovieCard.Infos>
          </MovieCard.Root>
        ))}
      </div>

      {movies.currentPage < movies.totalPages && (
        <div className="m-auto flex flex-col items-center justify-center">
          {movies.currentPage > 1 && movies.currentPage < movies.totalPages && (
            <span ref={ref} />
          )}

          {movies.currentPage === 1 && (
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

          {movies.currentPage > 1 && movies.currentPage < movies.totalPages && (
            <Loader className="animate-spin" />
          )}
        </div>
      )}
    </>
  );
};

export default ProfileMovieList;
