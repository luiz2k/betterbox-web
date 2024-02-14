"use client";

import { useEffect, useState } from "react";

const useDropDown = () => {
  const [themeMenu, setThemeMenu] = useState<boolean>(false);

  useEffect(() => {
    if (!themeMenu) return;

    const documentEvent = (): void => {
      setThemeMenu((prev) => !prev);
    };

    window.document.addEventListener("click", documentEvent);

    return () => window.document.removeEventListener("click", documentEvent);
  }, [themeMenu]);

  return { themeMenu, setThemeMenu };
};

export default useDropDown;
