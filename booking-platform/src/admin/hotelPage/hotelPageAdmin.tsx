import { useLocation } from "react-router-dom";
import { AdminSearch } from "../component/adminSearchBar";
import { lazy, memo } from "react";

const AllHotelsPage = memo(lazy(() => import("./allHotel/allHotelsPage")));
const TableOfContent = memo(lazy(() => import("../component/tableOfContent")));

export const HotelPageAdmin: React.FC<any> = () => {
  const { state } = useLocation();

  return (
    <main className="w-auto flex-1 flex flex-col items-center justify-center my-4">
      <header className=" ">
        <AdminSearch />
      </header>
      {state ? <TableOfContent /> : <AllHotelsPage />}
    </main>
  );
};
