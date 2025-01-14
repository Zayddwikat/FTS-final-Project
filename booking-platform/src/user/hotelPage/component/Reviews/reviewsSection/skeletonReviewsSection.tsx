import Skeleton from "@mui/material/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const SkeletonReviewPostPrimary: React.FC = () => {
  const skeletonSlides = Array.from({ length: 3 }); // Adjust the number of slides as needed

  return (
    <div className="p-4">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop={true}
      >
        {skeletonSlides.map((_, index) => (
          <SwiperSlide
            key={index}
            className="p-4 border rounded-md flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" width="60%" />
            </div>
            <div>
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="40%" className="mt-2" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SkeletonReviewPostPrimary;
