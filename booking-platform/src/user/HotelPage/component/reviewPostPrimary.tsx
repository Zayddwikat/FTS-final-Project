import { useQuery } from "@tanstack/react-query";
import { useGetReview } from "../Hooks/useGetReviews";
import { LoadingScreen } from "../../../component/LoadingPage";
import { ErrorPage } from "../../../ErrorPage";
import ReviewObjectInfo from "../../../classes/ReviewsObjectInfo";
import PostObjectInformation from "../../../classes/postObjectInfo";
import { Avatar, Divider } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useState } from "react";
import { ReviewPopOver } from "./ReviewPopOveer";

export const ReviewPostPrimary: React.FC<PostObjectInformation> = (post) => {
  console.log("the post id is : ", post.hotelId);

  const [openCheckOut, setOpenCheckOut] = useState<number | null>(null);

  const openCheckInDialog = (index: number) => {
    handleOpenCheckOut(index);
  };

  const handleOpenCheckOut = (index: number) => {
    setOpenCheckOut(index);
  };
  const handleCloseCheckOut = (index: number) => {
    setOpenCheckOut(null);
  };

  const reviewQueryPrimary = useQuery({
    queryKey: ["reviewsPrimary", post.hotelId],
    queryFn: async () => {
      return await useGetReview({ post });
    },
  });
  const handleReadMoreClicked = (index: number) => {
    handleOpenCheckOut(index);
  };
  if (reviewQueryPrimary.isLoading) return <LoadingScreen />;
  if (reviewQueryPrimary.error) return <ErrorPage />;
  return (
    <Swiper
      className=" "
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={2}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      autoplay={{ delay: 300 }}
      pagination={{ clickable: true }}
      navigation
    >
      <div className="flex flex-row md:flex-row lg:flex-row gap-2   p-2  items-center justify-center ">
        {reviewQueryPrimary.data.map(
          (review: ReviewObjectInfo, index: number) => {
            return (
              <SwiperSlide
                key={index}
                className="border rounded-md flex flex-row md:flex-col lg:flex-col gap-20  border-black rounded p-4 py-8"
              >
                <div className="flex gap-2  justify-start w-full">
                  <Avatar
                    sx={{
                      width: 25,
                      height: 25,
                    }}
                  >
                    {review.customerName[0]}
                  </Avatar>
                  {review.customerName}
                </div>
                <Divider orientation="vertical" flexItem />
                <div>
                  <p className="line-clamp-1">{review.description}</p>
                  <p
                    onClick={() => {
                      handleReadMoreClicked(index);
                    }}
                    className="underline text-blue-500 cursor-pointer"
                  >
                    read more
                  </p>
                  <ReviewPopOver
                    review={review}
                    handleClose={handleCloseCheckOut}
                    open={openCheckOut === index}
                  />
                </div>
              </SwiperSlide>
            );
          }
        )}
      </div>
    </Swiper>
  );
};
