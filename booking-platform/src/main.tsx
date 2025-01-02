import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import LoginPage from "./Login/LoginPage.js";
import { LoginProvider } from "./Login/Context/LoginContext.js";
import IndexPage from "./IndexPage/IndexPage.js";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import HomePage from "./user/HomePage/HomePage.js";
import { SearchProvider } from "./user/Context/SearchContextApi.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPage from "./user/SearchPage/SearchPage.js";
import { HotelPage } from "./user/HotelPage/hotel.js";
import { CartProvider } from "./user/Context/cartContext.js";
import { CartPage } from "./user/cartDialog/CartPage.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AdminHomePage } from "./Admin/adminHomePage.js";
import { HotelPageAdmin } from "./Admin/component/HotelPageAdmin.js";
import { AdminHomeCities } from "./Admin/component/AdminHomeCities.js";
import { HotelProvider } from "./Admin/context/hotelContext.js";
import { HotelRooms } from "./Admin/component/hotelrooms.js";
import { RoomProvider } from "./Admin/context/roomcontext.js";
import { AmenitiesPage } from "./Admin/component/Amenities/amenitiesPage.js";
import { AmenitiesProvider } from "./Admin/context/amenitiesContext.js";
import { AmenitiesPageRoom } from "./Admin/component/Amenities/component/AmenitiesPageRoom.js";
import { AmenitiesOption } from "./Admin/component/Amenities/component/amenitiesOption.js";
import { TableContent } from "./Admin/component/Amenities/component/tableContent.js";
import { CityProvider } from "./Admin/context/cityContext.js";
import { AmenitiesInformation } from "./classes/amenitiesInformation.js";
import { RoomPhotos } from "./Admin/component/photosSection/component/roomPhoos.js";
import { PhotoMainPage } from "./Admin/component/photosSection/mainPagePhotos.js";
import { ImageProvider } from "./Admin/context/imageContext.js";
import { HotelPhotos } from "./Admin/component/photosSection/component/hotelPhotos.js";
import { AdminSearch } from "./Admin/component/AdminSearchBar.js";
import { CityPhotos } from "./Admin/component/photosSection/component/CityPhotos.js";
import { roomNotFound } from "./const/constantVariables.js";
import { SelectHotelToShowRoom } from "./const/constantJSX.js";
import { ReservationPage } from "./user/reservationPage/ReservationPage.js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/Login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Home",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/show-more",
    // element: <SearchResult />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search-result",
    element: (
      <SearchProvider>
        <SearchPage />
      </SearchProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: <ReservationPage />,

    errorElement: <ErrorPage />,
  },
  {
    path: "/search-result/Hotels/:hotelId",
    element: <HotelPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/AdminHome",
    element: (
      <HotelProvider>
        <AdminHomePage />,
      </HotelProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/AdminHome/Hotels",
        element: (
          <HotelProvider>
            <ImageProvider>
              <HotelPageAdmin />,
            </ImageProvider>
          </HotelProvider>
        ),
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/AdminHome/Hotels/:city",
            element: <HotelPageAdmin />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "/AdminHome/photos/",
        element: (
          <>
            <main className="w-auto flex-1 flex flex-col items-center justify-center my-4 ">
              <header>
                <AdminSearch />
              </header>
              <ImageProvider>
                <Outlet />
              </ImageProvider>
            </main>
          </>
        ),
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/AdminHome/photos/:hotelId",
            element: <HotelPhotos />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/AdminHome/photos/city/:cityId",
            element: <CityPhotos />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "/AdminHome/:hotelId/Rooms",
        element: (
          <ImageProvider>
            <RoomProvider>
              <HotelRooms />,
            </RoomProvider>
          </ImageProvider>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/AdminHome/Cities",
        element: (
          <CityProvider>
            <AdminHomeCities />,
          </CityProvider>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/AdminHome/amenities",
        element: (
          <AmenitiesProvider>
            <AmenitiesPage />,
          </AmenitiesProvider>
        ),
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/AdminHome/amenities",
            element: (
              <div className="self-start">
                <h1>Please select hotel or room to show the amenities</h1>
                <TableContent data={[]} />
              </div>
            ),
          },
          {
            path: "/AdminHome/amenities/room/:roomId",
            element: <AmenitiesPageRoom />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/AdminHome/amenities/hotel/:Hotel",
            element: <AmenitiesOption />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "/AdminHome/:hotelId/Rooms/:roomId",
        element: (
          <ImageProvider>
            <PhotoMainPage />,
          </ImageProvider>
        ),
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/AdminHome/:hotelId/Rooms/:roomId/photos",
            element: (
              <ImageProvider>
                <RoomPhotos />,
              </ImageProvider>
            ),
          },
        ],
      },
      {
        // add the
        path: "/AdminHome/Rooms",
        element: <SelectHotelToShowRoom />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <LoginProvider>
          <CartProvider>
            <Elements stripe={stripePromise}>
              <RouterProvider router={router} />
            </Elements>
          </CartProvider>
        </LoginProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
