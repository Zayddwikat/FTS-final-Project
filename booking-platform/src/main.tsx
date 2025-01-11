import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import LoginPage from "./login/loginPage.js";
import { LoginProvider } from "./login/loginForm/Context/loginContext";
import IndexPage from "./indexPage/indexPage";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import HomePage from "./user/homePage/homePage.js";
import { SearchProvider } from "./user/homePage/component/SearchBar/component/searchContextApi.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPage from "./user/searchPage/searchPage.js";
import { HotelPage } from "./user/hotelPage/hotel.js";
import { CartProvider } from "./user/cartDialog/checkOutCheckInPage/cartContext.js";
import { CartPage } from "./user/cartDialog/cartPage.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AdminHomePage } from "./admin/adminHomePage.js";
import { HotelPageAdmin } from "./admin/hotelPage/hotelPageAdmin.js";
import { AdminHomeCities } from "./admin/cityPage/adminHomeCities.js";
import { AmenitiesOption } from "./admin/amenitiesPage/hotelAmenities/amenitiesOption.js";
import { CityProvider } from "./admin/cityPage/context/cityContext.js";
import { AdminSearch } from "./admin/component/adminSearchBar.js";
import { SelectHotelToShowRoom } from "./const/constantJSX.js";
import { ReservationPage } from "./user/reservationPage/reservationPage.js";
import { HotelProvider } from "./admin/hotelPage/context/hotelContext.js";
import { ImageProvider } from "./admin/photosPage/context/imageContext.js";
import { RoomProvider } from "./admin/roomPage/context/roomContext.js";
import { HotelRooms } from "./admin/roomPage/hotelRooms.js";
import { HotelPhotos } from "./admin/photosPage/hotelPhotos/hotelPhotos.js";
import { CityPhotos } from "./admin/photosPage/cityPhotos/cityPhotos.js";
import { AmenitiesProvider } from "./admin/amenitiesPage/context/amenitiesContext.js";
import { AmenitiesPage } from "./admin/amenitiesPage/roomAmenities/amenitiesPage.js";
import { TableContent } from "./admin/amenitiesPage/hotelAmenities/tableContent.js";
import { AmenitiesPageRoom } from "./admin/amenitiesPage/roomAmenities/amenitiesPageRoom.js";
import { AmenitiesInformation } from "./data_models/amenitiesInformation.js";
import { PhotoMainPage } from "./admin/photosPage/mainPagePhotos.js";
import { RoomPhotos } from "./admin/photosPage/roomPhotos/roomPhotos.js";

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
    path: "/reservation",
    element: (
      <CartProvider>
        <ReservationPage />
      </CartProvider>
    ),
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
                <TableContent
                  data={[]}
                  handleOpenDialog={function (
                    prop: AmenitiesInformation
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                  handleOpenEditDialog={function (
                    prop: AmenitiesInformation
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                />
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
          <Elements stripe={stripePromise}>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </Elements>
        </LoginProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
