const MovieCardInfos = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-1 bg-color-3 p-1 text-sm text-color-2">
      {children}
    </div>
  );
};

export default MovieCardInfos;
