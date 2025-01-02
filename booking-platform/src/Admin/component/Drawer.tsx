import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Button } from "../../Login/component/LoginButton";
import { AdminHotelCard } from "./AdminHotelCard";
import { ImageProvider } from "../context/imageContext";

export type Anchor = "right";

export const DrawerDrawer: React.FC<any> = ({
  city,
  hotel,
  setOpenSnakeBar,
  setMassage,
}) => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      console.log(`Toggling drawer: ${anchor}, Open: ${open}`);
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
            className="no-underline"
            color="blue"
            handleClick={toggleDrawer(anchor, true)}
            size=""
            value="Show info"
            isSubmitting={false}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{
              "& .MuiBackdrop-root": {
                backgroundColor: "rgba(0, 0, 0, 0.01)",
              },
            }}
          >
          
              <AdminHotelCard
                setMassage={setMassage}
                hotel={hotel}
                city={city}
                toggleDrawer={toggleDrawer(anchor, false)}
                setOpenSnakeBar={setOpenSnakeBar}
              />
          
          </Drawer>
        </div>
      ))}
    </>
  );
};
