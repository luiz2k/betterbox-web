import { useAuthModalStore } from "@/stores/AuthModalStore";
import { signUpSchema } from "@/validations/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SignUpSchema = z.infer<typeof signUpSchema>;

const useSignUpModal = () => {
  const { handleSignUpModal, handleSignInModal } = useAuthModalStore();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    getValues,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const values: SignUpSchema = getValues();

  const router = useRouter();

  const handleFormSubmit = async (data: SignUpSchema) => {
    try {
      const result = await signIn("credentials", { ...data, redirect: false });

      if (!result?.ok) throw result;

      router.refresh();
      handleSignUpModal();
    } catch (error) {
      reset();

      setError("root.authError", {
        type: "SignUp",
        message: "E-mail já cadastrado.",
      });
    }
  };

  return {
    handleSignUpModal,
    handleFormSubmit,
    register,
    handleSubmit,
    values,
    errors,
    handleSignInModal,
  };
};

export default useSignUpModal;
