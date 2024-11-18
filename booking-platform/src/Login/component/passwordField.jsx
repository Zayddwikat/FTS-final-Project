import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import PasswordIcon from "@mui/icons-material/Password";



export default function PasswordField({ label, error }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: `${error ? "center" : "flex-end"}`,
        // backgroundColor: "red",
        gap: "5px",
        height: "calc(max-content + 1em)",
      }}
    >
      <PasswordIcon
        sx={{ color: "action.active", mr: 1, my: 0.5 }}
        style={{
          alignSelf: `${error ? "center" : "end"}`,
          color: `${error ? "action.error" : ""}`,
        }}
      />
      <TextField
        className="w-[70dvw] md:w-[20dvw]"
        type="password"
        id="input-with-sx"
        label={label}
        error={error ? error : null}
        variant="standard"
        helperText={error ? "incorrect password" : ""}
      />
    </Box>
  );
  //   return <TextField id="outlined-basic" label="Outlined" variant="outlined" />;
}
PasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
};
