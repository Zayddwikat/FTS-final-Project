import { Outlet } from "react-router-dom";
import { AdminSearch } from "../AdminSearchBar";
import { CityOptions } from "../CityOptions";
import { AmenitiesOption } from "./component/amenitiesOption";
import { AmenitiesPageRoom } from "./component/AmenitiesPageRoom";

export const AmenitiesPage: React.FC<any> = () => {
  return (
    <main className="w-auto flex-1 flex flex-col items-center justify-center my-4">
      <header className=" ">
        <AdminSearch />
      </header>
      <Outlet />
    </main>
  );
};
