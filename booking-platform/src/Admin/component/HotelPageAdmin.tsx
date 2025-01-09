import { useLocation } from "react-router-dom";
import { AdminSearch } from "./adminSearchBar";
import { TableOfContent } from "./TableOfContent";
import { AllHotelsPage } from "./hotels/AllHotelsPage";

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
