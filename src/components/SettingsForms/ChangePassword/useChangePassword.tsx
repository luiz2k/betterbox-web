import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "@/validations/configurationValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "@/services/Batterbox/Batterbox";

import type {
  ChangePasswordProps,
  ChangePasswordSchema,
  Status,
} from "./types.d";

const useChangePassword = ({ accessToken }: ChangePasswordProps) => {
  const [status, setStatus] = useState<Status>({
    status: "initial",
    message: "Preencha o formulário para alterar a sua senha.",
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const values = getValues();

  const handleFormSubmit = async (data: ChangePasswordSchema) => {
    try {
      const result = await changePassword({ ...data, accessToken });

      if (result.status === "success")
        setStatus({
          status: "success",
          message: "Senha alterada com sucesso.",
        });

      router.refresh();
    } catch (error) {
      setStatus({
        status: "error",
        message: "Erro ao tentar alterar a senha, tente novamente!",
      });

      reset();
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    values,
    handleFormSubmit,
    status,
  };
};

export default useChangePassword;
