"use client";

import Button from "../Button/Button";
import DropDown from "../DropDown";

import useHeader from "./useHeader";

import {
  Computer,
  KeyRound,
  LogIn,
  LogOut,
  Menu,
  MoonStar,
  Search,
  Settings,
  Sun,
  SunMoon,
  User,
} from "lucide-react";

import Link from "next/link";
import { signOut } from "next-auth/react";

const SideButtons = ({ session }: { session: boolean }) => {
  const {
    handleSearchBar,
    handleSideBar,
    handleSignInModal,
    handleSignUpModal,
    setTheme,
  } = useHeader();

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
        {!session && (
          <>
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
          </>
        )}

        {session && (
          <>
            <Link href="/perfil">
              <DropDown.Option leftIcon={<User />} cursor="default">
                Perfil
              </DropDown.Option>
            </Link>

            <Link href="/perfil/configuracoes">
              <DropDown.Option leftIcon={<Settings />} cursor="default">
                Configurações
              </DropDown.Option>
            </Link>

            <DropDown.Option
              leftIcon={<LogOut />}
              cursor="default"
              onClick={() => signOut()}
            >
              Sair
            </DropDown.Option>
          </>
        )}
      </DropDown.Root>
    </div>
  );
};

export default SideButtons;
