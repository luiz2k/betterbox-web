"use client";

import useHeader from "./useHeader";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const { searchBar, handleSearch, handleSearchBar } = useHeader();

  return (
    <form
      data-search={searchBar}
      onSubmit={handleSearch}
      className="absolute inset-x-0 top-0 -z-10 flex h-20 items-center justify-center border-b bg-color-2 p-5 px-10 duration-200 data-[search=true]:top-20 dark:bg-color-4 lg:static lg:z-0 lg:h-fit lg:border-none lg:bg-transparent lg:p-0 dark:lg:bg-transparent"
    >
      <div className="relative w-full">
        <input
          type="text"
          name="search"
          className="w-full rounded-full border border-color-3 bg-color-2 py-1 pl-2 pr-8 text-color-4 shadow-inner dark:focus:bg-white/80 lg:p-0 lg:pl-2 lg:pr-7"
        />

        <button
          type="submit"
          className="absolute right-1.5 top-[0.32rem] rounded-full lg:top-[0.20rem]"
        >
          <Search className="text-color-4 lg:size-5" />
        </button>
      </div>

      <span
        className="absolute right-1 top-1 cursor-pointer lg:hidden"
        onClick={handleSearchBar}
      >
        <X />
      </span>
    </form>
  );
};

export default SearchBar;
