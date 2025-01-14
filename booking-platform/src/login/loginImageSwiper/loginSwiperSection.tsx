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

interface LoginImgObject {
  id: number;
  url: string;
  alt: string;
}

interface SwiperSectionProps {
  imgs: Array<LoginImgObject>;
  noTitle: boolean;
}

export const LoginSwiperSection: React.FC<SwiperSectionProps> = ({
  imgs,
  noTitle,
}) => {
  if (imgs.length === 0) {
    return <p className="text-center">No images available</p>;
  }

  return (
    <Swiper
      className={`w-full ${noTitle ? "h-full" : "h-[90%]"}  `}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={1}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 1 },
      }}
      autoplay={{ delay: 4000 }}
      loop={true}
    >
      {imgs.map((img: LoginImgObject, index: number) => (
        <SwiperSlide
          className="flex items-center justify-center h-full w-full"
          key={index}
        >
          <div className="flex flex-col w-full h-full gap-4">
            <img
              src={img.url}
              alt={"Slide image"}
              style={{
                width: "100%",
                height: `${noTitle ? "100%" : "80%"}`,
                objectFit: "cover",
              }}
              className="rounded-md w-full h-full object-cover"
            />
            {!noTitle && img.alt && (
              <p className="text-xl truncate mx-2">{img.alt}</p>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default LoginSwiperSection;
