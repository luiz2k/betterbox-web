import { changeEmailSchema } from "@/validations/configurationValidation";
import { z } from "zod";

export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>;

export type ChangeEmailProps = { accessToken: string | undefined };

export type Status = {
  status: "initial" | "success" | "error";
  message: string;
};
