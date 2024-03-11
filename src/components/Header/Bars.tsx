"use client";

import NavBar from "./NavBar";
import ThemeMenu from "./ThemeMenu";
import SearchBar from "./SearchBar";
import useHeader from "./useHeader";
import { X } from "lucide-react";

const Bars = () => {
  const { sideBar, handleSideBar } = useHeader();

  if (sideBar) document.documentElement.style.overflow = "hidden";
  else document.documentElement.style.overflow = "auto";

  return (
    <div className="flex gap-5">
      <div
        data-sidebar={sideBar}
        className="absolute -left-60 top-0 z-10 flex h-svh w-60 flex-col justify-between border-r bg-color-2 p-5 duration-200 data-[sidebar=true]:left-0 dark:bg-color-4 lg:static lg:h-auto lg:w-fit lg:border-none lg:bg-transparent lg:p-0 dark:lg:bg-transparent"
      >
        <NavBar />

        <ThemeMenu />

        <span
          className="absolute right-1 top-1 cursor-pointer rounded-full lg:hidden"
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
