import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import MovieCard from "../MovieCard";

type CarouselCardsProps = {
  data: {
    id: number;
    title: string;
    posterPath: string;
  }[];
  children?: React.ReactNode;
};

const CarouselCards = ({ data, children }: CarouselCardsProps) => {
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={5}
      loop={true}
      breakpoints={{
        0: { slidesPerView: 1 },
        400: { slidesPerView: 2 },
        575: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }}
    >
      {data.slice(0, 10).map((movie) => (
        <SwiperSlide key={movie.id}>
          <div className="grid justify-center py-1">
            <MovieCard.Root title={movie.title} id={movie.id} key={movie.id}>
              <MovieCard.Image
                posterPath={movie.posterPath}
                alt={movie.title}
              />
              <MovieCard.Infos>
                <MovieCard.Title title={movie.title} />
              </MovieCard.Infos>
            </MovieCard.Root>
          </div>
        </SwiperSlide>
      ))}
      {children}
    </Swiper>
  );
};

export default CarouselCards;
