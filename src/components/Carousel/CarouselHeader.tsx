type CarouselHeaderProps = {
  title?: string;
  subtitle?: string;
};

const CarouselHeader = ({ title, subtitle }: CarouselHeaderProps) => {
  return (
    <header>
      {title && <h2 className="text-lg font-bold uppercase">{title}</h2>}
      {subtitle && <p className="text-color-3">{subtitle}</p>}
    </header>
  );
};

export default CarouselHeader;
