import { Session } from "next-auth";

export type CropperImageProps = {
  session: Session | null;
  apiURL: string;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  setStatus: React.Dispatch<any>;
  cropper: {
    src: string;
    type: string;
  };
  setCropper: React.Dispatch<
    React.SetStateAction<{
      src: string;
      type: string;
    } | null>
  >;
};
