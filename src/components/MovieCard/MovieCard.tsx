import Image from "next/image";
import { Calendar, Star } from "lucide-react";
import { MovieCardProps } from "./MovieCard.d";
import Link from "next/link";

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
        className="group w-[9.3rem] rounded bg-color-4 dark:bg-color-2"
      >
        <div className="overflow-hidden rounded duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1">
          <div className="h-[13.949rem]">
            <Image
              src={posterPath}
              alt={title}
              width={148.8}
              height={0}
              priority={true}
              className="size-full object-cover"
            />
          </div>

          <div className="space-y-1 bg-color-3 p-1 text-sm text-color-2">
            <div className="flex h-10 items-center justify-center">
              <h2 className="line-clamp-2  text-center">{title}</h2>
            </div>

            <div className="flex justify-between gap-1">
              <p className="flex items-center gap-1">
                <Star className="size-4" /> {voteAverage}
              </p>

              <p className="flex items-center gap-1">
                <Calendar className="size-4" /> {releaseDate}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MovieCard;
