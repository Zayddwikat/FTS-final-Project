import { useQuery } from "@tanstack/react-query";
import PostObjectInformation from "../../../data_module/postObjectInfo";
import { getHotelGallery } from "../Hooks/useGetHotelsGallery";
import { ErrorPage } from "../../../ErrorPage";
import { LoadingScreen } from "../../../component/LoadingPage";
import { LoginSwiperSection } from "../../../Login/component/LoginSwiperSection";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
} from "swiper/modules";

export interface ImgObject {
  id: number;
  url: string;
}

export const HotelGalleryContainer: React.FC<any> = ({
  post,
}: {
  post: PostObjectInformation;
}) => {
  const hotelGallery = useQuery({
    queryKey: ["hotelGallery", post.hotelId],
    queryFn: () => {
      return getHotelGallery({ post });
    },
  });
  if (hotelGallery.error) return <ErrorPage />;
  if (hotelGallery.isLoading) return <LoadingScreen />;

  return (
    <div className="w-full h-full flex  flex-col gap-2">
      <div className="w-full flex flex-row gap-1 ">
        <div className="w-full flex flex-row flex-wrap w-4/12  gap-1">
          {hotelGallery.data.slice(0, 2).map((img: ImgObject) => {
            return (
              <div className="flex flex-row flex-wrap aspect-video">
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={img.url}
                  className="rounded-md"
                  alt="hotel gallery"
                />
              </div>
            );
          })}
        </div>
        <div className="w-full flex flex-row flex-wrap w-11/12  gap-1">
          {hotelGallery.data.slice(2, 3).map((img: ImgObject) => {
            return (
              <div className="flex flex-col aspect-video w-[35dvw] flex-wrap ">   
                <LoginSwiperSection imgs={hotelGallery.data} noTitle={true} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row h-[17%]">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={6}
          loop={true}
          autoplay={{ delay: 4000 }}
        >
          {hotelGallery.data.slice(3).map((img: ImgObject) => (
            <SwiperSlide key={img.id}>
              <div className="md:w-[10dvw] h-full p-2">
                <img
                  src={img.url}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  className="rounded px-4"
                  alt="hotel Photos"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
