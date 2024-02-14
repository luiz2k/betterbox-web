"use client";

import { useAuthModalStore } from "@/stores/AuthModalStore";
import { useHeaderStore } from "@/stores/HeaderStore";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useHeader = () => {
  const { sideBar, handleSideBar, searchBar, handleSearchBar } =
    useHeaderStore();
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
    if (!sideBar) return;

    const documentEvent = () => {
      handleSideBar();
    };

    window.document.addEventListener("click", documentEvent);

    return () => window.document.removeEventListener("click", documentEvent);
  }, [handleSideBar, sideBar]);

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

  return {
    sideBar,
    handleSideBar,
    searchBar,
    handleSearchBar,
    handleSearch,
    handleSignInModal,
    handleSignUpModal,
    setTheme,
  };
};

export default useHeader;
