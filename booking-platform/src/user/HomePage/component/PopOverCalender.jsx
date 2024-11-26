import PropTypes from "prop-types";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export default function PopOver({ anchorElement, setAnchorElement, children }) {
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
}
PopOver.propTypes = {
  anchorElement: PropTypes.object,
  children: PropTypes.node.isRequired,
  setAnchorElement: PropTypes.func.isRequired,
};
