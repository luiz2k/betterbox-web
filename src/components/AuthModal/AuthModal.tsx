"use client";

import { useAuthModalStore } from "@/stores/AuthModalStore";

import SignInModal from "./SignInModal/SignInModal";
import SignUpModal from "./SignUpModal/SignUpModal";

const AuthModal = () => {
  const { SignInModal: SignInModalState, SignUpModal: SignUpModalState } =
    useAuthModalStore();

  return (
    <>
      {SignInModalState && <SignInModal />}
      {SignUpModalState && <SignUpModal />}
    </>
  );
};

export default AuthModal;
