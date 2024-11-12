import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BadgeIcon from "@mui/icons-material/Badge";
import PropTypes from "prop-types";
export default function UserNameField({ label, error }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <BadgeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        id="input-with-sx"
        label={label}
        error={error ? error : null}
        variant="standard"
        helperText={error ? error : ""}
      />
    </Box>
  );
  //   return <TextField id="outlined-basic" label="Outlined" variant="outlined" />;
}
UserNameField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};
