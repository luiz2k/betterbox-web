import { Star } from "lucide-react";

type MovieCardVoteAverageProps = {
  voteAverage: number;
};

const MovieCardVoteAverage = ({ voteAverage }: MovieCardVoteAverageProps) => {
  return (
    <p className="flex items-center gap-1">
      <Star className="size-4" /> {voteAverage}
    </p>
  );
};

export default MovieCardVoteAverage;
