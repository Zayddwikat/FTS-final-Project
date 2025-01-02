import React, { createContext, useContext, useState } from "react";
import { ReservationDetails } from "../../classes/reservationInfo";
import { baseUrl } from "../../const/constantVariables";

interface CartContextProps {
  reservationList: Array<ReservationDetails>;
  newBook: (
    customerName: string,
    hotelName: string,
    roomNumber: string,
    roomType: string,
    bookingDateTime: string,
    totalCost: number,
    paymentMethod: string
  ) => Promise<void>; // Ensure newBook is async
}

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("USER_TOKEN");
  const [reservationList, setReservationList] = useState<ReservationDetails[]>(
    []
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

      const result: ReservationDetails = await response.json(); // Assume the API returns a reservation object

      console.table(result);

      // Append the new reservation to the list
      setReservationList((prevReservation: ReservationDetails[]) => [
        ...prevReservation,
        result, // Append the reservation details (result)
      ]);
    } catch (err) {
      console.error("Error in adding new Reservation:", err);
      throw new Error("Error in adding new Reservation");
    }
  };

  return (
    <CartContext.Provider value={{ reservationList, newBook }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
