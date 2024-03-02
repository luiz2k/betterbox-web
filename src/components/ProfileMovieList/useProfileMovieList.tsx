import { useInView } from "react-intersection-observer";
import type { Movies, ProfileMovieListProps } from "./ProfileMovieList.d";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllMoviesListedByUser } from "@/services/Batterbox/Batterbox";
import { useEffect } from "react";

const useProfileMovieList = ({
  authorization,
  userId,
  accessToken,
  queryKey,
  searchType,
  initialData,
}: ProfileMovieListProps) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey],
    initialPageParam: 1,
    queryFn: ({ pageParam = 2 }) =>
      getAllMoviesListedByUser(
        authorization,
        userId,
        accessToken,
        searchType,
        pageParam,
      ),
    initialData: { pages: [initialData], pageParams: [1] },
    getNextPageParam: (_, allPages) => allPages.length + 1,
  });

  const movies: Movies = data?.pages.reduce((acc, page) => {
    if (!acc.data || !page.data) return page;

    return {
      message: page.message,
      status: page.status,
      currentPage: page.currentPage,
      totalPages: initialData.totalPages,
      data: [...acc.data, ...page.data],
    };
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  return {
    ref,
    movies,
    fetchNextPage,
  };
};

export default useProfileMovieList;
