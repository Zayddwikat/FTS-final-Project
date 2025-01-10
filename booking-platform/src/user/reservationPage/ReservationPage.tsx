import React, { useEffect } from "react";
import { ReservationTicket } from "./reservationTicket";
import Header from "../homePage/component/header";
import { useCartContext } from "../Context/cartContext";
import { ReservationDetails } from "../../data_module/reservationInfo";

export const ReservationPage: React.FC = () => {
  const { reservationList, deleteReservation } = useCartContext();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Header />
      <h1 className="self-start mx-8 text-xl my-8">My Reservations: </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-7xl">
        {reservationList.map(
          (reservationDetails: ReservationDetails, index: number) => (
            <div key={index} className="w-full">
              <ReservationTicket
                deleteReservation={deleteReservation}
                {...reservationDetails}
              />
            </div>
          )
        )}
      </div>
    </main>
  );
};
