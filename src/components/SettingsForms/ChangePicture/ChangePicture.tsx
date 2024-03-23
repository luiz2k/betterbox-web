"use client";

import Button from "@/components/Button/Button";
import { deletePicture, getPicture } from "@/services/Batterbox/Batterbox";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-advanced-cropper/dist/style.css";
import CropperImage from "./CropperImage";

import type { ChangePictureProps } from "./ChangePicture.d";

const ChangePicture = ({ apiURL, session }: ChangePictureProps) => {
  const [status, setStatus] = useState<any>({
    status: "initial",
    message: "Preencha o formulário para alterar a sua foto de perfil.",
  });

  const { update } = useSession();

  const [image, setImage] = useState<string | null>(null);

  const [cropper, setCropper] = useState<null | { src: string; type: string }>(
    null,
  );

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files[0]) {
      const blob = URL.createObjectURL(files[0]);

      setCropper({
        src: blob,
        type: files[0].type,
      });
    }

    event.target.value = "";
  };

  const handleDeletePicture = async () => {
    await deletePicture({ apiBaseURL: apiURL });

    await update({
      ...session,
      user: {
        ...session?.user,
        picture: null,
      },
    });

    setImage(null);

    setStatus({
      status: "warning",
      message: "A sua foto de perfil foi removida.",
    });
  };

  useEffect(() => {
    (async () => {
      if (session?.user.picture) {
        const picture = await getPicture({ apiBaseURL: apiURL });

        return setImage(picture.picture);
      }

      setImage(null);
    })();
  }, [apiURL, session?.user.picture]);

  return (
    <article>
      {cropper && (
        <CropperImage
          session={session}
          apiURL={apiURL}
          setImage={setImage}
          setStatus={setStatus}
          cropper={cropper}
          setCropper={setCropper}
        />
      )}

      <article className="m-auto flex max-w-xl flex-wrap gap-2">
        <div className="size-[8.625rem] rounded bg-color-3/15 p-2">
          <Image
            src={image || "/defaultAvatar.jpg"}
            width={200}
            height={200}
            alt={"Avatar"}
            className="rounded-full"
          />
        </div>

        <div className="space-y-2">
          <header>
            <h1 className="text-lg font-bold uppercase">
              Alterar foto de perfil
            </h1>
            {status && (
              <p
                data-status={status.status}
                className="data-[status=error]:text-red-500 data-[status=initial]:text-color-3 data-[status=success]:text-green-500 data-[status=warning]:text-orange-500"
              >
                {status.message}
              </p>
            )}
          </header>

          <div className="flex gap-2">
            <div>
              <label
                htmlFor="file"
                className="flex w-fit cursor-pointer items-center gap-2 rounded border border-green-500 bg-green-500/40 p-1 font-normal uppercase text-green-500 duration-200 hover:bg-green-500/20"
              >
                Alterar
              </label>
              <input
                type="file"
                id="file"
                onChange={handleImage}
                accept="image/png, image/jpeg"
                className="hidden"
              />
            </div>

            {image !== null && (
              <Button theme="green" onClick={handleDeletePicture} uppercase>
                Remover
              </Button>
            )}
          </div>
        </div>
      </article>
    </article>
  );
};

export default ChangePicture;
