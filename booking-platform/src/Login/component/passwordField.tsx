import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import PasswordIcon from "@mui/icons-material/Password";
import { FormikProps } from "formik";

interface PasswordFieldProps {
  label: string;
  error?: boolean;
  formik: FormikProps<any>;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  error,
  formik,
}) => {
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
        id="password"
        name="password"
        label={label}
        error={error ? true : false}
        variant="standard"
        onChange={formik.handleChange}
        helperText={error ? "incorrect password" : ""}
      />
    </Box>
  );
  //   return <TextField id="outlined-basic" label="Outlined" variant="outlined" />;
};
