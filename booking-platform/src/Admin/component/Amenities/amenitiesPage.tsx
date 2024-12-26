import { Outlet, useLocation } from "react-router-dom";
import { AdminSearch } from "../AdminSearchBar";
import { CityOptions } from "../CityOptions";
import { AmenitiesOption } from "./component/amenitiesOption";
import { AmenitiesPageRoom } from "./component/AmenitiesPageRoom";
import { AllAmenities } from "./component/allAmenities";
import { AmenitiesProvider } from "../../context/amenitiesContext";

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
      {/* <Outlet /> */}
    </main>
  );
};
