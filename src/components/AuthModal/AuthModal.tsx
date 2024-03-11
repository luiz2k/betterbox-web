"use client";

import { useAuthModalStore } from "@/stores/AuthModalStore";

import SignInModal from "./SignInModal/SignInModal";
import SignUpModal from "./SignUpModal/SignUpModal";

const AuthModal = () => {
  const { SignInModal: SignInModalState, SignUpModal: SignUpModalState } =
    useAuthModalStore();

  if (SignInModalState || SignUpModalState)
    document.documentElement.style.overflow = "hidden";
  else document.documentElement.style.overflow = "auto";

  return (
    <>
      {SignInModalState && <SignInModal />}
      {SignUpModalState && <SignUpModal />}
    </>
  );
};

export default AuthModal;
