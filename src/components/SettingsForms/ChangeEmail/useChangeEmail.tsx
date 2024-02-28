import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeEmail } from "@/services/Batterbox/Batterbox";
import { changeEmailSchema } from "@/validations/configurationValidation";

import { ChangeEmailProps, ChangeEmailSchema, Status } from "./types.d";

const useChangeEmail = ({ accessToken }: ChangeEmailProps) => {
  const [status, setStatus] = useState<Status>({
    status: "initial",
    message: "Preencha o formulário para alterar o seu e-mail.",
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
  });

  const values = getValues();

  const handleFormSubmit = async (data: ChangeEmailSchema) => {
    try {
      console.log(data.email);

      const result = await changeEmail({ ...data, accessToken });

      if (result.status === "success")
        setStatus({
          status: "success",
          message: "E-mail alterado com sucesso.",
        });

      router.refresh();
    } catch (error) {
      setStatus({
        status: "error",
        message: "Erro ao tentar alterar seu email, tente novamente!",
      });

      reset();
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    handleFormSubmit,
    values,
    status,
  };
};

export default useChangeEmail;
