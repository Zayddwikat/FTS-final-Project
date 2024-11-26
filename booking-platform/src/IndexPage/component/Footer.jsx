import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "../../Login/component/LoginButton";
import Gift from "../assets/Gift.png";

export default function Footer() {
  return (
    <footer className="flex flex-row items-start self-center justify-between border border-black rounded-md p-4 md:w-[50dvw]  gap-2 text-md">
      <div className="flex flex-col items-start w-[60%]">
        <p className="text-lg font-bold ">Sign in, Save Money</p>
        <p className="line-clamp-2 text-sm font-light">
          Save 10% or more at participating properties – just look for the blue
          Genius label
        </p>
        <Box sx={{ pt: 0.5 }}>
          <Button color="orange" value={<Link to={"/login"}>Sign In</Link>} />
        </Box>
      </div>
      <img src={Gift} alt="Gift" />
    </footer>
  );
}
