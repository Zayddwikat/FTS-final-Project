import { Divider } from "@mui/material";
import { StepperTextInput } from "../../stepperTextInput";

export const RoomsAdultChildrenSection = ({ formik }) => (
  <main>
    <div className="flex flex-row gap-2 items-start justify-between w-full md:w-auto">
      <StepperTextInput elem="adult" formik={formik} />
      <Divider flexItem />
      <StepperTextInput elem="children" formik={formik} />
    </div>
    <div className="w-full flex items-center justify-between my-2 gap-2">
      <StepperTextInput elem="rooms" formik={formik} />
      <Divider />
      <StepperTextInput elem="Rate" formik={formik} />
    </div>
  </main>
);
