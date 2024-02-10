"use client";

import Button from "../Button/Button";
import NavLink from "../NavLink/NavLink";

import { useRouter } from "next/navigation";

import { useHeaderStore } from "@/stores/HeaderStore";

import {
  Computer,
  Flame,
  Home,
  Menu,
  MoonStar,
  Popcorn,
  Search,
  Sun,
  SunMoon,
  X,
} from "lucide-react";

const Header = () => {
  const router = useRouter();

  const {
    navBar,
    handleNavBar,
    searchBar,
    handleSearchBar,
    themeMenu,
    handleThemMenu,
  } = useHeaderStore();

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.search) return;

    router.push(`/busca/${data.search}`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-10 flex h-20 items-center justify-between gap-5 border-b bg-color-2 p-5 text-base dark:bg-color-4">
      <div className="font-bold">LOGO</div>

      <div className="flex gap-5">
        <nav
          data-nav={navBar}
          className="absolute -left-60 top-20 h-screen w-60 border-r bg-color-2 p-5 duration-200 data-[nav=true]:left-0 md:sticky md:h-auto md:w-fit md:border-none md:p-0 dark:bg-color-4"
        >
          <ul className=" flex flex-col gap-5 uppercase md:flex-row">
            <li>
              <NavLink href="/" leftIcon={<Home />}>
                Início
              </NavLink>
            </li>
            <li>
              <NavLink href="/filmes/emalta" leftIcon={<Flame />}>
                Em Alta
              </NavLink>
            </li>
            <li>
              <NavLink href="/filmes/topfilmes" leftIcon={<Popcorn />}>
                Top filmes
              </NavLink>
            </li>
          </ul>

          <span
            className="absolute right-1 top-1 cursor-pointer rounded-full md:hidden"
            onClick={handleNavBar}
          >
            <X />
          </span>
        </nav>

        <form
          data-search={searchBar}
          onSubmit={handleSearch}
          className="absolute inset-x-0 -top-20 z-10 flex h-20 items-center justify-center border-b bg-color-2 p-5 px-10 duration-200 data-[search=true]:-top-0 md:sticky md:h-fit md:border-none md:p-0 dark:bg-color-4"
        >
          <div className="relative w-full">
            <input
              type="text"
              name="search"
              className="w-full rounded-full border py-1 pl-2 pr-8 text-color-5 md:p-0 md:pl-2 md:pr-7"
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
      </div>

      <div className="flex gap-2">
        <span className="md:hidden">
          <Button leftIcon={<Menu />} onClick={handleNavBar} />
        </span>

        <span className="md:hidden">
          <Button leftIcon={<Search />} onClick={handleSearchBar} />
        </span>

        <span className="relative z-0">
          <Button leftIcon={<SunMoon />} onClick={handleThemMenu} />

          {themeMenu && (
            <menu className="absolute right-0 top-10 space-y-0.5 rounded bg-color-4 p-1 text-color-2 dark:bg-color-2 dark:text-color-4">
              <li className="rounded-md bg-color-4">
                <Button leftIcon={<Sun />} width="full">
                  Claro
                </Button>
              </li>

              <li className="rounded-md bg-color-4">
                <Button leftIcon={<MoonStar />} width="full">
                  Escuro
                </Button>
              </li>

              <li className="rounded-md bg-color-4">
                <Button leftIcon={<Computer />} width="full">
                  Sistema
                </Button>
              </li>
            </menu>
          )}
        </span>
      </div>
    </header>
  );
};

export default Header;
