import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeUsernameSchema } from "@/validations/configurationValidation";
import { changeUsername } from "@/services/Batterbox/Batterbox";

import type {
  ChangeUsernameProps,
  ChangeUsernameSchema,
  Status,
} from "./types.d";

const useChangeUsername = ({ accessToken }: ChangeUsernameProps) => {
  const [status, setStatus] = useState<Status>({
    status: "initial",
    message: "Preencha o formulário para alterar o seu nome de usuário.",
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ChangeUsernameSchema>({
    resolver: zodResolver(changeUsernameSchema),
  });

  const values = getValues();

  const handleFormSubmit = async (data: ChangeUsernameSchema) => {
    try {
      const result = await changeUsername({ ...data, accessToken });

      if (result.status === "success")
        setStatus({
          status: "success",
          message: "Nome de usuário alterado com sucesso.",
        });

      router.refresh();
    } catch (error) {
      setStatus({
        status: "error",
        message: "Erro ao tentar alterar o nome de usuário, tente novamente!",
      });

      reset();
    }
  };
  return {
    handleSubmit,
    handleFormSubmit,
    status,
    values,
    errors,
    register,
  };
};

export default useChangeUsername;