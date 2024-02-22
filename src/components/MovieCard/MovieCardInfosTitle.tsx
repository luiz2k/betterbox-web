type MovieCardInfosTitleProps = {
  title: string;
};

const MovieCardInfosTitle = ({ title }: MovieCardInfosTitleProps) => {
  return (
    <div className="flex h-10 items-center justify-center">
      <h2 className="line-clamp-2 text-center">{title}</h2>
    </div>
  );
};

export default MovieCardInfosTitle;
