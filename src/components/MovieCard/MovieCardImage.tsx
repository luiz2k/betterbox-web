import Image from "next/image";

type MovieCardImageProps = {
  posterPath: string;
  alt: string;
};

const MovieCardImage = ({ posterPath, alt }: MovieCardImageProps) => {
  return (
    <div className="h-[13.949rem]">
      <Image
        src={posterPath}
        alt={alt}
        width={148.8}
        height={233.17}
        priority={true}
        className="size-full object-cover"
      />
    </div>
  );
};

export default MovieCardImage;
