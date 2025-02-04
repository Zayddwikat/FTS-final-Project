import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { lazy, Suspense } from "react";
import { LoadingScreen } from "../../../../../component/loadingPage";

const Button = lazy(() => import("../../../../../login/loginForm/loginButton"));

export const CheckInCheckOutSection = ({ formik, handleClose }) => (
  <div className="flex flex-col gap-4">
    <main>
      <div className="flex flex-col items-start">
        <label className="text-sm" htmlFor="CheckIn">
          Check-in
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={dayjs(formik.values.CheckIn)}
              onChange={(newValue) =>
                formik.setFieldValue(
                  "CheckIn",
                  newValue?.startOf("day")?.format("YYYY-MM-DD")
                )
              }
              label="Check IN"
            />
          </DemoContainer>
        </LocalizationProvider>
        {formik.touched.CheckIn && formik.errors.CheckIn && (
          <div className="error">{formik.errors.CheckIn}</div>
        )}
      </div>

      <div className="flex flex-col items-start">
        <label className="text-sm" htmlFor="CheckOut">
          Check-out
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={dayjs(formik.values.CheckOut)} // Ensure the value is correctly set as dayjs object
              onChange={(newValue) =>
                formik.setFieldValue(
                  "CheckOut",
                  newValue?.startOf("day")?.format("YYYY-MM-DD") // Set the date value with no time component
                )
              }
              label="Check Out"
            />
          </DemoContainer>
        </LocalizationProvider>
        {formik.touched.CheckOut && formik.errors.CheckOut && (
          <div className="error">{formik.errors.CheckOut}</div>
        )}
      </div>
    </main>
    <Suspense fallback={<LoadingScreen />}>
      <Button
        size="thick"
        color="blue"
        value="Done"
        handleClick={handleClose}
        isSubmitting={false}
        className={""}
        children={undefined}
        primary={false}
      />
    </Suspense>
  </div>
);
export default CheckInCheckOutSection;
