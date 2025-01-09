import { AdminSearch } from "./adminSearchBar";
import { CityOptions } from "./cityOptions";

export const AdminHomeCities: React.FC<any> = () => {
  return (
    <main className="w-auto flex-1 flex flex-col items-center justify-center my-4">
      <header className=" ">
        <AdminSearch />
      </header>
      <CityOptions />
    </main>
  );
};
