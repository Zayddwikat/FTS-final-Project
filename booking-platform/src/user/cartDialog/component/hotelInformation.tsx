import { Divider } from "@mui/material";
import { hotelInformation } from "../../../classes/hotelInformation";
import { roomInformation } from "../../../classes/roomInformation";
import { CheckInCheckOutSection } from "./checkInCheckOutSection";
import { SelectionSection } from "./yourSelectionSection";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CustomerInformationForm } from "./customerInformation";
import { CheckOutPage } from "./checkOutPage";
import { ConformationBooking } from "./confirmationOfBooking";
import { useFormik } from "formik";
import { useCartContext } from "../../Context/cartContext";

interface hotelInformationProps {
  roomInformationObject: roomInformation;
  hotel: hotelInformation;
  checkIn: string;
  checkOut: string;
  searchOption: any;
}
const steps = ["Reservation info", "Confirmed Reservation"];

export const HotelInformationDialog: React.FC<hotelInformationProps> = ({
  roomInformationObject,
  hotel,
  checkIn,
  checkOut,
  searchOption,
}) => {
  const formik = useFormik({
    initialValues: {
      customerName: "",
      hotelName: hotel.hotelName ?? "",
      roomNumber: roomInformationObject.roomNumber ?? 0,
      roomType: roomInformationObject.roomType ?? "",
      bookingDateTime: new Date().toISOString() || "",
      totalCost: roomInformationObject.price ?? 0,
      paymentMethod: "",
    },
    onSubmit: async (values) => {},
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption"></Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && (
        <main className="w-full flex flex-col md:flex-row gap-4">
          <div className="border border-black p-4 flex flex-col md:w-[40%] gap-4">
            <CheckInCheckOutSection checkIn={checkIn} checkOut={checkOut} />
            <Divider />
            <SelectionSection searchOption={searchOption} />
          </div>
          <CustomerInformationForm
            hotel={hotel}
            roomInformationObject={roomInformationObject}
            handleNext={handleNext}
            formik={formik}
          />
        </main>
      )}
      {activeStep === 1 && (
        <main className="w-full justify-between flex gap-4">
          <CheckOutPage amount={roomInformationObject.price} />
        </main>
      )}
      {activeStep === steps.length ? (
        <>
          <main className="w-full justify-center items-center flex flex-col">
            <ConformationBooking
              roomInformationObject={roomInformationObject}
              hotel={hotel}
              formik={formik}
            />
          </main>
        </>
      ) : (
        <React.Fragment>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              pt: 2,
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? null : (
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
