"use client";

import Button from "@/components/Button/Button";
import LabelAndInput from "@/components/LabelAndInput/LabelAndInput";
import { signUpSchema } from "@/validations/authValidation";

import { useAuthModalStore } from "@/stores/AuthModalStore";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { X } from "lucide-react";
import { signIn } from "next-auth/react";

type SignUpSchema = z.infer<typeof signUpSchema>;

const SignUpModal = () => {
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

  const handleFormSubmit = async (data: SignUpSchema) => {
    try {
      const result = await signIn("credentials", { ...data, redirect: false });

      if (!result?.ok) throw result;
    } catch (error) {
      reset();

      setError("root.authError", {
        type: "SignUp",
        message: "E-mail já cadastrado.",
      });
    }
  };

  return (
    <section
      onClick={handleSignUpModal}
      className="absolute top-0 z-10 flex h-screen w-full items-center justify-center bg-white/5 p-5 backdrop-blur-sm"
    >
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
        className="relative w-96 rounded border bg-color-2 p-5 dark:bg-color-4"
      >
        <h2 className="text-center text-xl font-bold uppercase">Registrar</h2>

        {errors.root?.authError ? (
          <p className="text-center text-sm uppercase text-red-500">
            {errors.root.authError?.message}
          </p>
        ) : (
          <p className="text-center text-sm uppercase text-color-3">
            Faça registro para continuar.
          </p>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="py-5">
            <LabelAndInput
              label="Nome de usuário"
              value={values.username}
              type="text"
              placeholder="Luiz"
              error={errors.username?.message}
              {...register("username")}
            />
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
            <LabelAndInput
              label="Confirmar senha"
              value={values.confirmPassword}
              type="password"
              placeholder="Exemplo1@$%"
              autoComplete="off"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
          </div>

          <div className="flex justify-between">
            <Button
              theme="green"
              type="button"
              uppercase={true}
              onClick={handleSignInModal}
            >
              Entrar
            </Button>

            <Button theme="greenFill" type="submit" uppercase={true}>
              Registrar
            </Button>
          </div>
        </form>

        <X
          className="absolute right-1 top-1 cursor-pointer"
          onClick={handleSignUpModal}
        />
      </div>
    </section>
  );
};

export default SignUpModal;
