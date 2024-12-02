import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BadgeIcon from "@mui/icons-material/Badge";
import PropTypes from "prop-types";
import React, { ReactNode } from "react";
import { FormikProps } from "formik";

interface userNameFieldProp {
  label: string;
  error?: string;
  formik: FormikProps<any>;
}

export const UserNameField: React.FC<userNameFieldProp> = ({
  label,
  error,
  formik,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", gap: "5px" }}>
      <BadgeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        className="input-with-sx w-[70dvw] md:w-[20dvw]"
        id="userName"
        label={label}
        name="userName"
        error={error ? true : false}
        variant="standard"
        onChange={formik.handleChange}
        helperText={error !== null}
      />
    </Box>
  );
};
