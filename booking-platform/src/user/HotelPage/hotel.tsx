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
      // return Promise.reject();
      return useHotel(post.hotelId);
    },
  });

  if (HotelQuery.isLoading) return <LoadingScreen />;
  () => console.log(HotelQuery.error);
  if (HotelQuery.error) return <ErrorPage />;

  return (
    <CartProvider>
      <main className="flex  flex-col justify-center items-center">
        <Header />
        <SearchBar cityTextField={true} />
        <main className="flex flex-col md:flex-row lg:flex-row items-start justify-start  w-[75dvw]">
          <div className="flex flex-col justify-start items-start gap-2 w-[90%] ">
            <article className="flex flex-col mx-2  items-center justify-center">
              <Box sx={{ pt: 1 }}>
                <h1 className="text-2xl ">{HotelQuery.data.hotelName}</h1>
              </Box>
            </article>
            <div className="flex gap-2 w-full md:h-[65dvh]">
              <div className="lg:w-[100%] md:w-[100%] w-full p-2 h-full ">
                <HotelGalleryContainer post={post} />
              </div>
            </div>
            <article className="mx-2 mb-4">
              <p>{HotelQuery.data.description}</p>
            </article>
            <article className="mx-2 w-full">
              <h2 className="text-xl">Most popular facilities</h2>
              <FacilitiesList dataArr={HotelQuery.data.amenities} />
            </article>
          </div>
          <article className=" flex flex-col md:flex-col w-full md:w-[30%] rounded h-fit my-20 ">
            <div className="border flex flex-col md:flex-row border-b-0 border-black w-full items-end justify-end rounded h-fit py-1 px-4">
              <div className="flex flex-row items-center ">
                <p className="text-sm px-2 rounded-md">
                  {post.starRating
                    ? post.starRating * 2 > 9.5
                      ? "Excellent"
                      : post.starRating * 2 > 8
                      ? "Very Good"
                      : post.starRating * 2 > 6
                      ? "Good"
                      : "Traditional"
                    : post.hotelStarRating * 2 > 9.5
                    ? "Excellent"
                    : post.hotelStarRating * 2 > 8
                    ? "Very Good"
                    : post.hotelStarRating * 2 > 6
                    ? "Good"
                    : "Traditional"}
                </p>
                <p className="text-md border text-white bg-blue-700 p-0.5 rounded-md">
                  {post.starRating
                    ? post.starRating * 2
                    : post.hotelStarRating * 2}{" "}
                </p>
              </div>
            </div>
            <div className="border flex flex-row border-black w-full items-end justify-end rounded h-fit py-1 px-4 mb-2">
              <div className="flex flex-row items-center gap-4 ">
                <h3>Available Rooms</h3>
                <p className="bg-blue-600 text-white p-0.5 rounded-md">
                  {HotelQuery.data.availableRooms}
                </p>
              </div>
            </div>
            <SimpleMap
              lat={HotelQuery.data.latitude}
              lng={HotelQuery.data.longitude}
            />
            <div className="mt-2 flex flex-row items-center justify-start">
              <Reviews post={post} />
            </div>
          </article>
        </main>
        <div className="w-9/12 border border-grey border w-full mt-4 "></div>
        <div className="md:w-[90dvw] w-full mt-4 md:flex ">
          <h2 className="text-2xl md:w-[30%] self-start ">Available Rooms</h2>
          <AvailableRooms
            hotel={post}
            checkIn={searchValue.CheckIn}
            checkOut={searchValue.CheckOut}
            searchOption={searchValue}
          />
        </div>
        <div className="w-[90dvw] mb-10">
          <ReviewPostPrimary {...post} />
        </div>
      </main>
    </CartProvider>
  );
};
