import { Outlet, useLocation } from "react-router-dom";
import { AdminSearch } from "../../component/adminSearchBar";
import { AmenitiesProvider } from "../context/amenitiesContext";
import { lazy, memo } from "react";

const AllAmenities = memo(lazy(() => import("../hotelAmenities/allAmenities")));

export const AmenitiesPage: React.FC<any> = () => {
  const { state } = useLocation();
  return (
    <main className="w-auto flex-1 flex flex-col items-center justify-center my-4">
      <header className=" ">
        <AdminSearch />
      </header>
      {state ? (
        <Outlet />
      ) : (
        <AmenitiesProvider>
          <AllAmenities />
        </AmenitiesProvider>
      )}
    </main>
  );
};
