import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import PropTypes from "prop-types";
import { FormikProps } from "formik";

interface budgetSliderProps {
  formik: FormikProps<any>;
}

export const BudgetSlider: React.FC<budgetSliderProps> = ({ formik }) => {
  return (
    <>
      {" "}
      <div className="flex flex-row gap-2 items-center justify-between w-full">
        <label htmlFor="budget" className="w-full text-sm">
          Budget{" "}
          <Slider
            min={0}
            max={1000}
            name="budget"
            value={formik.values.budget}
            onChange={formik.handleChange}
            valueLabelDisplay="auto"
          />
        </label>
        <MuiInput
          name="budget"
          value={formik.values.budget}
          size="small"
          onChange={formik.handleChange}
          inputProps={{
            step: 50,
            min: 0,
            max: 1000,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </div>
    </>
  );
};
