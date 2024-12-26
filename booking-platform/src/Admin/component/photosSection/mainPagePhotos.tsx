import { Outlet } from "react-router-dom";
import { AdminSearch } from "../AdminSearchBar";

export const PhotoMainPage: React.FC<any> = () => {
  return (
    <main className="w-auto flex-1 flex flex-col items-center justify-center my-4 ">
      <header>
        <AdminSearch />
      </header>
      <Outlet />
    </main>
  );
};
