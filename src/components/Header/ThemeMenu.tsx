"use client";

import Button from "../Button/Button";

import { useTheme } from "next-themes";

import { Computer, MoonStar, Sun } from "lucide-react";

const ThemeMenu = () => {
  const { setTheme } = useTheme();

  return (
    <menu className="space-y-2 lg:hidden">
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
  );
};

export default ThemeMenu;
