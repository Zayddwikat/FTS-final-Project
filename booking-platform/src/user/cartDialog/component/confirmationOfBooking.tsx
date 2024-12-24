import { useQuery } from "@tanstack/react-query";
import { ErrorPage } from "../../../ErrorPage";
import { LoadingScreen } from "../../../component/LoadingPage";
import { confirmBooking } from "../hooks/confirmBooking";
import { onDateSub } from "../../HomePage/component/SearchPost";
import { formatTimestampWithoutSeconds } from "./customerInformation";

export const ConformationBooking: React.FC<any> = ({
  roomInformationObject,
  hotel,
  formik,
}) => {
  const differenceInDays = new Date().toISOString();
  console.table("formik values IS: ", formik.values);
  const confirmQuery = useQuery({
    queryKey: ["confirmBooking"],
    queryFn: async () => {
      console.log("iam here");
      return await confirmBooking({
        customerName: formik.values.customerName ?? "user",
        hotelName: hotel.hotelName ?? "Plaza",
        roomNumber: roomInformationObject.roomNumber ?? 101,
        roomType: roomInformationObject.roomType ?? "Standard",
        bookingDateTime: differenceInDays,
        totalCost: roomInformationObject.price ?? 150,
        paymentMethod: formik.values.paymentMethod ?? "Cash",
      });
    },
  });
  if (confirmQuery.error) return <ErrorPage />;
  if (confirmQuery.isLoading) return <LoadingScreen />;
  return (
    <>
      {}
      thank's for Booking from our site, The Booking information will send to
      your email.
    </>
  );
};