"use client";

import Button from "../Button/Button";
import DropDown from "../DropDown";

import { useTheme } from "next-themes";

import useHeader from "./useHeader";

import {
  Computer,
  KeyRound,
  LogIn,
  Menu,
  MoonStar,
  Search,
  Sun,
  SunMoon,
  User,
} from "lucide-react";

const SideButtons = () => {
  const {
    handleSearchBar,
    handleSideBar,
    handleSignInModal,
    handleSignUpModal,
  } = useHeader();

  const { setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <div className="md:hidden">
        <Button leftIcon={<Search />} onClick={handleSearchBar} />
      </div>

      <div className="md:hidden">
        <Button leftIcon={<Menu />} onClick={handleSideBar} />
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
  );
};

export default SideButtons;
