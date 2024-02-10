import { create } from "zustand";

type ThemeMenuStore = {
  navBar: boolean;
  handleNavBar: () => void;
  searchBar: boolean;
  handleSearchBar: () => void;
  themeMenu: boolean;
  handleThemMenu: () => void;
};

export const useHeaderStore = create<ThemeMenuStore>()((set) => ({
  navBar: false,
  handleNavBar: () =>
    set((state) => {
      if (state.searchBar) state.handleSearchBar();
      if (state.themeMenu) state.handleThemMenu();

      return { navBar: !state.navBar };
    }),

  searchBar: false,
  handleSearchBar: () =>
    set((state) => {
      if (state.navBar) state.handleNavBar();
      if (state.themeMenu) state.handleThemMenu();

      return { searchBar: !state.searchBar };
    }),

  themeMenu: false,
  handleThemMenu: () =>
    set((state) => {
      if (state.navBar) state.handleNavBar();
      if (state.searchBar) state.handleSearchBar();

      return { themeMenu: !state.themeMenu };
    }),
}));
