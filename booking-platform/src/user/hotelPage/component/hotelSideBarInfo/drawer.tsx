import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Button } from "../../../../login/loginForm/loginButton";
import { ListReviews } from "../Reviews/sideBarReview/listReviews";
import PostObjectInformation from "../../../../data_models/postObjectInfo";

export type Anchor = "right";

interface ReviewsProps {
  post: PostObjectInformation;
}

export const Reviews: React.FC<ReviewsProps> = ({ post }) => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <>
      {(["right"] as const).map((anchor) => (
        <div key={anchor}>
          <Button
            className=""
            color=""
            handleClick={toggleDrawer(anchor, true)}
            size="small"
            value="Reviews"
            primary={false}
            isSubmitting={false}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <ListReviews post={post} onClose={toggleDrawer} />
          </Drawer>
        </div>
      ))}
    </>
  );
};
