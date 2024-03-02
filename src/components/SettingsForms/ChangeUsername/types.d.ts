import { changeUsernameSchema } from "@/validations/configurationValidation";
import { z } from "zod";

export type ChangeUsernameSchema = z.infer<typeof changeUsernameSchema>;

export type ChangeUsernameProps = {
  apiURL: string;
  accessToken: string | undefined;
};

export type Status = {
  status: "initial" | "success" | "error";
  message: string;
};
