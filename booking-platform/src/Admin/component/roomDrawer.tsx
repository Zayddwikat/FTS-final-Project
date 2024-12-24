import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Button } from "../../Login/component/LoginButton";
import { RoomCardDrawer } from "./roomCardDrawer";

export type Anchor = "right";

export const RoomDrawer: React.FC<any> = ({
  hotel,
  room,
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
            <RoomCardDrawer
              setMassage={setMassage}
              hotel={hotel}
              room={room}
              toggleDrawer={toggleDrawer(anchor, false)}
              setOpenSnakeBar={setOpenSnakeBar}
            />
          </Drawer>
        </div>
      ))}
    </>
  );
};
