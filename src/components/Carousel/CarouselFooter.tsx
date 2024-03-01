import { useSwiper } from "swiper/react";
import Button from "../Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type CarouselFooterProps = {
  href?: string;
};

const CarouselFooter = ({ href }: CarouselFooterProps) => {
  const swiper = useSwiper();

  return (
    <footer className="mt-2 flex justify-between">
      <div className=" flex gap-2">
        <Button
          theme="grayFill"
          textColor="white"
          leftIcon={<ChevronLeft />}
          onClick={() => swiper.slidePrev()}
        />
        <Button
          theme="grayFill"
          textColor="white"
          leftIcon={<ChevronRight />}
          onClick={() => swiper.slideNext()}
        />
      </div>

      {href && (
        <Link href={href} className="flex justify-center">
          <Button theme="grayFill" textColor="white" uppercase>
            Ver mais
          </Button>
        </Link>
      )}
    </footer>
  );
};

export default CarouselFooter;
