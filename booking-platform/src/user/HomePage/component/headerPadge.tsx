import { Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Button } from "../../../login/component/loginButton";

export const HeaderBadge: React.FC<any> = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("USER_TOKEN");
    navigate("/");
  };

  return (
    <div className=" flex flex-row items-center justify-start gap-4">
      <Link to={"/reservation"} className="flex items-center gap-2">
        Cart
        <ShoppingCartCheckoutIcon fontSize="medium" />
      </Link>

      <Button
        color={""}
        size={"small"}
        value={"Logout"}
        isSubmitting={false}
        handleClick={handleLogout}
        className={""}
        children={undefined}
        primary={true}
      />
    </div>
  );
};
