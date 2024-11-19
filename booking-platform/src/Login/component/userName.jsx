import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BadgeIcon from "@mui/icons-material/Badge";
import PropTypes from "prop-types";
export default function UserNameField({ label, error, formik }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", gap: "5px" }}>
      <BadgeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        className="input-with-sx w-[70dvw] md:w-[20dvw]"
        id="userName"
        label={label}
        name="userName"
        error={error ? error : null}
        variant="standard"
        onChange={formik.handleChange}
        helperText={error ? error : ""}
      />
    </Box>
  );
  //   return <TextField id="outlined-basic" label="Outlined" variant="outlined" />;
}
UserNameField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  formik: PropTypes.any,
};
