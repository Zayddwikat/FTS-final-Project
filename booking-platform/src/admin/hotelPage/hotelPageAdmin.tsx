import { useLocation } from "react-router-dom";
import { AdminSearch } from "../component/adminSearchBar";
import { TableOfContent } from "../component/tableOfContent";
import { AllHotelsPage } from "./allHotelsPage";

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
