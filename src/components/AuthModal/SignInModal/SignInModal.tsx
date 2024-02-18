"use client";

import Button from "@/components/Button/Button";
import LabelAndInput from "@/components/LabelAndInput/LabelAndInput";
import { useAuthModalStore } from "@/stores/AuthModalStore";
import { signInSchema } from "@/validations/authValidation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

type SignInSchema = z.infer<typeof signInSchema>;

const SignInModal = () => {
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

  return (
    <section
      onClick={handleSignInModal}
      className="absolute top-0 z-10 flex h-screen w-full items-center justify-center bg-white/5 p-5 backdrop-blur-sm"
    >
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
        className="relative w-96 rounded border bg-color-2 p-5 dark:bg-color-4"
      >
        <h2 className="text-center text-xl font-bold uppercase">Entrar</h2>

        {errors.root?.authError ? (
          <p className="text-center text-sm uppercase text-red-500">
            {errors.root.authError?.message}
          </p>
        ) : (
          <p className="text-center text-sm uppercase text-color-3">
            Faça login para continuar.
          </p>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="py-5">
            <LabelAndInput
              label="E-mail"
              value={values.email}
              type="text"
              placeholder="@"
              error={errors.email?.message}
              {...register("email")}
            />
            <LabelAndInput
              label="Senha"
              value={values.password}
              type="password"
              placeholder="Exemplo1@$%"
              autoComplete="off"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          <div className="flex justify-between">
            <Button
              theme="green"
              type="button"
              uppercase={true}
              onClick={handleSignUpModal}
            >
              Registrar
            </Button>

            <Button theme="greenFill" uppercase={true} type="submit">
              Entrar
            </Button>
          </div>
        </form>

        <X
          className="absolute right-1 top-1 cursor-pointer"
          onClick={handleSignInModal}
        />
      </div>
    </section>
  );
};

export default SignInModal;
