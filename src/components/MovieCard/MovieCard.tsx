"use client";

import Image from "next/image";
import { Calendar, EyeIcon, Heart, Star } from "lucide-react";
import { MovieCardProps } from "./MovieCard.d";
import Link from "next/link";
import Button from "../Button/Button";

const MovieCard = ({
  id,
  title,
  posterPath,
  releaseDate,
  voteAverage,
}: MovieCardProps) => {
  return (
    <Link href={`/filmes/${id}`} className="relative">
      <article
        title={title}
        className="group w-[10rem] rounded bg-color-4 dark:bg-color-2"
      >
        <div className="overflow-hidden rounded duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1">
          <div className="h-[15rem]">
            <Image
              src={posterPath}
              alt={title}
              width={160}
              height={240}
              priority={true}
              className="size-full object-cover"
            />
          </div>

          <div className="space-y-2 bg-color-3 p-1 text-sm text-color-2">
            <div className="flex h-10 items-center justify-center">
              <h2 className="line-clamp-2  text-center">{title}</h2>
            </div>

            <div className="flex justify-between gap-2">
              <p className="flex items-center gap-1">
                <Star className="size-4" /> {voteAverage}
              </p>

              <p className="flex items-center gap-1">
                <Calendar className="size-4" /> {releaseDate}
              </p>
            </div>
          </div>

          <span className="absolute right-0 top-0 m-1 space-y-1 duration-200 md:group-hover:opacity-100 lg:opacity-0">
            <Button
              theme="grayFill"
              textColor="white"
              paddingX="small"
              paddingY="small"
              title="Assistido"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <EyeIcon />
            </Button>

            <Button
              theme="grayFill"
              textColor="white"
              paddingX="small"
              paddingY="small"
              title="Favoritar"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Heart />
            </Button>
          </span>
        </div>
      </article>
    </Link>
  );
};

export default MovieCard;
