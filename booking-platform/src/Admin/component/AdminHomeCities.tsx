import { AdminSearch } from "./AdminSearchBar";
import { CityOptions } from "./CityOptions";

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
