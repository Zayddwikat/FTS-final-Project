import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../../../../tailwindCss.css";
import { ImgObject } from "../../../../user/hotelPage/component/hotelDetails/imageContainer/imageContainer";

interface SwiperSectionProps {
  imgs: Array<ImgObject>;
}

export const SwiperSection: React.FC<SwiperSectionProps> = ({ imgs }) => {
  return (
    <Swiper
      className="w-full h-full pb-4"
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={1}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 1 },
      }}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      navigation
    >
      <div className="flex flex-row items-center bg-red-200 justify-center w-full h-[500px] bg-red-200 ">
        {imgs.map((img: ImgObject, index: number) => {
          return (
            <SwiperSlide
              className="flex flex-row items-center justify-center  "
              key={index}
            >
              <div className="w-full h-[300px] flex flex-row items-center justify-center">
                <img
                  src={img.url}
                  alt="image"
                  className="self-center"
                  style={{
                    width: "90%",
                    height: "70%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </div>
    </Swiper>
  );
};
