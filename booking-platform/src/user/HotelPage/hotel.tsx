// HotelPage.tsx
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useHotel } from "./Hooks/useGetHotel";
import { LoadingScreen } from "../../component/LoadingPage";
import { ErrorPage } from "../../ErrorPage";
import { CartProvider } from "../Context/cartContext";
import { HeaderSection } from "./component/hotelPageComponent/HeaderSection";
import { HotelDetails } from "./component/hotelPageComponent/HotelDetails";
import { HotelSidebar } from "./component/hotelPageComponent/HotelSidebar";
import { AvailableRoomsSection } from "./component/hotelPageComponent/AvailableRoomsSection";
import { ReviewsSection } from "./component/hotelPageComponent/ReviewsSection";

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
