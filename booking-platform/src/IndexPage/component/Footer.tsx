import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { Button } from "../../login/component/loginButton";
import Gift from "../assets/Gift.png";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="flex flex-row items-start self-center justify-between border border-black rounded-md p-4 md:w-[50dvw]  gap-2 text-md">
      <div className="flex flex-col items-start w-[60%]">
        <p className="text-lg font-bold ">Sign in, Save Money</p>
        <p className="line-clamp-2 text-sm font-light">
          Save 10% or more at participating properties – just look for the blue
          Genius label
        </p>
        <Box sx={{ pt: 0.5 }}>
          <Button
            className=""
            isSubmitting={false}
            size=""
            color="blue"
            handleClick={() => navigate("/login")}
            value={"Sign In"}
            children={undefined}
            primary={true}
          />
        </Box>
      </div>
      <img src={Gift} alt="Gift" />
    </footer>
  );
}
