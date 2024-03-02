"use client";

import Button from "@/components/Button/Button";
import LabelAndInput from "@/components/LabelAndInput/LabelAndInput";
import useChangeUsername from "./useChangeUsername";

import type { ChangeUsernameProps } from "./types.d";

const ChangeUsername = ({ apiURL, accessToken }: ChangeUsernameProps) => {
  const { status, handleSubmit, handleFormSubmit, values, errors, register } =
    useChangeUsername({
      apiURL,
      accessToken,
    });

  return (
    <article className="m-auto max-w-xl space-y-5">
      <header>
        <h1 className="text-lg font-bold uppercase">Alterar nome de usuário</h1>

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
        <div>
          <LabelAndInput
            label="Novo de usuário"
            value={values.newUsername}
            type="text"
            placeholder="Luiz"
            error={errors.newUsername?.message}
            {...register("newUsername")}
          />
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

export default ChangeUsername;
