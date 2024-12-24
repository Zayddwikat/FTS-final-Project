import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { HeaderBadge } from "./headerPadge";

export default function Header() {
  return (
    <>
     
        <header className="bg-blue-400 flex flex-row w-full items-center justify-between">
          <Link
            to={"/Home"}
            className="text-2xl font-bold flex items-center mx-4 my-2 gap-2"
          >
            <HomeIcon fontSize="large" />
            VBook
          </Link>{" "}
          <HeaderBadge />
        </header>
      
    </>
  );
}
