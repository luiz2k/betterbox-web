import { Calendar } from "lucide-react";

type MovieCardReleaseDateProps = {
  releaseDate: string;
};

const MovieCardReleaseDate = ({ releaseDate }: MovieCardReleaseDateProps) => {
  return (
    <p className="flex items-center gap-1">
      <Calendar className="size-4" /> {releaseDate}
    </p>
  );
};

export default MovieCardReleaseDate;
