import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import BedIcon from "@mui/icons-material/Bed";

export default function Header() {
  return (
    <>
      <header className="bg-orange-400 flex flex-row w-full items-center justify-between">
        <Link
          to={"/Home"}
          className="text-2xl font-bold flex items-center mx-4 my-2 gap-2"
        >
          <HomeIcon fontSize="large" />
          VBook
        </Link>{" "}
        <div className="mx-4 flex flex-row items-center">
          <Link
            to={"/Home"}
            className="text-xl font-bold flex items-center gap-2"
          >
            <BedIcon fontSize="medium" />
            Hotels
          </Link>
        </div>
      </header>
    </>
  );
}
