"use client";

import Button from "@/components/Button/Button";
import LabelAndInput from "@/components/LabelAndInput/LabelAndInput";
import useChangeEmail from "./useChangeEmail";

import type { ChangeEmailProps } from "./types.d";

const ChangeEmail = ({ accessToken }: ChangeEmailProps) => {
  const { register, handleSubmit, errors, handleFormSubmit, values, status } =
    useChangeEmail({ accessToken });
  return (
    <article className="m-auto max-w-xl space-y-5">
      <header>
        <h1 className="text-lg font-bold uppercase">Alterar e-mail</h1>

        {status && (
          <p
            data-status={status.status}
            className="data-[status=error]:text-red-500 data-[status=initial]:text-color-3 data-[status=success]:text-green-500"
          >
            {status.message}
          </p>
        )}
      </header>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <div className="space-y-2">
          <div>
            <LabelAndInput
              label="E-mail"
              value={values.email}
              type="text"
              placeholder="@"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <div>
            <LabelAndInput
              label="Senha"
              value={values.password}
              type="password"
              placeholder="Exemplo1@$%"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>
          <div>
            <LabelAndInput
              label="Novo e-mail"
              value={values.newEmail}
              type="text"
              placeholder="@"
              error={errors.newEmail?.message}
              {...register("newEmail")}
            />
          </div>
        </div>

        <div>
          <Button theme="green" type="submit" uppercase={true}>
            Confirmar
          </Button>
        </div>
      </form>
    </article>
  );
};

export default ChangeEmail;
