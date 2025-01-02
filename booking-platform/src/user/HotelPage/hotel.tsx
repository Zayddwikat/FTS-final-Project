import { useLocation } from "react-router-dom";
import Header from "../HomePage/component/header";
import { SearchBar } from "../HomePage/component/SearchBar";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { useHotel } from "./Hooks/useGetHotel";
import SimpleMap from "../GoogleMaps/Googlemaps";
import { ErrorPage } from "../../ErrorPage";
import { FacilitiesList } from "./component/facilitiesList";
import { AvailableRooms } from "./component/availableRooms";
import { LoadingScreen } from "../../component/LoadingPage";
import PostObjectInformation from "../../classes/postObjectInfo";
import { HotelGalleryContainer } from "./component/imageContainer";
import { Reviews } from "./component/Drawer";
import { CartProvider } from "../Context/cartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { ReviewPost } from "./component/ReviewPost";
import { ReviewPostPrimary } from "./component/reviewPostPrimary";

interface locationInfo {
  post: PostObjectInformation;
  searchValue: any;
}

export const HotelPage: React.FC<any> = () => {
  const location = useLocation();
  const { post, searchValue }: locationInfo = location.state || {};
  const HotelQuery = useQuery({
    queryKey: ["hotel", post.hotelId],
    queryFn: () => {
      return useHotel(post.hotelId);
    },
  });

  if (HotelQuery.isLoading) return <LoadingScreen />;
  if (HotelQuery.error) return <ErrorPage />;

  return (
    <CartProvider>
      <main className="flex flex-col items-center">
        <Header />
        <SearchBar cityTextField={true} data={undefined} searchValues={searchValue} />

        <main className="flex flex-col lg:flex-row items-start justify-start w-full lg:w-3/4">
          {/* Left Column */}
          <div className="flex flex-col gap-4 w-full lg:w-2/3 px-4 py-6">
            <article className="flex flex-col items-start">
              <Box sx={{ pt: 1 }}>
                <h1 className="text-2xl font-bold">{HotelQuery.data.hotelName}</h1>
              </Box>
            </article>

            {/* Hotel Gallery */}
            <div className="w-full h-[60vh] md:h-[65vh] lg:h-[50vh]">
              <HotelGalleryContainer post={post} />
            </div>

            {/* Description */}
            <article className="mx-2 mb-4 text-sm">
              <p>{HotelQuery.data.description}</p>
            </article>

            {/* Popular Facilities */}
            <article className="mx-2 w-full">
              <h2 className="text-xl font-semibold">Most popular facilities</h2>
              <FacilitiesList dataArr={HotelQuery.data.amenities} />
            </article>
          </div>

          {/* Right Column */}
          <article className="flex flex-col gap-4 w-full lg:w-1/3 bg-white border border-gray-300 p-4 rounded-md shadow-lg">
            {/* Star Rating */}
            <div className="flex justify-between items-center border-b pb-2">
              <p className="text-sm px-2 py-1 rounded-md">
                {post.starRating ? (post.starRating * 2 > 9.5 ? "Excellent" : post.starRating * 2 > 8 ? "Very Good" : post.starRating * 2 > 6 ? "Good" : "Traditional") : post.hotelStarRating * 2 > 9.5 ? "Excellent" : post.hotelStarRating * 2 > 8 ? "Very Good" : post.hotelStarRating * 2 > 6 ? "Good" : "Traditional"}
              </p>
              <p className="text-md border text-white bg-blue-700 p-0.5 rounded-md">
                {post.starRating ? post.starRating * 2 : post.hotelStarRating * 2}
              </p>
            </div>

            {/* Available Rooms */}
            <div className="flex justify-between items-center py-2 border-b">
              <h3 className="text-lg">Available Rooms</h3>
              <p className="bg-blue-600 text-white p-1 rounded-md">
                {HotelQuery.data.availableRooms}
              </p>
            </div>

            {/* Hotel Location Map */}
            <SimpleMap lat={HotelQuery.data.latitude} lng={HotelQuery.data.longitude} />

            {/* Reviews */}
            <div className="mt-4">
              <Reviews post={post} />
            </div>
          </article>
        </main>

        {/* Divider */}
        <div className="w-full border-t my-6"></div>

        {/* Available Rooms Section */}
        <div className="w-full px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
          <AvailableRooms
            hotel={post}
            checkIn={searchValue.CheckIn}
            checkOut={searchValue.CheckOut}
            searchOption={searchValue}
          />
        </div>

        {/* Reviews Section */}
        <div className="w-full px-4 md:px-8 lg:px-16 mt-8 mb-20">
          <ReviewPostPrimary {...post} />
        </div>
      </main>
    </CartProvider>
  );
};
