import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useCartContext } from "../../Context/cartContext";

export const HeaderBadge: React.FC<any> = () => {
  const { cartItemsNum } = useCartContext();
  return (
    <>
      <div className="mx-4 flex flex-row items-center">
        <Link to={"/cart"} className="  flex items-center gap-2">
          Cart
          <Badge color="secondary" badgeContent={cartItemsNum}>
            <ShoppingCartCheckoutIcon fontSize="medium" />
          </Badge>
        </Link>
      </div>
    </>
  );
};
