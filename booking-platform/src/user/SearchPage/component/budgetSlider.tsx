import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import PropTypes from "prop-types";
import { FormikProps } from "formik";
import useFilterSelected from "../hooks/filterHooks";
import { useNavigate } from "react-router-dom";

interface budgetSliderProps {
  formik: FormikProps<any>;
  data: any;
}

export const BudgetSlider: React.FC<budgetSliderProps> = ({ formik, data }) => {
  const { onFilteredAdded } = useFilterSelected();
  return (
    <>
      <label htmlFor="budget2" className="flex gap-4">
        Budget{" "}
        <MuiInput
          name="budget"
          value={formik.values.budget}
          size="small"
          id="budget2"
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseFloat(e.target.value);

            console.log("Input Value", value);
            formik.setFieldValue("budget", value);
            console.log("Formik Values", formik.values);
            console.log("Value updated:", value);
            const res = await onFilteredAdded({ data, formik });
            console.log("Formik Values 2 ", formik.values);

            console.log("this is the res : ", res);
          }}
          inputProps={{
            step: 20,
            min: 0,
            max: 1000,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </label>
    </>
  );
};
