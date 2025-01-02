import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { HeaderBadge } from "./headerPadge";
import { useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-500 flex flex-col sm:flex-row items-center justify-between w-full py-4 px-6 shadow-lg">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <Link
          to={"/Home"}
          className="text-3xl font-bold text-white flex items-center gap-2"
        >
          <HomeIcon fontSize="large" />
          VBook
        </Link>

        <button className="sm:hidden text-white" onClick={toggleMenu}>
          <MenuOutlinedIcon fontSize="large" />
        </button>
      </div>

      <div
        className={`flex flex-row sm:flex-row items-center gap-6 sm:gap-10 mt-4 sm:mt-0 ${
          isMenuOpen ? "block" : "hidden sm:flex"
        }`}
      >
        <HeaderBadge />
      </div>
    </header>
  );
}
