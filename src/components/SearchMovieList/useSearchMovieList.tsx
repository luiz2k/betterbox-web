import { searchMovie } from "@/services/TMDB/TMDB";

import { useEffect } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import type { MovieListProps, Movies } from "./SearchMovieList.d";

const useSearchMovieList = ({
  queryKey,
  query,
  initialData,
}: MovieListProps) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey, query],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => searchMovie(query, pageParam, "pt-BR"),
    initialData: { pages: [initialData], pageParams: [1] },
    getNextPageParam: (_, allPages) => allPages.length + 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  const movies: Movies = data.pages.reduce((acc, page) => {
    return {
      currentPage: page.currentPage,
      totalPages: initialData.totalPages,
      movies: [...acc.movies, ...page.movies],
    };
  });

  return {
    ref,
    fetchNextPage,
    movies: movies.movies,
    currentPage: movies.currentPage,
  };
};

export default useSearchMovieList;
