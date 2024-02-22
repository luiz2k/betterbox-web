import Link from "next/link";

type MovieCardRootProps = {
  title: string;
  id: number;
  children: React.ReactNode;
};

const MovieCardRoot = ({ title, id, children }: MovieCardRootProps) => {
  return (
    <Link href={`/filmes/${id}`} className="relative">
      <article
        title={title}
        className="group w-[9.3rem] rounded bg-color-4 dark:bg-color-2"
      >
        <div className="overflow-hidden rounded duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1">
          {children}
        </div>
      </article>
    </Link>
  );
};

export default MovieCardRoot;
