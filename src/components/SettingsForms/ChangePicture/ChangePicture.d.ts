import { Session } from "next-auth";

export type ChangePictureProps = {
  apiURL: string;
  session: Session | null;
};
