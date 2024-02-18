import { useAuthModalStore } from "@/stores/AuthModalStore";
import { signInSchema } from "@/validations/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SignInSchema = z.infer<typeof signInSchema>;

const useSignInModal = () => {
  const { handleSignInModal, handleSignUpModal } = useAuthModalStore();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    getValues,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const values: SignInSchema = getValues();

  const router = useRouter();

  const handleFormSubmit = async (data: SignInSchema) => {
    try {
      const result = await signIn("credentials", { ...data, redirect: false });

      if (!result?.ok) throw result;

      router.refresh();
      handleSignInModal();
    } catch (error) {
      reset();

      setError("root.authError", {
        type: "SignIn",
        message: "E-mail ou senha inválido.",
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    values,
    handleFormSubmit,
    handleSignInModal,
    handleSignUpModal,
  };
};

export default useSignInModal;
