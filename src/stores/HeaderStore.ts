import { create } from "zustand";

type ThemeMenuStore = {
  sideBar: boolean;
  handleSideBar: () => void;
  searchBar: boolean;
  handleSearchBar: () => void;
};

export const useHeaderStore = create<ThemeMenuStore>()((set) => ({
  sideBar: false,
  handleSideBar: () =>
    set((state) => {
      if (state.searchBar) state.handleSearchBar();

      return { sideBar: !state.sideBar };
    }),

  searchBar: false,
  handleSearchBar: () =>
    set((state) => {
      if (state.sideBar) state.handleSideBar();

      return { searchBar: !state.searchBar };
    }),
}));
