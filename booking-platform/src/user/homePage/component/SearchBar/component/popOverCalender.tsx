import PropTypes from "prop-types";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

interface PopOverProps {
  children: React.ReactNode;
  anchorElement: HTMLButtonElement | null;
  setAnchorElement: (params: HTMLButtonElement | null) => void;
}

export const PopOver: React.FC<PopOverProps> = ({
  anchorElement,
  setAnchorElement,
  children,
}) => {
  const open = Boolean(anchorElement);
  const id = open ? "simple-popover" : undefined;
  const handleClose = () => {
    console.log("in Close");
    setAnchorElement(null);
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorElement}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 2 }}>{children}</Typography>
    </Popover>
  );
};
export default PopOver