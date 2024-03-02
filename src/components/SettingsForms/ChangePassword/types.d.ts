import { changePasswordSchema } from "@/validations/configurationValidation";
import { z } from "zod";

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type ChangePasswordProps = {
  apiURL: string;
  accessToken: string | undefined;
};

export type Status = {
  status: "initial" | "success" | "error";
  message: string;
};
