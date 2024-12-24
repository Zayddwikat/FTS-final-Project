import { Outlet, useNavigate } from "react-router-dom";
import { AdminAside } from "./Aside/AsideAdmin";
import { useState } from "react";

export const AdminHomePage: React.FC<any> = () => {
  if (!localStorage.getItem("ADMIN_TOKEN"))
    return <h1>You Don't have Credential</h1>;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="flex flex-row items-center justify-start  h-dvh overflow-hidden">
      <aside
        className={`transition-all duration-700 ${
          isHovered ? "w-72" : "w-20"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AdminAside />
      </aside>
      <div className="self-start flex flex-1  ">
        <Outlet />
      </div>
    </main>
  );
};
