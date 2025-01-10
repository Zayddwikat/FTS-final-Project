// HotelPage.tsx
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useHotel } from "./Hooks/useGetHotel";
import { LoadingScreen } from "../../component/loadingPage";
import { ErrorPage } from "../../ErrorPage";
import { CartProvider } from "../cartDialog/checkOutCheckInPage/cartContext";
import { HeaderSection } from "./component/header/headerSection";
import { HotelDetails } from "./component/hotelDetails/hotelDetails";
import { HotelSidebar } from "./component/hotelSideBarInfo/hotelSidebar";
import { AvailableRoomsSection } from "./component/availableRooms/availableRoomsSection";
import { ReviewsSection } from "./component/Reviews/reviewsSection/reviewsSection";

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
          <HotelDetails post={post} hotelData={HotelQuery.data} />
          <HotelSidebar post={post} hotelData={HotelQuery.data} />
        </main>
        <div className="w-full border-t my-6"></div>
        <AvailableRoomsSection hotel={post} searchValue={searchValue} />
        <ReviewsSection post={post} />
      </main>
    </CartProvider>
  );
};
