import { Dispatch, SetStateAction, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Button } from "../../../login/loginForm/loginButton";
import { CityInformationDrawer } from "./cityInformationDrawer";
import { CityInformation } from "../../../data_models/cities";

export type Anchor = "right";

interface cityDrawerProps {
  city: CityInformation;
  setCities: (prop: any) => void;
  setOpenSnackBar: Dispatch<SetStateAction<boolean>>;
}

const CityDrawer: React.FC<cityDrawerProps> = ({
  city,
  setCities,
  setOpenSnackBar,
}) => {
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
            className="no-underline"
            color="blue"
            handleClick={toggleDrawer(anchor, true)}
            size=""
            value="Show info "
            isSubmitting={false}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <CityInformationDrawer
              toggleDrawer={toggleDrawer(anchor, false)}
              city={city}
              setCities={setCities}
              setOpenSnackBar={setOpenSnackBar}
            />
          </Drawer>
        </div>
      ))}
    </>
  );
};

export default CityDrawer;
