import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BadgeIcon from "@mui/icons-material/Badge";
import PropTypes from "prop-types";
import React, { ReactNode } from "react";
import { FormikProps } from "formik";

interface userNameFieldProp {
  label: string;
  error?: string | boolean;
  formik: FormikProps<any>;
  primary?: boolean;
  id: string;
}

export const UserNameField: React.FC<userNameFieldProp> = ({
  label,
  error,
  formik,
  primary,
  id,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", gap: "5px" }}>
      {primary ? (
        <BadgeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      ) : (
        <></>
      )}
      <TextField
        className="input-with-sx w-[70dvw] md:w-full"
        id={id}
        label={label}
        name={id}
        error={error ? true : false}
        variant="standard"
        onChange={formik.handleChange}
        helperText={
          error ? "incorrect user name or this input is required" : ""
        }
      />
    </Box>
  );
};
export default UserNameField;
