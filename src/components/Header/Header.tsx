"use client";

import Button from "../Button/Button";
import NavLink from "../NavLink/NavLink";
import DropDown from "../DropDown";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect } from "react";

import { useHeaderStore } from "@/stores/HeaderStore";
import { useAuthModalStore } from "@/stores/AuthModalStore";

import {
  Computer,
  Flame,
  Home,
  KeyRound,
  LogIn,
  Menu,
  MoonStar,
  Popcorn,
  Search,
  Sun,
  SunMoon,
  User,
  X,
} from "lucide-react";

const Header = () => {
  const {
    navBar,
    handleNavBar,
    searchBar,
    handleSearchBar,
    themeMenu,
    handleThemMenu,
  } = useHeaderStore();

  const { handleSignInModal, handleSignUpModal } = useAuthModalStore();

  const { setTheme } = useTheme();

  const router = useRouter();

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.search) return;

    router.push(`/busca/${data.search}`);
  };

  useEffect(() => {
    if (!navBar) return;

    const documentEvent = () => {
      handleNavBar();
    };

    window.document.addEventListener("click", documentEvent);

    return () => window.document.removeEventListener("click", documentEvent);
  }, [handleNavBar, navBar]);

  useEffect(() => {
    if (!searchBar) return;

    const documentEvent = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT") return;

      handleSearchBar();
    };

    window.document.addEventListener("click", documentEvent);

    return () => window.document.removeEventListener("click", documentEvent);
  }, [handleSearchBar, searchBar]);

  useEffect(() => {
    if (!themeMenu) return;

    const documentEvent = () => {
      handleThemMenu();
    };

    window.document.addEventListener("click", documentEvent);

    return () => window.document.removeEventListener("click", documentEvent);
  }, [handleThemMenu, themeMenu]);

  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-color-2 dark:bg-color-4">
      <div className="flex h-20 items-center justify-between gap-5 border-b bg-color-2 p-5 text-base dark:bg-color-4">
        <div className="font-bold">LOGO</div>

        <div className="flex gap-5">
          <div
            data-sidebar={navBar}
            className="absolute -left-60 top-0 z-10 flex h-svh w-60 flex-col justify-between border-r bg-color-2 p-5 duration-200 data-[sidebar=true]:left-0 dark:bg-color-4 md:static md:h-auto md:w-fit md:border-none md:bg-transparent md:p-0 dark:md:bg-transparent"
          >
            <nav>
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
            </nav>

            <menu className="space-y-2 md:hidden">
              <li className="rounded-md bg-color-2 dark:bg-color-4">
                <Button
                  leftIcon={<Sun />}
                  width="full"
                  onClick={() => setTheme("light")}
                >
                  Claro
                </Button>
              </li>
              <li className="rounded-md bg-color-2 dark:bg-color-4">
                <Button
                  leftIcon={<MoonStar />}
                  width="full"
                  onClick={() => setTheme("dark")}
                >
                  Escuro
                </Button>
              </li>
              <li className="rounded-md bg-color-2 dark:bg-color-4">
                <Button
                  leftIcon={<Computer />}
                  width="full"
                  onClick={() => setTheme("system")}
                >
                  Sistema
                </Button>
              </li>
            </menu>

            <span
              className="absolute right-1 top-1 cursor-pointer rounded-full md:hidden"
              onClick={handleNavBar}
            >
              <X />
            </span>
          </div>

          <form
            data-search={searchBar}
            onSubmit={handleSearch}
            className="absolute inset-x-0 top-0 -z-10 flex h-20 items-center justify-center border-b bg-color-2 p-5 px-10 duration-200 data-[search=true]:top-20 dark:bg-color-4 md:static md:z-0 md:h-fit md:border-none md:bg-transparent md:p-0 dark:md:bg-transparent"
          >
            <div className="relative w-full">
              <input
                type="text"
                name="search"
                className="w-full rounded-full border bg-color-2 py-1 pl-2 pr-8 text-color-4 shadow-inner md:p-0 md:pl-2 md:pr-7"
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
          <div className="md:hidden">
            <Button leftIcon={<Search />} onClick={handleSearchBar} />
          </div>

          <div className="md:hidden">
            <Button leftIcon={<Menu />} onClick={handleNavBar} />
          </div>

          <DropDown.Root leftIcon={<SunMoon />} className="hidden md:block">
            <DropDown.Option
              leftIcon={<Sun />}
              cursor="default"
              onClick={() => setTheme("light")}
            >
              Claro
            </DropDown.Option>
            <DropDown.Option
              leftIcon={<MoonStar />}
              cursor="default"
              onClick={() => setTheme("dark")}
            >
              Escuro
            </DropDown.Option>
            <DropDown.Option
              leftIcon={<Computer />}
              cursor="default"
              onClick={() => setTheme("system")}
            >
              Sistema
            </DropDown.Option>
          </DropDown.Root>

          <DropDown.Root leftIcon={<User />}>
            <DropDown.Option
              leftIcon={<LogIn />}
              cursor="default"
              onClick={handleSignInModal}
            >
              Entrar
            </DropDown.Option>
            <DropDown.Option
              leftIcon={<KeyRound />}
              cursor="default"
              onClick={handleSignUpModal}
            >
              Registrar
            </DropDown.Option>
          </DropDown.Root>
        </div>
      </div>
    </header>
  );
};

export default Header;
