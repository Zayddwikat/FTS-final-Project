import LocationCityIcon from "@mui/icons-material/LocationCity";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import TvIcon from "@mui/icons-material/Tv";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../Login/component/LoginButton";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import RamenDiningIcon from "@mui/icons-material/RamenDining";

export const AdminAside: React.FC<any> = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("ADMIN_TOKEN");
    navigate("/");
  };

  return (
    <aside className="w-[6dvw] px-6 py-2 hover:w-[15dvw] bg-gray-200 rounded">
      <ul className=" h-dvh line-clamp-1 py-6 flex flex-col items-start justify-between gap-8 truncate  ">
        <div className="flex flex-col items-start justify-start gap-8">
          <li className="flex flex-row items-center gap-4">
            <Link
              to={"/AdminHome"}
              className="flex flex-row items-center gap-4"
            >
              <MenuIcon
                sx={{
                  width: "35px",
                  height: "35px",
                }}
              />
              Home
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-row items-center gap-4"
              to={"/AdminHome/Cities"}
            >
              <LocationCityIcon
                sx={{
                  width: "35px",
                  height: "35px",
                }}
              />
              manage cites
            </Link>
          </li>
          <li>
            <Link
              to={"/AdminHome/Hotels"}
              className="flex flex-row items-center gap-4"
            >
              <SingleBedIcon
                sx={{
                  width: "35px",
                  height: "35px",
                }}
              />
              manage Hotels
            </Link>
          </li>
          <li>
            <Link
              to={"/AdminHome/Rooms"}
              className="flex flex-row items-center gap-4"
            >
              <TvIcon
                sx={{
                  width: "35px",
                  height: "35px",
                }}
              />
              manage rooms
            </Link>
          </li>{" "}
          <li>
            <Link
              to={"/AdminHome/amenities"}
              className="flex flex-row items-center gap-4"
            >
              <RamenDiningIcon
                sx={{
                  width: "35px",
                  height: "35px",
                }}
              />
              Amenities
            </Link>
          </li>
        </div>
        <li className="">
          <Link
            to={"/"}
            className="flex flex-row items-center gap-4"
            onClick={handleLogOut}
          >
            <LogoutIcon
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
            Log Out
          </Link>
        </li>
      </ul>
    </aside>
  );
};
