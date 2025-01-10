import { useQuery } from "@tanstack/react-query";
import { useGetReview } from "../Hooks/useGetReviews";
import { LoadingScreen } from "../../../component/loadingPage";
import { ErrorPage } from "../../../ErrorPage";
import ReviewObjectInfo from "../../../data_module/ReviewsObjectInfo";
import PostObjectInformation from "../../../data_module/postObjectInfo";
import { Avatar, Divider } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import { ReviewPopOver } from "./reviewPopOveer";

export const ReviewPostPrimary: React.FC<PostObjectInformation> = (post) => {
  const [openCheckOut, setOpenCheckOut] = useState<number | null>(null);

  const handleOpenCheckOut = (index: number) => {
    setOpenCheckOut(index);
  };

  const handleCloseCheckOut = () => {
    setOpenCheckOut(null);
  };

  const reviewQueryPrimary = useQuery({
    queryKey: ["reviewsPrimary", post.hotelId],
    queryFn: async () => await useGetReview({ post }),
  });

  const handleReadMoreClicked = (index: number) => {
    handleOpenCheckOut(index);
  };

  if (reviewQueryPrimary.isLoading) return <LoadingScreen />;
  if (reviewQueryPrimary.error) return <ErrorPage />;

  return (
    <div className="p-4">
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        loop={true}
      >
        {reviewQueryPrimary.data.map(
          (review: ReviewObjectInfo, index: number) => (
            <SwiperSlide
              key={index}
              className="p-4 border rounded-md flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Avatar>{review.customerName[0]}</Avatar>
                <span className="font-semibold">{review.customerName}</span>
              </div>
              <div>
                <p className="line-clamp-2 mx-4">{review.description}</p>
                <button
                  onClick={() => handleReadMoreClicked(index)}
                  className="mt-2 text-blue-500 underline"
                >
                  Read more
                </button>
                <ReviewPopOver
                  review={review}
                  handleClose={handleCloseCheckOut}
                  open={openCheckOut === index}
                />
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};