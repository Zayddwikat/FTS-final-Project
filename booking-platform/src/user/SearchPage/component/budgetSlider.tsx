import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { FormikProps } from "formik";
import useFilterSelected from "../hooks/filterHooks";

interface BudgetSliderProps {
  formik: FormikProps<any>;
  data: any;
}

export const BudgetSlider: React.FC<BudgetSliderProps> = ({ formik, data }) => {
  const { onFilteredAdded } = useFilterSelected();

  return (
    <div className="w-full">
      <label
        htmlFor="budget2"
        className="flex flex-col sm:flex-row gap-4 w-full"
      >
        <span className="text-lg font-semibold">Budget</span>
        <div className="flex flex-col sm:flex-row w-full gap-2 items-center">
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
            className="w-full sm:w-32"
          />
        </div>
      </label>
    </div>
  );
};
