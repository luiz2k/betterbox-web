"use client";

import NavBar from "./NavBar";
import ThemeMenu from "./ThemeMenu";
import SearchBar from "./SearchBar";
import useHeader from "./useHeader";
import { X } from "lucide-react";

const Bars = () => {
  const { sideBar, handleSideBar } = useHeader();

  return (
    <div className="flex gap-5">
      <div
        data-sidebar={sideBar}
        className="absolute -left-60 top-0 z-10 flex h-svh w-60 flex-col justify-between border-r bg-color-2 p-5 duration-200 data-[sidebar=true]:left-0 dark:bg-color-4 md:static md:h-auto md:w-fit md:border-none md:bg-transparent md:p-0 dark:md:bg-transparent"
      >
        <NavBar />

        <ThemeMenu />

        <span
          className="absolute right-1 top-1 cursor-pointer rounded-full md:hidden"
          onClick={handleSideBar}
        >
          <X />
        </span>
      </div>

      <SearchBar />
    </div>
  );
};

export default Bars;
