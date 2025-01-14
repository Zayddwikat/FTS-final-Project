import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
}) => {
  const { onFilterChange } = useFilterSelected();

  return (
    <Box>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Most Used Filter</FormLabel>
        <FormGroup>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
            {filters.map((elem: string, index: number) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    value={formik.values[elem]}
                    name={elem}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>,
                      value: any
                    ) => {
                      console.table("first", formik.values);
                      const newValue = !formik.values[elem];
                      formik.setFieldValue(elem, newValue);
                      console.table("second", formik.values);
                      onFilterChange(formik);
                      console.log("Stepper Value:", value);
                      console.log(
                        "Updated Formik Value (Predicted):",
                        newValue
                      );
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
export default CheckBoxesGroup;
