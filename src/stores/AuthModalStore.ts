import { create } from "zustand";

type AuthModalStore = {
  SignInModal: boolean;
  handleSignInModal: () => void;
  SignUpModal: boolean;
  handleSignUpModal: () => void;
};

export const useAuthModalStore = create<AuthModalStore>()((set) => ({
  SignInModal: true,
  handleSignInModal: () =>
    set((state) => {
      if (state.SignUpModal) state.handleSignUpModal();

      return { SignInModal: !state.SignInModal };
    }),

  SignUpModal: false,
  handleSignUpModal: () =>
    set((state) => {
      if (state.SignInModal) state.handleSignInModal();

      return { SignUpModal: !state.SignUpModal };
    }),
}));
