"use client";

import useHeader from "./useHeader";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const { searchBar, handleSearch, handleSearchBar } = useHeader();

  return (
    <form
      data-search={searchBar}
      onSubmit={handleSearch}
      className="absolute inset-x-0 top-0 -z-10 flex h-20 items-center justify-center border-b bg-color-2 p-5 px-10 duration-200 data-[search=true]:top-20 dark:bg-color-4 md:static md:z-0 md:h-fit md:border-none md:bg-transparent md:p-0 dark:md:bg-transparent"
    >
      <div className="relative w-full">
        <input
          type="text"
          name="search"
          className="w-full rounded-full border border-color-3 bg-color-2 py-1 pl-2 pr-8 text-color-4 shadow-inner dark:focus:bg-white/80 md:p-0 md:pl-2 md:pr-7"
        />

        <button
          type="submit"
          className="absolute right-1.5 top-[0.32rem] rounded-full md:top-[0.20rem]"
        >
          <Search className="text-color-4 md:size-5" />
        </button>
      </div>

      <span
        className="absolute right-1 top-1 cursor-pointer md:hidden"
        onClick={handleSearchBar}
      >
        <X />
      </span>
    </form>
  );
};

export default SearchBar;
