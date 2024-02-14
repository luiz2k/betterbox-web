"use client";

import Button from "../Button/Button";
import useDropDown from "./useDropDown";

type DropDownRootProps = {
  className?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  children: React.ReactNode;
};

const DropDownRoot = ({
  className,
  leftIcon,
  rightIcon,
  children,
}: DropDownRootProps) => {
  const { themeMenu, setThemeMenu } = useDropDown();

  return (
    <div className={`relative ${className}`}>
      <Button
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onClick={() => setThemeMenu((prev) => !prev)}
      />

      <menu
        data-animation={themeMenu}
        className="invisible absolute right-0 top-10 translate-y-2 space-y-0.5 rounded bg-color-4 p-1 text-color-2 opacity-0 duration-200 data-[animation=true]:visible data-[animation=true]:translate-y-0 data-[animation=true]:opacity-100 dark:bg-color-2 dark:text-color-4"
      >
        {children}
      </menu>
    </div>
  );
};

export default DropDownRoot;
