"use client";

import Button from "@/components/Button/Button";
import { changePicture } from "@/services/Batterbox/Batterbox";
import { X } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import {
  CropperRef,
  Cropper,
  CircleStencil,
  CropperPreviewRef,
} from "react-advanced-cropper";

import type { CropperImageProps } from "./CropperImage.d";

const CropperImage = ({
  session,
  apiURL,
  setImage,
  setStatus,
  cropper,
  setCropper,
}: CropperImageProps) => {
  const { update } = useSession();

  const cropperRef = useRef<CropperRef>(null);
  const previewRef = useRef<CropperPreviewRef>(null);

  const cropperUpdate = () => previewRef.current?.refresh();

  const onCrop = () => {
    const canvas = cropperRef.current?.getCanvas();

    if (canvas) {
      const form = new FormData();

      canvas.toBlob(async (blob) => {
        if (blob) {
          form.append("imageFile", blob);
          const response = await changePicture({ form, apiBaseURL: apiURL });

          await update({
            ...session,
            user: {
              ...session?.user,
              picture: true,
            },
          });

          setImage(response);

          setStatus({
            status: "success",
            message: "Imagem alterada com sucesso.",
          });
        }
      });
    }

    setCropper(null);
  };

  return (
    <article className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-white/5 p-5 backdrop-blur-sm">
      <div className="w-full max-w-96 space-y-5 rounded border bg-color-2 p-5 dark:bg-color-4">
        <X
          onClick={() => setCropper(null)}
          className="ml-auto flex cursor-pointer"
        />

        <Cropper
          ref={cropperRef}
          src={cropper && cropper.src}
          sizeRestrictions={{
            minWidth: 250,
            minHeight: 250,
            maxWidth: 1920,
            maxHeight: 1920,
          }}
          stencilComponent={CircleStencil}
          onUpdate={cropperUpdate}
          className="h-96 w-full max-w-96"
        />

        <div className="flex justify-end gap-2">
          <Button
            theme="grayFill"
            onClick={() => setCropper(null)}
            textColor="white"
            uppercase
          >
            Cancelar
          </Button>

          <Button theme="grayFill" onClick={onCrop} textColor="white" uppercase>
            Enviar
          </Button>
        </div>
      </div>
    </article>
  );
};

export default CropperImage;
