import React, { createContext, useContext, useEffect, useState } from "react";
import { ReservationDetails } from "../../classes/reservationInfo";
import { baseUrl } from "../../const/constantVariables";

const CartContext = createContext<any>(0);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("USER_TOKEN");
  const [reservationList, setReservationList] = useState<ReservationDetails[]>(
    () => {
      const savedReservations = localStorage.getItem("reservations");
      return savedReservations ? JSON.parse(savedReservations) : [];
    }
  );

  const newBook = async (
    customerName: string,
    hotelName: string,
    roomNumber: string,
    roomType: string,
    bookingDateTime: string,
    totalCost: number,
    paymentMethod: string
  ): Promise<void> => {
    console.log(
      customerName,
      hotelName,
      roomNumber,
      roomType,
      bookingDateTime,
      totalCost,
      paymentMethod
    );

    if (!token) {
      throw new Error("No token found");
    }

    console.log("new Booking added");

    try {
      const response = await fetch(`${baseUrl}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerName,
          hotelName,
          roomNumber,
          roomType,
          bookingDateTime,
          totalCost,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }
      const result: ReservationDetails = await response.json();
      console.table(result);
      setReservationList((prevReservation: ReservationDetails[]) => [
        ...prevReservation,
        result,
      ]);
    } catch (err) {
      console.error("Error in adding new Reservation:", err);
      throw new Error("Error in adding new Reservation");
    }
  };

  const getReservation = () => {
    return reservationList;
  };

  const deleteReservation = (confirmationNumber: string) => {
    setReservationList((prevReservations) =>
      prevReservations.filter(
        (reservation) => reservation.confirmationNumber !== confirmationNumber
      )
    );
  };

  useEffect(() => {
    console.log("Reservation list updated:", reservationList);
    localStorage.setItem("reservations", JSON.stringify(reservationList));
  }, [reservationList]);
  return (
    <CartContext.Provider
      value={{ reservationList, newBook, getReservation, deleteReservation }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
