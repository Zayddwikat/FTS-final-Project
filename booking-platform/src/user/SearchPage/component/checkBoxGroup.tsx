import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import useFilterSelected from "../hooks/filterHooks";
import { FormikProps } from "formik";

interface CheckBoxProps {
  formik: FormikProps<any>;
  filters: Array<string>;
  data: object;
}

export const CheckBoxesGroup: React.FC<CheckBoxProps> = ({
  filters,
  formik,
  data,
}) => {
  const { onFilteredAdded } = useFilterSelected();
  console.log(formik.values);
  return (
    <Box>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Most Used Filter</FormLabel>
        <FormGroup>
          <div className="flex md:flex-row lg:flex-col ">
            {filters.map((elem, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    value={false}
                    name={elem}
                    onChange={(e, value) => {
                      // e.target.value = value;
                      formik.setFieldValue(
                        elem,
                        e.target.value === "false" ? false : true
                      );
                      // onFilteredAdded({formik.values, data});
                      console.log(elem + "checked " + formik.values[elem]);
                    }}
                  />
                }
                label={elem}
              />
            ))}
          </div>
        </FormGroup>
      </FormControl>
    </Box>
  );
};
