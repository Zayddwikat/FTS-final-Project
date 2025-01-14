// HotelPage.tsx
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useHotel } from "./Hooks/useGetHotel";
import { LoadingScreen } from "../../component/loadingPage";
import { ErrorPage } from "../../ErrorPage";
import { CartProvider } from "../cartDialog/checkOutCheckInPage/cartContext";
import { lazy, memo, Suspense } from "react";
import SkeletonHotelDetails from "./component/hotelDetails/hotelDetailsSkeletonPage";
import SkeletonHotelSidebar from "./component/hotelSideBarInfo/hotelSideBarSkeleton";
import SkeletonAvailableRooms from "./component/availableRooms/skeletonAvailableRooms";
import SkeletonReviewPostPrimary from "./component/Reviews/reviewsSection/skeletonReviewsSection";

const HeaderSection = memo(
  lazy(() => import("./component/header/headerSection"))
);
const HotelDetails = memo(
  lazy(() => import("./component/hotelDetails/hotelDetails"))
);

const HotelSidebar = memo(
  lazy(() => import("./component/hotelSideBarInfo/hotelSidebar"))
);
const AvailableRoomsSection = memo(
  lazy(() => import("./component/availableRooms/availableRoomsSection"))
);

const ReviewsSection = memo(
  lazy(() => import("./component/Reviews/reviewsSection/reviewsSection"))
);

import("./component/header/headerSection");
import("./component/hotelDetails/hotelDetails");


export const HotelPage: React.FC<any> = () => {
  const location = useLocation();
  const { post, searchValue }: any = location.state || {};
  const HotelQuery = useQuery({
    queryKey: ["hotel", post.hotelId],
    queryFn: () => useHotel(post.hotelId),
  });

  if (HotelQuery.isLoading) return <LoadingScreen />;
  if (HotelQuery.error) return <ErrorPage />;

  return (
    <CartProvider>
      <main className="flex flex-col items-center">
        <HeaderSection searchValue={searchValue} />
        <main className="flex flex-col lg:flex-row items-start justify-start w-full lg:w-3/4">
          <Suspense fallback={<SkeletonHotelDetails />}>
            <HotelDetails post={post} hotelData={HotelQuery.data} />
          </Suspense>
          <Suspense fallback={<SkeletonHotelSidebar />}>
            <HotelSidebar post={post} hotelData={HotelQuery.data} />
          </Suspense>
        </main>
        <div className="w-full border-t my-6"></div>
        <Suspense fallback={<SkeletonAvailableRooms />}>
          <AvailableRoomsSection hotel={post} searchValue={searchValue} />
        </Suspense>
        <Suspense fallback={<SkeletonReviewPostPrimary />}>
          <ReviewsSection post={post} />
        </Suspense>
      </main>
    </CartProvider>
  );
};
