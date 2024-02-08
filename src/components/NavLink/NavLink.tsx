"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

type NavLink = ComponentProps<typeof Link> & {
  href: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  children: React.ReactNode;
};

const NavLink = ({ leftIcon, rightIcon, href, children }: NavLink) => {
  const pathname: string = usePathname();
  const hrefIsTheSameAsPathname: boolean = href === pathname;

  return (
    <Link
      href={href}
      className="group flex gap-2 rounded font-bold duration-200"
    >
      {leftIcon && <>{leftIcon}</>}

      <span
        data-pathname={hrefIsTheSameAsPathname}
        className="relative after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:bg-color-4 after:duration-200 group-hover:after:w-full data-[pathname=true]:cursor-default data-[pathname=true]:after:w-full dark:after:bg-color-2"
      >
        {children}
      </span>

      {rightIcon && <>{rightIcon}</>}
    </Link>
  );
};

export default NavLink;
