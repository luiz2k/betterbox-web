import Button from "../Button/Button";
import NavLink from "../NavLink/NavLink";

import { Flame, Home, Menu, Popcorn, Search, SunMoon, X } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex h-20 items-center justify-between gap-5 border-b bg-color-2 p-5 text-base dark:bg-color-4">
      <div className="font-bold">LOGO</div>

      <div className="flex gap-5">
        <nav className="absolute left-0 top-20 h-screen w-60 border-r bg-color-2 p-5 md:sticky md:h-auto md:w-fit md:border-none md:p-0 dark:bg-color-4">
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

          <span className="absolute right-1 top-1 cursor-pointer rounded-full md:hidden">
            <X />
          </span>
        </nav>

        <form className="absolute inset-x-0 top-0 flex h-20 items-center justify-center border-b  bg-color-2 p-5 px-10 md:sticky md:h-fit md:border-none md:p-0 dark:bg-color-4">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full rounded-full border py-1 pl-2 pr-8 text-color-5 md:p-0 md:pl-2 md:pr-7"
            />

            <button
              type="submit"
              className="absolute right-1.5 top-[0.32rem] rounded-full md:top-[0.20rem]"
            >
              <Search className="text-color-4 md:size-5" />
            </button>
          </div>

          <span className="absolute right-1 top-1 cursor-pointer md:hidden">
            <X />
          </span>
        </form>
      </div>

      <div className="flex gap-2">
        <span className="md:hidden">
          <Button leftIcon={<Menu />} />
        </span>
        <span className="md:hidden">
          <Button leftIcon={<Search />} />
        </span>
        <span>
          <Button leftIcon={<SunMoon />} />
        </span>
      </div>
    </header>
  );
};

export default Header;
