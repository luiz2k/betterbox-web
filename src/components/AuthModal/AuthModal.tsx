"use client";

import { useAuthModalStore } from "@/stores/AuthModalStore";

import SignInModal from "./SignInModal/SignInModal";
import SignUpModal from "./SignUpModal/SignUpModal";
import { useEffect } from "react";

const AuthModal = () => {
  const { SignInModal: SignInModalState, SignUpModal: SignUpModalState } =
    useAuthModalStore();

  useEffect(() => {
    if (SignInModalState || SignUpModalState)
      document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [SignInModalState, SignUpModalState]);

  return (
    <>
      {SignInModalState && <SignInModal />}
      {SignUpModalState && <SignUpModal />}
    </>
  );
};

export default AuthModal;
