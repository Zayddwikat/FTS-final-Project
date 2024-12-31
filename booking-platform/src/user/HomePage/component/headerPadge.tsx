import { Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useCartContext } from "../../Context/cartContext";
import { Button } from "../../../Login/component/LoginButton";

export const HeaderBadge: React.FC<any> = () => {
  const { cartItemsNum } = useCartContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("USER_TOKEN");
    navigate("/");
  };

  return (
    <div className=" flex flex-row items-center justify-start gap-4">
      <Link to={"/cart"} className="flex items-center gap-2">
        Cart
        <Badge color="secondary" badgeContent={cartItemsNum}>
          <ShoppingCartCheckoutIcon fontSize="medium" />
        </Badge>
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
