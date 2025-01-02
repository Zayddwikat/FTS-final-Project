import React from "react";
import { ReservationTicket } from "./ReservationTicket";
import Header from "../HomePage/component/header";
import { useCartContext } from "../Context/cartContext";
import { useQuery } from "@tanstack/react-query";
import { LoadingScreen } from "../../component/LoadingPage";
import { ErrorPage } from "../../ErrorPage";
import { ReservationDetails } from "../../classes/reservationInfo";

export const ReservationPage: React.FC = () => {
  const { reservationList } = useCartContext();

  const reservationQuery = useQuery({
    queryKey: ["reservations", reservationList],
    queryFn: () => {
      if (!reservationList || reservationList.length === 0) {
        return [];
      }
      return reservationList;
    },
  });

  if (reservationQuery.isLoading) return <LoadingScreen />;
  if (reservationQuery.isError) return <ErrorPage />;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Header />
      <h1 className="self-start mx-8 text-xl my-8">My Reservations: </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-7xl">
        {reservationQuery.data?.map(
          (reservationDetails: ReservationDetails, index: number) => (
            <div key={index} className="w-full">
              <ReservationTicket {...reservationDetails} />
            </div>
          )
        )}
      </div>
    </main>
  );
};
