import { useQuery } from "@tanstack/react-query";
import { ErrorPage } from "../../../ErrorPage";
import { LoadingScreen } from "../../../component/loadingPage";
import { confirmBooking } from "../hooks/confirmBooking";
import { onDateSub } from "../../homePage/component/searchPost";
import { formatTimestampWithoutSeconds } from "./customerInformation";
import { useCartContext } from "./cartContext";
import { ReservationTicket } from "../../reservationPage/reservationTicket";

export const ConformationBooking: React.FC<any> = ({
  roomInformationObject,
  hotel,
  formik,
}) => {
  const differenceInDays = new Date().toISOString();
  console.table("formik values IS: ", formik.values);
  const { newBook, reservationList } = useCartContext();
  const confirmQuery = useQuery({
    queryKey: ["confirmBooking"],
    queryFn: async () => {
      console.log("iam here");
      await newBook(
        formik.values.customerName ?? "user",
        hotel.hotelName ?? "Plaza",
        roomInformationObject.roomNumber ?? 101,
        roomInformationObject.roomType ?? "Standard",
        differenceInDays,
        roomInformationObject.price ?? 150,
        formik.values.paymentMethod ?? "Cash"
      );
      return 1;
    },
  });
  if (confirmQuery.error) return <ErrorPage />;
  if (confirmQuery.isLoading) return <LoadingScreen />;
  console.log(reservationList);
  return (
    <>
      thank's for Booking from our site, The Booking information will send to
      your email. You can check your reservation from the reservation page
    </>
  );
};
